import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";
import Stripe from 'stripe';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia"
})


const http = httpRouter();

http.route({
    path: "/stripe-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const body = await request.text();
        const signature = request.headers.get('stripe-signature') as string;
        if(!signature){
            return new Response("Missing stripe-Signature header", { status: 400 });
        }

        const event = await ctx.runAction(internal.stripe.verifyStripeWebhook, {signature, body});

        if(!event){
            return new Response("Error verifying signature", {status: 400});
        }

        const session = event.data.object as Stripe.Checkout.Session;
        
        if(event.type === "checkout.session.completed"){
            const userId = session.metadata?.userId;
            if(!userId){
                return new Response("User not found", { status: 404 });
            }

            // write to the database
            await ctx.runMutation(internal.userSubscriptions.createSubscription, {
                userId: userId,
                amount: session.amount_total ? session.amount_total / 100 : 0,
                stripeSubscriptionId: session.id,
                stripeCustomerId: session.customer as string
            })

            console.log("User subscription created successfully");
            return new Response("user subscription created successfully", { status: 200 });
        }

        return new Response("Webhook processed successfully", { status: 200 });
    })
})


http.route({
    path: "/clerk-users-webhook",
    method: "POST",

    handler: httpAction(async (ctx, request) => {
        const event = await validateRequest(request);
        if (!event) {
            return new Response("Error occured", { status: 400 });
        }
        
        try {
            // save user to the database
            if(event.type === "user.created"){
                const {id, email_addresses, first_name, last_name} = event.data;
                const email = email_addresses[0]?.email_address;
                const fullName = `${first_name || ""} ${last_name || ""}`.trim();

                await ctx.runMutation(internal.users.createUser, {
                    userId: id,
                    email: email,
                    fullName: fullName
                })

                return new Response("User created successfully", { status: 200 });
                
            }

            if(event.type === "user.updated"){
                const email = event.data.email_addresses[0]?.email_address;
                const name = `${event.data.first_name || ""} ${event.data.last_name || ""}`.trim();
                const userId = event.data.id!;

                await ctx.runMutation(internal.users.updateUser, {name, email, userId});

                return new Response("User updated successfully", { status: 200 });
            }

            if(event.type === "user.deleted"){
                const userId = event.data.id!;
                await ctx.runMutation(internal.users.deleteUser, {userId});
                
                return new Response("User deleted successfully", { status: 200 });
            }
        } catch (error) {
            return new Response("Error occured while processing the webhook", { status: 500 });
        }

        return new Response("Webhook processed successfully", { status: 200 });
    }),
});


async function validateRequest(req: Request): Promise<WebhookEvent | null> {
    const payloadString = await req.text();

    const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!CLERK_WEBHOOK_SECRET) {
        throw new Error('Missing CLERK_WEBHOOK_SECRET environment variable');
    }
    
    // Create new Svix instance with secret
    const wh = new Webhook(CLERK_WEBHOOK_SECRET!);


    
    const svix_id = req.headers.get("svix-id")!;
    const svix_timestamp = req.headers.get("svix-timestamp")!;
    const svix_signature = req.headers.get("svix-signature")!;
    
    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        throw new Error('Error: Missing Svix headers')
    }
    
    const svixHeaders = {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
    };
    
    try {
        return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
    } catch (error) {
        console.error("Error verifying webhook event", error);
        return null;
    }
}

export default http;