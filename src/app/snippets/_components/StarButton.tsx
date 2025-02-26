"use client";

import { useMutation, useQuery } from 'convex/react';
import { Star } from 'lucide-react';
import React from 'react'
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { useAuth } from '@clerk/nextjs';


function StarButton({snippetId} : {snippetId: Id<"snippets">}) {

    const {userId} = useAuth();

    const isSnippetStarred = useQuery(api.snippets.isSnippetStarred, {
        snippetId, 
        userId: userId || undefined
    })

    const snippetStarCount = useQuery(api.snippets.getSnippetStarsCount, {snippetId});
    const starSnippet = useMutation(api.snippets.starSnippet);

    const starHandler = async () => {
        await starSnippet({snippetId});
    }

    return (
        <>
            <button
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
                transition-all duration-200 ${isSnippetStarred ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20" : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"}`}
                onClick={starHandler}
            >
                <Star className={`w-4 h-4 ${isSnippetStarred ? "fill-yellow-500" : "fill-none group-hover:fill-gray-400"}`}/>

                <span className={`text-xs font-medium ${isSnippetStarred ? "text-yellow-500" : "text-gray-400"}`}>
                    {snippetStarCount}
                </span>
            </button>
        </>
    )
}

export default StarButton