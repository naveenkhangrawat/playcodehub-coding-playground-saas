import React from 'react'
import Image from 'next/image';
import { CodeBlock } from '@/components/aceternityUI/code-block';

import { ChevronRight, Code, Loader2 } from "lucide-react";
import { Id } from '../../../../convex/_generated/dataModel';

interface ExecutionsTabSectionProps {
    results : {
        _id: Id<"codeExecutions">;
        _creationTime: number;
        output?: string | undefined;
        error?: string | undefined;
        language: string;
        code: string;
        userId: string;
    }[],
    isLoading: boolean, 
    status : "CanLoadMore" | "LoadingMore" | "LoadingFirstPage" | "Exhausted",
    loadMore : (numItems: number) => void
}


function ExecutionsTabSection({results, isLoading, status, loadMore}: ExecutionsTabSectionProps) {

    const handleLoadMore = () => {
        if(status === "CanLoadMore"){
            loadMore(5);
        }
    }

    return (
        <div className="space-y-6">

            {isLoading ? (
                <div className="text-center py-12">
                    <Loader2 className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-spin"/>
                    <h3 className="text-lg font-medium text-gray-400 mb-2">
                        Loading code executions...
                    </h3>
                </div>
            ) : (results.length === 0) && (
                <div className="text-center py-12">
                    <Code className="w-12 h-12 text-gray-600 mx-auto mb-4"/>
                    <h3 className="text-lg font-medium text-gray-400 mb-2">
                        No code executions yet
                    </h3>
                    <p className="text-gray-500">
                        Start coding to see your execution history!
                    </p>
                </div>
            )}


            {results.map((execution) => (
                <div
                    key={execution._id}
                    className="group rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/50"
                >
                    <div className="flex items-center justify-between p-4 bg-black/30 border border-gray-800/50 rounded-t-xl">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"/>
                                <Image 
                                    src={`/${execution.language}.png`}
                                    alt={`/${execution.language} logo`}
                                    className="rounded-lg relative z-10 object-cover"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-white">
                                        {execution.language.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(execution._creationTime).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${execution.error ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>
                                        {execution.error ? "Error" : "Success"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-black/20 rounded-b-xl border border-t-0 border-gray-800/50">
                        <CodeBlock code={execution.code} language={execution.language}  filename={execution.language} />

                        {(execution.output || execution.error) && (
                            <div className="mt-4 p-4 rounded-lg bg-black/40">
                                <h4 className="text-sm font-medium text-gray-400 mb-2">
                                    Output
                                </h4>
                                <pre className={`text-sm ${execution.error ? "text-red-400" : "text-green-400"}`}>
                                    {execution.output || execution.error}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* load more button */}
            {status === "CanLoadMore" ? (
                <div className="flex justify-center mt-8">
                    <button
                        className="px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg flex items-center gap-2 transition-colors"
                        onClick={handleLoadMore}
                    >
                        Load More
                        <ChevronRight className="w-4 h-4"/>
                    </button>
                </div>
            ) : status === "LoadingMore" && (
                <div className="text-center py-12">
                    <Loader2 className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-spin"/>
                    <h3 className="text-lg font-medium text-gray-400 mb-2">
                        Loading...
                    </h3>
                </div>
            )}
        </div>
    )
}

export default ExecutionsTabSection