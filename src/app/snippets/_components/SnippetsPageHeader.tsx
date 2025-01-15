"use client";

import React from 'react'
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Code2Icon, Sparkles } from "lucide-react";
import Link from "next/link";
import UserProfileBtn from '@/app/editor/_components/UserProfileBtn';
import path from 'path';
import { usePathname } from 'next/navigation';


function SnippetsPageHeader() {

    const links = [
        {
            label: "Home",
            path: "/"
        },
        {
            label: "Dashboard",
            path: "/dashboard"
        },
        {
            label: "Snippets",
            path: "/snippets"
        },
        {
            label: "Pricing",
            path: "/pricing"
        }
    ]

    const pathname = usePathname();

    return (
        <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/50 backdrop-blur-md">

            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"/>
            
            <div className="relative h-[80px] flex items-center justify-center px-8">
                <div className="w-full flex items-center justify-start">
                    {/* Logo */}
                    <Link href={"/"} className="flex items-center gap-3 group relative">

                        {/* logo hover effect */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"/>

                        {/* logo */}
                        <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                            <Blocks className="w-6 h-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500"/>
                        </div>

                        <div className="relative">
                            <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                                PlayCodeHub
                            </span>
                            <span className="block text-xs text-blue-400/60 font-medium">
                                Interactive Code Editor
                            </span>
                        </div>
                    </Link>


                </div>

                <div className='flex items-center justify-center gap-5 text-[15px]'>
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.path} 
                            className={`px-6 py-2 rounded-md  hover:text-white hover:bg-white/10 transition-all duration-300 ${pathname === link.path ? "text-white" : "text-white/70"}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className='w-full flex items-center justify-end gap-5 md:gap-5'>
                    <Link 
                        href={"/editor"}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/20
                        hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                        to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all 
                        duration-300"
                    >
                        <Code2Icon className="w-4 h-4 text-amber-400 hover:text-amber-300"/>
                        <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                            Editor
                        </span>
                    </Link>

                    <UserProfileBtn />
                </div>
            </div>
            
        </div>
    )
}

export default SnippetsPageHeader