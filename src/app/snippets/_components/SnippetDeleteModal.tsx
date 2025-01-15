import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import {toast} from "react-hot-toast";
import { Id } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

function SnippetDeleteModal({
    onClose, snippetId
}: {
    onClose: () => void, 
    snippetId: Id<"snippets">
}) {

    const [isDeleting, setIsDeleting] = useState(false);

    const deleteSnippet = useMutation(api.snippets.deleteSnippet);


    const deleteSnippetHandler = async () => {
        setIsDeleting(true);

        try {
            await deleteSnippet({snippetId});
            onClose();
            toast.success("Snippet deleted successfully");
        } catch (error) {
            console.log("Error while deleting snippet: ", error);
            toast.error("Error while deleting snippet");
        } finally {
            setIsDeleting(false);
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
                    <h2 className="text-xl font-semibold text-white">Delete Snippet</h2>
                    <button
                        className="text-gray-400 hover:text-gray-300"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                <div>
                    <div className="mb-4">
                        Are you sure you want to delete this snippet?
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
                            type='button'
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                            disabled:opacity-50"
                            disabled={isDeleting}
                            onClick={deleteSnippetHandler}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SnippetDeleteModal;