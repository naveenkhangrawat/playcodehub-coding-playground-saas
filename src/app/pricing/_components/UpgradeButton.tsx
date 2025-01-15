"use client";

import React, { useTransition } from 'react'
import { Loader2, Zap } from 'lucide-react'
import { createCheckoutSession } from '@/lib/actions/stripe';
import { useUser } from '@clerk/nextjs';

function UpgradeButton() {

    const {isLoaded} = useUser();

    const [isLoading, startTransition] = useTransition();

    const upgradeHandler = () => {
        startTransition(() => {
            createCheckoutSession();
        })
    }

    return (
        <>
        {isLoaded && (
            <button 
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all
                ${isLoading ? 'opacity-60 pointer-events-none' : ''}`}
                onClick={upgradeHandler}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                    <Loader2 className="w-4 h-4 animate-spin"/>
                    Processing...
                    </>
                ) : (
                    <>
                        <Zap className="w-5 h-5"/>
                        Upgrade to Pro
                    </>
                )}
    
            </button>

        )}
        </>
    )
}

export default UpgradeButton