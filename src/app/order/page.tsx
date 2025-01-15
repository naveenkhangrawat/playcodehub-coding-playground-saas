"use client";


import React, { Suspense } from 'react'
import PaymentSuccess from './_components/PaymentSuccess';

function Page() {

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <PaymentSuccess />
            </Suspense>
        </div>
    )
}

export default Page
