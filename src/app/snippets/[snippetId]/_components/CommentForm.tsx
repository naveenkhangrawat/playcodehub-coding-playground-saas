import { CodeIcon, SendIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import CommentPreview from './CommentPreview';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import toast from 'react-hot-toast';
import { Id } from '../../../../../convex/_generated/dataModel';

function CommentForm({snippetId}: {snippetId: Id<"snippets">}) {

    const [isPreview, setIsPreview] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [textareaCaret, setTextAreaCaret] = useState<number | null>(null);

    const addComment = useMutation(api.snippets.addComment);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === "Tab"){
            event.preventDefault();
            const start = event.currentTarget.selectionStart;
            const end = event.currentTarget.selectionEnd;
            const newComment = commentValue.substring(0, start) + "   " + commentValue.substring(end);
            setCommentValue(newComment);
            setTextAreaCaret(start + 3);
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!commentValue?.trim()) return ;

        setIsSubmitting(true)

        try {
            await addComment({
                content: commentValue.trim(),
                snippetId: snippetId
            })
            toast.success("Comment posted successfully");
        } catch (error) {
            console.log("Error while posting comment: ", error);
            toast.error("Failed! Comment wasn't posted");
        } finally {
            setIsSubmitting(false);
            setCommentValue("");
            setIsPreview(false);
        }
    }

    useEffect(() => {
        document.querySelector("textarea")?.setSelectionRange(textareaCaret, textareaCaret);
    }, [textareaCaret])

    return (
        <>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="bg-[#0a0a0f] rounded-xl border border-[#ffffff0a] overflow-hidden">

                    <div className="flex justify-end gap-2 px-4 pt-2">
                        <button
                            type='button'
                            className={`text-sm px-3 py-1 rounded-md transition-colors ${
                                isPreview ? "bg-blue-500/10 text-blue-400" : "hover:bg-[#ffffff08] text-gray-400"}`}
                            onClick={() => {setIsPreview((prevState) => !prevState)}}
                        >
                            {isPreview ? "Edit" : "Preview"}
                        </button>
                    </div>

                    {isPreview ? (
                        <div className="min-h-[120px] p-4 text-[#e1e1e3">
                            <CommentPreview content={commentValue}/>
                        </div>
                    ) : (
                        <textarea 
                            className="w-full bg-transparent border-0 text-[#e1e1e3] placeholder:text-[#808086] outline-none resize-none min-h-[150px] p-4 font-mono text-sm"
                            value={commentValue}
                            placeholder="Add to the discussion..."
                            onChange={(event) => setCommentValue(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    )}

                    <div className="flex items-center justify-between gap-4 px-4 py-3 bg-[#080809] border-t border-[#ffffff0a]">
                        <div className="hidden sm:block text-xs text-[#808086] space-y-1">
                            <div className="flex items-center gap-2">
                                <CodeIcon className="w-3.5 h-3.5"/>
                                <span>Format code with ```language</span>
                            </div>
                            <div className="text-[#808086]/60 pl-5">
                                Tab key inserts spaces • Preview your comment before posting
                            </div>
                        </div>

                        <button 
                            type='submit'
                            className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                    <span>Posting...</span>
                                </>
                            ) : (
                                <>
                                    <SendIcon className="w-4 h-4"/>
                                    <span>Comment</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CommentForm