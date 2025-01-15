import React from 'react'
import { FloatingDock } from "@/components/aceternityUI/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";


function FloatingMenu() {

    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-neutral-300" />
            ),
            href: "#",
        },
    
        {
            title: "Products",
            icon: (
                <IconTerminal2 className="h-full w-full text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Components",
            icon: (
                <IconNewSection className="h-full w-full text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Changelog",
            icon: (
                <IconExchange className="h-full w-full text-neutral-300" />
            ),
            href: "#",
        },
    
        {
            title: "Twitter",
            icon: (
                <IconBrandX className="h-full w-full text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="h-full w-full text-neutral-300" />
            ),
            href: "#",
        },
    ];
    return (
        <div className='flex items-center md:justify-center justify-end w-full fixed bottom-5'>
            <FloatingDock items={links}/>
        </div>
    )
}

export default FloatingMenu