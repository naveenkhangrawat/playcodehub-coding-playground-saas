import React, { useState } from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import { TrashIcon, UserIcon } from 'lucide-react';
import CommentPreview from './CommentPreview';
import CommentDeleteModal from './CommentDeleteModal';

interface CommentCardProps {
    commentDetails: {
        _id: Id<"snippetComments">;
        _creationTime: number;
        userId: string;
        username: string;
        snippetId: Id<"snippets">;
        content: string;
    },
    currentUserId?: string
}

function CommentCard({commentDetails, currentUserId}: CommentCardProps) {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


    return (
        <div className="group">
            <div className="bg-[#0a0a0f] rounded-xl p-6 border border-[#ffffff0a] hover:border-[#ffffff14] transition-all">
                <div className="flex items-start sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#ffffff08] flex items-center justify-center flex-shrink-0">
                            <UserIcon className="w-4 h-4 text-[#808086]"/>
                        </div>
                        <div className="min-w-0">
                            <span className="block text-[#e1e1e3] font-medium truncate">
                                {commentDetails.username}
                            </span>
                            <span className="block text-sm text-[#808086]">
                                {new Date(commentDetails._creationTime).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {commentDetails.userId === currentUserId && (
                        <button
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                            onClick={() => setIsDeleteDialogOpen(true)}
                        >
                            <TrashIcon className="w-4 h-4 text-red-400"/>
                        </button>
                    )}
                </div>

                <CommentPreview content={commentDetails.content}/>
            </div>
            {isDeleteDialogOpen && (
                <CommentDeleteModal 
                    onClose={() => setIsDeleteDialogOpen(false)}
                    commentId={commentDetails._id}
                />
            )}
        </div>
    )
}

export default CommentCard