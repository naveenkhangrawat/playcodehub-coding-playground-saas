"use client";

import { useSearchParams } from 'next/navigation';
import React from 'react'
import PaymentSuccess from './_components/PaymentSuccess';

function Page() {

    const searchParams = useSearchParams();

    return (
        <div>
            {searchParams.has('success') && (
                <PaymentSuccess />
            )}
        </div>
    )
}

export default Page
