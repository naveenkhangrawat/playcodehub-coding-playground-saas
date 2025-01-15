import React from 'react'
import SnippetsLandingPage from './_components/SnippetsLandingPage'
import SnippetsPageHeader from './_components/SnippetsPageHeader'
import SnippetsPageSkeleton from './_components/SnippetsPageSkeleton'
import Footer from '@/components/Footer'

function SnippetsPage() {

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <SnippetsPageHeader />
            <SnippetsLandingPage>
                <SnippetsPageSkeleton />
            </SnippetsLandingPage>
            <Footer />
        </div>

    )
}

export default SnippetsPage