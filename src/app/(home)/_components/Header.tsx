
import Image from 'next/image'

import React, { useState } from 'react'
import Logo from '@/app/favicon.ico';
import { Blocks, Code2, Menu } from 'lucide-react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils'
import { HoverBorderGradient } from '@/components/aceternityUI/hover-border-gradient';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import MobileMenu from '../_components/MobileMenu';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import UserProfileBtn from '@/app/editor/_components/UserProfileBtn';


const routes: {title: string, path: string}[] = [
    {title: "", path: ""}, 
    {title: "", path: ""}, 
    {title: "", path: ""}
]

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
        "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]



function Header() {

    return (
        <header className='sticky top-0 px-6 py-4 flex justify-center items-center border-b border-gray-800/50 backdrop-blur-md bg-background/30  w-full h-[80px] z-[1000]'>

            <div className='w-full flex justify-start items-center'>
                <Link href={"/"} className="flex items-center gap-3 group relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

                    {/* logo */}
                    <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                        <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                    </div>

                    <div className="flex flex-col">
                        <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                            PlayCodeHub
                        </span>
                        <span className="block text-xs text-blue-400/60 font-medium">
                            Interactive Code Editor
                        </span>
                    </div>
                </Link>
            </div>


            <NavigationMenu className='hidden md:block'>
                <NavigationMenuList className='gap-10'>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-white/70">
                            Features
                        </NavigationMenuTrigger>

                        <NavigationMenuContent>
                            <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                                <li className='row-span-3'>
                                    <span className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'>
                                        Welcome
                                    </span>
                                </li>
                                <ListItem href="#features" title="Global Infrastructure">
                                    Lightning fast execution across worldwide edge nodes
                                </ListItem>
                                <ListItem href="#features" title="Unlimited Storage">
                                    Store unlimited snippets and projects
                                </ListItem>
                                <ListItem href="#features" title="Real-time Sync">
                                    Instant synchronization across all devices
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={cn(navigationMenuTriggerStyle(), {
                            'text-white/70': true,
                        })}>
                            <Link href="#pricing">
                                Pricing
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-white/70">
                            Pricing
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={"#"}
                                    >
                                    {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem> */}

                    
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            asChild
                            className={cn(navigationMenuTriggerStyle(), {
                            'text-white/70': true,
                        })}>
                            <Link href="#testimonials">
                                Testimonials
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className='flex w-full gap-5 md:gap-3 items-center justify-end'>
                <SignedOut>
                    <Link href="/sign-in" className='hidden md:block'>
                        <Button variant="secondary" className='px-6' size="default">Login</Button>
                    </Link>
                    <Link href={"/sign-up"} className='hidden md:block'>
                        <HoverBorderGradient containerClassName='rounded-md' as="button" className='bg-background whitespace-nowrap text-white text-sm'>
                            Sign Up
                        </HoverBorderGradient>
                    </Link>
                </SignedOut>

                <SignedIn>
                    
                    <Link href={"/snippets"} className="relative group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300">
                            <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform text-amber-400 hover:text-amber-300"/>
                            <span className="text-sm font-medium relative z-10 text-amber-400/90 group-hover:text-amber-300 transition-colors">
                                Snippets
                            </span>
                    </Link>

                    <Link href="/dashboard" className='hidden md:block'>
                        <Button variant="default" className='px-6' size="default">Dashboard</Button>
                    </Link>
                    <div className="pl-3 border-l border-gray-800 flex items-center">
                        <UserProfileBtn />
                    </div>
                </SignedIn>

                <div className='md:hidden'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="icon" className=''>
                                <Menu />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-60 bg-background/50 backdrop-blur-3xl border-foreground/5 border-x-0 border-b-0 rounded-lg overflow-hidden z-[1000]' align='end'>
                            <MobileMenu />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

        </header>
    )
}




const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
        <NavigationMenuLink asChild>
            <a
            ref={ref}
            className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
            )}
            {...props}
            >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
            </p>
            </a>
        </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default Header;