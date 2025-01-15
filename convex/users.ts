import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";


export const createUser = internalMutation({
    args: {userId: v.string(), email: v.string(), fullName: v.string()},
    handler: async (ctx, args) => {

        const existingUser = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();

        if(!existingUser){
            await ctx.db.insert("users", {
                userId: args.userId,
                email: args.email,
                name: args.fullName,
                isProMember: false
            })
        }
    }
})

export const getUser = query({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        if(!args.userId){
            return null;
        }
        const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();

        if(!user) return null;

        return user;
    }
})

export const updateUser = internalMutation({
    args: {name: v.string(), email: v.string(), userId: v.string()},
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();

        if(!user){
            throw new Error(`Can't update user, there is none for Clerk user ID: ${args.userId}`);
        }

        await ctx.db.patch(user._id, {
            name: args.name,
            email: args.email
        });
    }
})

export const deleteUser = internalMutation({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();

        if(user !== null){
            await ctx.db.delete(user._id);
        } else {
            console.warn(`Can't delete user, there is none for Clerk user ID: ${args.userId}`);
        }
    }
})