import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { HoverBorderGradient } from '@/components/aceternityUI/hover-border-gradient'
import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs'

function MobileMenu() {

    const navMenu = [
        {title: "Home", href: "/", icon: ""},
        {title: "Features", href: "#", icon: ""},
        {title: "Pricing", href: "#", icon: ""},
        {title: "About", href: "#", icon: ""},
        {title: "Contacts", href: "#", icon: ""},
    ]

    return (
        <div className='z-[1000]'>
            <ul className='mb-3'>
                {navMenu.map((menuItem, index) => (
                    <li key={index}>
                        <Link href={menuItem.href}>
                            <Button variant="ghost" className='w-full justify-start'>{menuItem.title}</Button>
                        </Link>
                    </li>
                ))}
            </ul>

            <Separator className='bg-muted-foreground/20'/>

            <div className='flex items-center gap-2 mt-4'>
                <SignedOut>
                    <Link href={"/sign-in"} className='w-full'>
                        <Button variant="default" className='w-full'>Login</Button>
                    </Link>

                    <Link href={"/sign-up"} className='w-full flex justify-center'>
                        <HoverBorderGradient containerClassName='rounded-md w-full' as="button" className='w-full flex items-center justify-center whitespace-nowrap text-white text-sm font-normal px-4 py-[9.5px]'>
                            Sign Up
                        </HoverBorderGradient>
                    </Link>
                </SignedOut>

                <SignedIn>
                    <Link href={"/sign-in"} className='w-full'>
                        <Button variant="default" className='w-full'>Dashboard</Button>
                    </Link>

                    <Button variant="default" className='w-full'>
                        <SignOutButton />
                    </Button>
                </SignedIn>
            </div>
        </div>
    )
}

export default MobileMenu