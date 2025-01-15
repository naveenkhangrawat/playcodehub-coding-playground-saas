import { action, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";



export const createSnippet = mutation({
    args: {
        title: v.string(),
        language: v.string(),
        code: v.string()
    },
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            throw new ConvexError("User not authenticated");
        }

        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", userIdentity.subject))
        .first()

        if(!user){
            throw new ConvexError("User not found")
        }

        const snippetId = await ctx.db.insert("snippets", {
            ...args,
            userId: user.userId,
            username: user.name
        })

        return snippetId;
    }
})


export const getSnippets = query({
    handler: async (ctx) => {
        const snippets = await ctx.db.query("snippets").order("desc").collect();
        return snippets;
    }
})


// export const getFilteredSnippets = query({
//     args: {
//         searchQuery: v.string(),
//         selectedLanguage: v.optional(v.string())
//     },
//     handler: async (ctx, {searchQuery, selectedLanguage}) => {

//         const allSnippets = await ctx.db.query("snippets").order("desc").collect();

//         const result = allSnippets.filter((snippet) => (
//             (snippet.title.trim().toLowerCase().includes(searchQuery) || 
//             snippet.language.trim().toLowerCase().includes(searchQuery) || 
//             snippet.username.trim().toLowerCase().includes(searchQuery))) && (
//                 selectedLanguage ? snippet.language === selectedLanguage : true
//             )
//         );

//         return result;
//     }
// })


export const deleteSnippet = mutation({
    args: {snippetId: v.id("snippets")},
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            throw new ConvexError("User not authenticated");
        }

        const snippet = await ctx.db.get(args.snippetId);
        if(!snippet){
            throw new ConvexError("Snippet not found");
        }

        if(userIdentity.subject !== snippet.userId){
            throw new Error("User not authorized to delete the snippet");
        }

        const comments = await ctx.db.query("snippetComments")
        .withIndex("by_snippetId", (q) => q.eq("snippetId", args.snippetId))
        .collect();
        
        for(const comment of comments){
            await ctx.db.delete(comment._id);
        }

        const stars = await ctx.db.query("stars")
        .withIndex("by_stars_snippetId", (q) => q.eq("snippetId", args.snippetId))
        .collect();

        for(const star of stars){
            await ctx.db.delete(star._id);
        }

        await ctx.db.delete(args.snippetId);
    }
})


export const isSnippetStarred = query({
    args: {snippetId: v.id("snippets"), userId: v.optional(v.string())},
    handler: async (ctx, {snippetId, userId}) => {

        if(userId){
            const starredSnippet = await ctx.db.query("stars")
            .withIndex("by_stars_userId_snippetId", (q) => q.eq("userId", userId).eq("snippetId", snippetId))
            .first()

            if(!starredSnippet) return false;
            return true;
        }

        return false;
    }
})


export const getSnippetStarsCount = query({
    args: {snippetId: v.id("snippets")},
    handler: async (ctx, args) => {

        const stars = await ctx.db.query("stars")
        .withIndex("by_stars_snippetId", (q) => q.eq("snippetId", args.snippetId))
        .collect();

        return stars.length;
    }
})



export const starSnippet = mutation({
    args: {snippetId: v.id("snippets")},
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            throw new ConvexError("User not authenticated");
        }

        const snippet = await ctx.db.get(args.snippetId);
        if(!snippet){
            throw new ConvexError("snippet does not exist");
        }

        const isSnippetStarred = await ctx.db.query("stars")
        .withIndex("by_stars_userId_snippetId", (q) => q.eq("userId", userIdentity.subject).eq("snippetId", args.snippetId))
        .first();

        if(isSnippetStarred){
            await ctx.db.delete(isSnippetStarred._id);
            return;
        }

        await ctx.db.insert("stars", {
            userId: userIdentity.subject,
            snippetId: args.snippetId
        })
    }
})


export const getSnippetById = query({
    args: {snippetId: v.id("snippets")},
    handler: async (ctx, args) => {
        const snippet = await ctx.db.get(args.snippetId);
        if(!snippet){
            throw new ConvexError("snippet not found");
        }
        return snippet;
    }
})


export const getUsersStarredSnippets = query({
    handler: async (ctx) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            return []
        }

        const data = await ctx.db.query("stars")
        .withIndex("by_stars_userId", (q) => q.eq("userId", userIdentity.subject))
        .collect()

        const starredSnippetsDetails = await Promise.all(data.map((star) => ctx.db.get(star.snippetId)));
        return starredSnippetsDetails.filter((snippet) => snippet !== null);
    }
})


export const getComments = query({
    args: {snippetId: v.id("snippets")},
    handler: async (ctx, args) => {
        const snippet = await ctx.db.get(args.snippetId);
        if(!snippet){
            throw new ConvexError("snippet does not exist");
        }

        const comments = await ctx.db.query("snippetComments")
        .withIndex("by_snippetId", (q) => q.eq("snippetId", args.snippetId))
        .order("desc")
        .collect()

        return comments;
    }
})


export const addComment = mutation({
    args: {snippetId: v.id("snippets"), content: v.string()},
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            throw new ConvexError("user not authenticated");
        }

        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", userIdentity.subject))
        .first();

        if(!user){
            throw new ConvexError("user not found");
        }

        return await ctx.db.insert("snippetComments", {
            content: args.content,
            snippetId: args.snippetId,
            userId: user.userId,
            username: user.name
        })
    },
})


export const deleteComment = mutation({
    args: {commentId: v.id("snippetComments")},
    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            throw new ConvexError("user not authenticated");
        }

        const comment = await ctx.db.get(args.commentId);
        if(!comment){
            throw new ConvexError("comment not found");
        }

        if(comment.userId !== userIdentity.subject){
            throw new ConvexError("Not authorized to delete the comment");
        }

        await ctx.db.delete(args.commentId);
    }
})
