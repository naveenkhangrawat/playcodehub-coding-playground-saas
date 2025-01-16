"use client";

import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from 'lucide-react'
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import SnippetCard from './SnippetCard';
import Image from 'next/image';

function SnippetsLandingPage({children} : {children: React.ReactNode}) {

    
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [gridView, setGridView] = useState(true);
    
    const snippets = useQuery(api.snippets.getSnippets);

    if(snippets === undefined){
        return <div className="min-h-screen">
            {children}
        </div>
    }
    
    const filteredSnippets = snippets?.filter((snippet) => (
        (snippet.title.trim().toLowerCase().includes(searchQuery.trim().toLowerCase()) || 
        snippet.language.trim().toLowerCase().includes(searchQuery.trim().toLowerCase()) || 
        snippet.username.trim().toLowerCase().includes(searchQuery.trim().toLowerCase()))) && (
            selectedLanguage ? snippet.language.trim().toLowerCase() === selectedLanguage.trim().toLowerCase() : true
        )
    );
    
    const popularLanguages = ["JavaScript", "Python", "Go"];

    
    
    return (
        <div className="relative max-w-7xl mx-auto px-4 py-12">
            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r
                    from-blue-500/10 to-purple-500/10 text-sm text-gray-400 mb-6"
                >
                    <BookOpen className="w-4 h-4"/>
                    Community Code Library
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-6"
                >
                    Discover & Share Code Snippets
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-gray-400 mb-8"
                >
                    Explore a curated collection of code snippets from the community
                </motion.p>
            </div>

            {/* Filters section */}
            <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
                {/* Search */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"/>
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 w-5 h-5 text-gray-400"/>
                        <input 
                            type='text'
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search snippets by title, language, or author..."
                            className="w-full pl-12 pr-4 py-4 bg-[#1e1e2e]/80 hover:bg-[#1e1e2e] text-white
                            rounded-xl border border-[#313244] hover:border-[#414155] transition-all duration-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
                        <Tag className="w-4 h-4 text-gray-400"/>
                        <span className="text-sm text-gray-400">Languages:</span>
                    </div>

                    {popularLanguages.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => {
                                setSelectedLanguage((prevState) => prevState === lang ? null : lang)
                            }}
                            className={`
                                group relative px-3 py-1.5 rounded-lg transition-all duration-200
                                ${selectedLanguage === lang.toLowerCase() ? "text-blue-400 bg-blue-500/10 ring-2 ring-blue-500/50" : "text-gray-400 hover:text-gray-300 bg-[#1e1e2e] hover:bg-[#262637] ring-1 ring-gray-800"}`}
                        >
                            <div className="flex items-center gap-2">
                                <Image src={`/${lang.toLowerCase()}.png`} alt={lang} height={16} width={16} className="w-4 h-4 object-contain"/>
                                <span className="text-sm">{lang}</span>
                            </div>
                        </button>
                    ))}


                    {selectedLanguage && (
                        <button
                            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-gray-300 transition-colors"
                            onClick={() => setSelectedLanguage(null)}
                        >
                            <X className="w-3 h-3"/>
                            Clear
                        </button>
                    )}

                    <div className="ml-auto flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                            {filteredSnippets?.length} snippets found
                        </span>

                        {/* view toggle */}
                        <div className="flex items-center gap-1 p-1 bg-[#1e1e2e] rounded-lg ring-1 ring-gray-800">
                            <button
                                onClick={() => setGridView(true)}
                                className={`p-2 rounded-md transition-all ${
                                    gridView ? "bg-blue-500/20 text-blue-400" : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"}`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setGridView(false)}
                                className={`p-2 rounded-md transition-all ${
                                    !gridView ? "bg-blue-500/20 text-blue-400" : "text-gray-400 hover:text-gray-300 hover:bg-[#262637]"
                                }`}
                            >
                                <Layers className="w-4 h-4"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            
                
            {/* snippet grid */}
            {filteredSnippets.length > 0 && (
                <motion.div
                    className={`grid gap-6 ${
                        gridView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-3xl mx-auto"
                    }`}
                    layout
                >
                        <AnimatePresence mode="popLayout">
                            {filteredSnippets.map((snippet) => (
                                <React.Fragment key={snippet._id}>
                                    <SnippetCard snippet={snippet}/>
                                </React.Fragment>
                            ))}
                        </AnimatePresence>
                </motion.div>
            )}

            {/* no snippets */}
            {filteredSnippets.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative max-w-md mx-auto mt-20 p-8 rounded-2xl overflow-hidden"
                >
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-white/10 mb-6">
                            <Code className="w-8 h-8 text-gray-400"/>
                        </div>
                        <h3 className="text-xl font-medium text-white mb-3">No snippets found</h3>
                        <p className="text-gray-400 mb-6">
                            {searchQuery || selectedLanguage ? "Try adjusting your search query or filters" : "Be the first to share a code snippet with the community"}
                        </p>

                        {(searchQuery || selectedLanguage) && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedLanguage(null);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#262637] text-gray-300 hover:text-white rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4"/>
                                Clear all filters
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default SnippetsLandingPage