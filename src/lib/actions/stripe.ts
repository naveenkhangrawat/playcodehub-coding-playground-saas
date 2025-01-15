"use server"

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia"
})

export async function createCheckoutSession(){
    const {userId} = await auth();
    if(!userId){
        throw new Error("User not authenticated")
    }

    const amount = Math.round(49.99 * 100);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'amazon_pay'],
        line_items: [
            {
                price_data:{
                    currency: "usd",
                    product_data: {
                        name: "Lifetime Pro Membership"
                    },
                    unit_amount: amount
                },
                quantity: 1
            }
        ],
        customer_creation: "always",
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
        client_reference_id: userId,
        metadata: {
            userId
        }
    })

    return redirect(session.url!);
}
