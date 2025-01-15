"use client";

import { useMutation } from 'convex/react';
import { X } from 'lucide-react'
import React, { FormEvent, useEffect, useState } from 'react'
import { api } from '../../../../convex/_generated/api';
import { useAppSelector } from '@/lib/hooks';
import {toast} from "react-hot-toast";

function ShareSnippetDialog({onClose}: {onClose: () => void}) {

    const [title, setTitle] = useState("");
    const [isSharing, setIsSharing] = useState(false);

    const createSnippet = useMutation(api.snippets.createSnippet);

    const language = useAppSelector((state) => state.codeEditor.language);
    const editor = useAppSelector((state) => state.codeEditor.editor);


    const shareSnippetHandler = async (event: FormEvent) => {
        event.preventDefault();
        setIsSharing(true);

        const code = editor?.getValue() || "";

        try {
            await createSnippet({title, language, code});
            onClose();
            setTitle("");
            toast.success("Snippet shared successfully");
        } catch (error) {
            console.log("Error while sharing the snippet: ", error);
            toast.error("Error while sharing the snippet");
        }finally {
            setIsSharing(false);
        }
    }


    useEffect(() => {
        document.body.style.overflowY = "hidden";

        return () => {
            document.body.style.overflowY = "auto"
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Share Snippet</h2>
                    <button
                        className="text-gray-400 hover:text-gray-300"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                <form onSubmit={shareSnippetHandler}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
                            Title
                        </label>
                        <input 
                            type="text"
                            id="title"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            className="w-full px-3 py-2 bg-[#181825] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter snippet title"
                            required={true}
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type='button'
                            className="px-4 py-2 text-gray-400 hover:text-gray-300"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type='submit'
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                            disabled:opacity-50"
                            disabled={isSharing}
                        >
                            {isSharing ? "Sharing..." : "Share"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShareSnippetDialog