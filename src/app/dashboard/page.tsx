import React from 'react'
import SnippetsPageHeader from '../snippets/_components/SnippetsPageHeader';
import StatsSection from './_components/StatsSection';
import TabsSection from './_components/TabsSection';
import Footer from '@/components/Footer';

function DashboardPage() {
    
    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <SnippetsPageHeader />

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Stats section */}
                <StatsSection />

                {/* main section */}
                <div className="bg-gradient-to-br from-[#12121a] to-[#1a1a2e] rounded-3xl shadow-2xl 
                shadow-black/50 border border-gray-800/50 backdrop-blur-xl overflow-hidden">
                    <TabsSection />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default DashboardPage;