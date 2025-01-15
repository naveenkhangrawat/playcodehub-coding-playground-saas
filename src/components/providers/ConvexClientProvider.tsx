"use client";

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import React from 'react'

function ConvexClientProvider({children}: {children: React.ReactNode}) {

    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

    return (
        <ClerkProvider publishableKey={process.env.CLERK_SECRET_KEY as string}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}

export default ConvexClientProvider;