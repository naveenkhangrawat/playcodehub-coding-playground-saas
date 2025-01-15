"use client";

import React, { Suspense, useState } from 'react'
import { ChevronRight, Code, ListVideo, Loader2, Star } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion';
import StarredTabSection from './StarredTabSection';
import ExecutionsTabSection from './ExecutionsTabSection';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { usePaginatedQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';


enum ActiveTab {
    executions = "executions",
    starred = "starred"
}

const TABS = [
    {
        id: ActiveTab.executions,
        label: "Code Executions",
        icon: ListVideo,
    },
    {
        id: ActiveTab.starred,
        label: "Starred Snippets",
        icon: Star,
    },
];

function TabsSection() {

    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.executions);

    const {user} = useUser();

     const {results, isLoading, status, loadMore} = usePaginatedQuery(api.codeExecutions.getUserCodeExecutions, 
            {userId: user?.id || ""},
            { initialNumItems: 5 },
    )

    const usersStarredSnippets = useQuery(api.snippets.getUsersStarredSnippets);

    return (
        <>
        <div className="border-b border-gray-800/50">
            <div className="flex space-x-1 p-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`group flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden ${
                        activeTab === tab.id ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
                        }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-blue-500/10 rounded-lg"
                                transition={{
                                    type: "spring",
                                    bounce: 0.2,
                                    duration: 0.6,
                                }}
                            />
                        )}
                        <tab.icon className="w-4 h-4 relative z-10"/>
                        <span className="text-sm font-medium relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* tab content */}
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6"
            >
                {/* activetab: executions */}
                {activeTab === "executions" && (
                    <ExecutionsTabSection results={results} isLoading={isLoading} status={status}   loadMore={loadMore}/>
                )}

                {/* activetab = starred */}
                {activeTab === "starred" && (
                    <StarredTabSection usersStarredSnippets={usersStarredSnippets} />
                )}
            </motion.div>
        </AnimatePresence>
        </>
    )
}

export default TabsSection