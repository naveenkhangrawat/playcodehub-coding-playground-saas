import { useQuery } from 'convex/react'
import { MessageSquare } from 'lucide-react'
import React, { useState } from 'react'
import { api } from '../../../../../convex/_generated/api'
import { Id } from '../../../../../convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import CommentForm from './CommentForm'
import CommentCard from './CommentCard'

function Comments({snippetId} : {snippetId: Id<"snippets">}) {

    const {user} = useUser();
    
    const comments = useQuery(api.snippets.getComments, {snippetId});

    return (
        <>
        {comments && (
            <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl overflow-hidden">
                <div className="px-6 sm:px-8 py-6 border-b border-[#ffffff0a]">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        <MessageSquare className="w-5 h-5"/>
                        Discussion ({comments.length})
                    </h2>
                </div>

                <div className="p-6 sm:p-8">
                    {user && (
                        <CommentForm snippetId={snippetId}/>
                    )}

                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <CommentCard 
                                key={comment._id}
                                commentDetails={comment}
                                currentUserId={user?.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default Comments