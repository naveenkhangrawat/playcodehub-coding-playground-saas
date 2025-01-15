import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        userId: v.string(),     // it would be a clerkId
        name: v.string(),
        email: v.string(),
        isProMember: v.boolean(),
    }).index("by_userId", ["userId"]),

    codeExecutions: defineTable({
        userId: v.string(),
        language: v.string(),
        code: v.string(),
        output: v.optional(v.string()),
        error: v.optional(v.string())
    }).index("by_code_userId", ["userId"]),

    snippets: defineTable({
        userId: v.string(),
        username: v.string(),       // user's name for easy access
        title: v.string(),
        language: v.string(),
        code: v.string()
    }).index("by_snippets_userId", ["userId"]),

    snippetComments: defineTable({
        snippetId: v.id("snippets"),
        userId: v.string(),
        username: v.string(),
        content: v.string(),       
    }).index("by_snippetId", ["snippetId"]),

    stars: defineTable({
        userId: v.string(),
        snippetId: v.id("snippets")
    })
    .index("by_stars_userId", ["userId"])
    .index("by_stars_snippetId", ["snippetId"])
    .index("by_stars_userId_snippetId", ["userId", "snippetId"]),

    userSubscription: defineTable({
        userId: v.string(),
        amount: v.number(),
        stripeCustomerId: v.string(),
        stripeSubscriptionId: v.string(),
        subscriptionStartDate: v.string()
    })
})