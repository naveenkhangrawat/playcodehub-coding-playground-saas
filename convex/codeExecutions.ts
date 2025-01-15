import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";


export const saveCodeExecution = mutation({
    args: {
        language: v.string(),
        code: v.string(),
        output: v.optional(v.string()),
        error: v.optional(v.string()),
    },
    handler: async (ctx, args) => {

        // if user is authenticated
        const userIdentity = await ctx.auth.getUserIdentity();
        if(!userIdentity){
            throw new ConvexError("User not authenticated")
        }

        // check if user is a pro member
        const user = await ctx.db.query("users")
        .withIndex("by_userId", (q) => q.eq("userId", userIdentity.subject))
        .first();

        if(!user?.isProMember && args.language !== "javascript"){
            throw new ConvexError("Pro subscription required to use this language");
        }

        await ctx.db.insert("codeExecutions", {
            ...args,
            userId: userIdentity.subject
        })
    } 
})


export const getUserStats = query({
    args: {userId: v.string()},
    handler: async (ctx, args) => {
        // code executions
        const codeExecutions = await ctx.db.query("codeExecutions")
        .withIndex("by_code_userId", (q) => q.eq("userId", args.userId))
        .collect();

        // executions in last 24 hours
        const last24hours = codeExecutions.filter((execution) => (
            execution._creationTime > Date.now() - (24*60*60*1000)
        )).length;

        
        // const totalLanguages = [...new Set(codeExecutions.map((e) => e.language))].length;

        // language stats
        const languagesExecutedStats = codeExecutions.reduce((accumulator, execution) => {
            accumulator[execution.language] = (accumulator[execution.language] || 0) + 1;
            if(accumulator[execution.language] > accumulator["maxCount"]){
                accumulator["maxCount"] = accumulator[execution.language]
                accumulator["favouriteLanguage"] = execution.language;
            }
            return accumulator;
        }, {maxCount: 0, favouriteLanguage: null} as {
            [key: string] : number,
            maxCount: number,
            favouriteLanguage: any
        }
        );

        // total languages
        const totalLanguages = Object.keys(languagesExecutedStats).length - 2;


        // starred snippets
        const starredSnippets = await ctx.db.query("stars")
        .withIndex("by_stars_userId", (q) => q.eq("userId", args.userId))
        .collect();

        // most starred language
        const snippetIds = starredSnippets.map((elm) => elm.snippetId);
        const snippetDetails = await Promise.all(snippetIds.map((id) => ctx.db.get(id)));


        const languagesStarredStats = snippetDetails.filter((snippet) => snippet !== null).reduce((acc, snippet) => {
                acc[snippet.language] = (acc[snippet.language] || 0) + 1;
                if(acc[snippet.language] > acc["maxCount"]){
                    acc["maxCount"] = acc[snippet.language];
                    acc["mostStarredLanguage"] = snippet.language;
                }
            return acc;

        }, {maxCount: 0, mostStarredLanguage: null} as {
            [key: string] : number,
            maxCount: number,
            mostStarredLanguage: any
        })

        return {
            totalExecutions: codeExecutions.length,
            last24hours,
            totalLanguages,
            languagesExecutedStats,
            totalStarredSnippets: starredSnippets.length,
            languagesStarredStats
        }
    }
})


export const getUserCodeExecutions = query({
    args: {
        userId: v.string(),
        paginationOpts: paginationOptsValidator
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("codeExecutions")
        .withIndex("by_code_userId", (q) => q.eq("userId", args.userId))
        .order("desc")
        .paginate(args.paginationOpts)
    }
})