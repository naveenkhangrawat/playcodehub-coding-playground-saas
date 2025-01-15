"use client";

import { useQuery } from 'convex/react';
import React from 'react'
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { CodeBlock } from '@/components/aceternityUI/code-block';
import SnippetsPageHeader from '../_components/SnippetsPageHeader';
import Image from 'next/image';
import { Clock, MessageSquare, User } from 'lucide-react';
import SnippetDetailLoadingSkeleton from './_components/SnippetDetailLoadingSkeleton';
import Comments from './_components/Comments';

type SnippetDetailPageProps = {
    params: {
        snippetId: string
    }
}

function SnippetDetailPage({params: {snippetId}}: SnippetDetailPageProps) {

    const snippetDetail = useQuery(api.snippets.getSnippetById, {snippetId: snippetId as Id<"snippets">});

    if(!snippetDetail){
        return <SnippetDetailLoadingSkeleton />
    }

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <SnippetsPageHeader />

            <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <div className="max-w-[1200px] mx-auto">
                    {/* Header */}
                    <div className="bg-[#121218] border border-[#ffffff0a] rounded-2xl p-6 sm:p-8 mb-6 backdrop-blur-xl">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center size-12 rounded-xl bg-[#ffffff08] p-2.5">
                                    <Image 
                                        src={`/${snippetDetail.language}.png`}
                                        alt={`${snippetDetail.language} logo`}
                                        width={48}
                                        height={48}
                                        className='object-contain'
                                    />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                                        {snippetDetail.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-[#8b8b8d]">
                                            <User className="w-4 h-4"/>
                                            <span>{snippetDetail.username}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#8b8b8d]">
                                            <Clock className="w-4 h-4"/>
                                            <span>
                                                {new Date(snippetDetail._creationTime).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#8b8b8d]">
                                            <MessageSquare className="w-4 h-4"/>
                                            <span>no. of comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="inline-flex items-center px-3 py-1.5 bg-[#ffffff08] text-[#808086] rounded-lg text-sm font-medium">
                                {snippetDetail.language}
                            </div>
                        </div>
                    </div>

                    {/* code block */}
                    <div className="mb-8 rounded-2xl overflow-hidden border border-[#ffffff0a] ">
                        <CodeBlock 
                            language={snippetDetail.language}
                            filename={"Source Code"}
                            code={snippetDetail.code}
                        />
                    </div>

                    <Comments snippetId={snippetDetail._id}/>
                </div>
            </main>
        </div>
    )
}

export default SnippetDetailPage