"use node"

import { v } from "convex/values"
import { internalAction } from "./_generated/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia"
})

export const verifyStripeWebhook = internalAction({
    args: {signature: v.string(), body: v.string()},
    handler: async (ctx, args) => {

        const event = stripe.webhooks.constructEvent(args.body, args.signature, process.env.STRIPE_WEBHOOK_SECRET!)

        if(!event){
            console.error("Error verifying signature");
            return null;
        }

        return event;
    }
}) 