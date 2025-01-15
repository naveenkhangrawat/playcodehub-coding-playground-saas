import { ConvexError, v } from "convex/values";
import { internalMutation } from "./_generated/server";


export const createSubscription = internalMutation({
    args: {
        userId: v.string(),
        amount: v.number(),
        stripeCustomerId: v.string(),
        stripeSubscriptionId: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();

        if(!user){
            throw new ConvexError("User not found");
        }

        const userSubscriptionId = await ctx.db.insert("userSubscription", {
            userId: args.userId,
            amount: args.amount,
            stripeCustomerId: args.stripeCustomerId,
            stripeSubscriptionId: args.stripeSubscriptionId,
            subscriptionStartDate: new Date().toString()
        })

        if(!userSubscriptionId){
            throw new ConvexError("Error occured while creating subscription");
        }

        await ctx.db.patch(user._id, {
            isProMember: true
        })
        
    }
})