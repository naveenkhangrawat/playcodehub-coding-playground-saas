import React from 'react'
import TitleSection from '../TitleSection';
import { Button } from '../../../../components/ui/button';
import InfiniteCardsScroll from '../InfiniteCardsScroll';
import FeatureSection from '../FeatureSection';
import Testimonials from '../Testimonials';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { FEATURES } from '@/app/pricing/_constants';
import FeatureCategory from '@/app/pricing/_components/FeatureCategory';
import FeatureItem from '@/app/pricing/_components/FeatureItem';
import { FeatureLabelType } from '@/types';
import Image from 'next/image';



function LandingPage() {

    return (
        <div>
            <div className='overflow-hidden px-4 sm:px-6 mt-16 sm:flex sm:flex-col gap-4 sm:justify-center sm:items-center'>
                <TitleSection 
                    title={<>Code Made Simple <br /> Share Made Seamless</>}
                    subheading="Transform the way you write and share code. Build projects, share snippets, and collaborate in real-time—all on one powerful platform."
                    pill="✔ Your All-in-one playground"
                    mainHeading={true}
                />
                
                <Link href='/editor' >
                    <div className='bg-white p-[2px] mt-6 rounded-xl bg-gradient-to-r from-purple-300 to-purple-900 sm:w-[300px]'>
                        <Button variant="outline" className='w-full rounded-[10px] p-6 text-xl bg-background hover:bg-background/90'>
                            Playground
                        </Button>
                    </div>
                </Link>

                <div className='mt-16 sm:w-full w-[700px] flex justify-center items-center relative sm:ml-0 ml-[-80px]'>
                    <div className='w-[75%] md:blur-[50px] blur-[30px] rounded-full h-32 absolute bg-purple-800/50 -z-10 top-[-30px]' />
                    <div className="w-full max-w-[1250px] sm:w-[95%] rounded-xl p-4 ring-1 ring-gray-700 backdrop-blur-xl bg-white/5">
                        <div className='rounded-xl overflow-hidden'>
                            <Image src={'/playcodehub.png'} alt='Application banner' width={1250} height={860} className='w-full h-full' />
                        </div>
                    </div>
                    <div className="bottom-0 top-[50%] bg-gradient-to-t from-[#0C1220] left-0 right-0 absolute z-10"></div>
                </div>
            </div>

            <div className='mt-32 mb-16'>
                <InfiniteCardsScroll />
            </div>

            <div id='features' className='px-4 sm:p-6 flex justify-center items-center flex-col relative scroll-mt-20'>
                <div className='w-[30%] md:blur-[120px] blur-[70px] rounded-full h-32 absolute bg-purple-800/50 -z-10 sm:top-22 top-10'></div>
                <TitleSection 
                    title="Features that will blow your mind"
                    pill='Features'
                    subheading=''
                />
                <div className='md:mt-3 md:w-full'>
                    <FeatureSection />
                </div>
            </div>

            <div id='testimonials' className='mt-16 mb-16 px-4 sm:p-6 relative flex flex-col justify-start items-center scroll-mt-20'>
                <div className='w-[30%] md:blur-[120px] blur-[70px] rounded-full h-48 absolute bg-purple-800/50 -z-10 sm:top-15 top-22'>
                </div>

                <div className='rounded-full p-[1px] text-sm bg-gradient-to-r from-blue-700 to-purple-800'>
                    <div className='rounded-full px-3 py-1 bg-black'>
                        Testimonials
                    </div>
                </div>

                <div className='mt-8 xl:mt-0 grid grid-cols-1 xl:grid-cols-3 gap-5 items-center justify-center'>
                    <h1 className={`text-3xl sm:text-4xl text-center font-semibold bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-100 bg-opacity-50`}>
                        Don't take our word for it. Take theirs
                    </h1>
                    <div className='xl:col-span-2'>
                        <Testimonials />
                    </div>
                </div>
            </div>

            <div id="pricing" className='mt-16 mb-16 px-4 sm:p-6 relative flex flex-col justify-start items-center scroll-mt-20'>
                <div className='w-[30%] md:blur-[120px] blur-[70px] rounded-full h-48 absolute bg-purple-800/50 -z-10 sm:top-15 top-22'>
                </div>
                <TitleSection 
                    title="Simple pricing to elevate your development experience"
                    pill='Pricing'
                    subheading='Join the next generation of developers with our professional suite of tools'
                />

                <div className="relative max-w-4xl mx-auto mt-16">
                    <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-10" />
                    <div className="relative bg-background/80 backdrop-blur-xl rounded-2xl">
                        <div  className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"/>
                        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"/>

                        <div className="relative p-8 md:p-12">
                            {/* header */}
                            <div className="text-center mb-12">
                                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-gray-800/60 mb-6">
                                    <Star className="w-8 h-8 text-blue-400"/>
                                </div>
                                <h2 className="text-3xl font-semibold text-white mb-4">
                                    Lifetime Pro Access
                                </h2>
                                <div className="flex items-baseline justify-center gap-2 mb-4">
                                    <span className="text-2xl text-gray-400">$</span>
                                    <span className="text-6xl font-semibold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
                                        49.99
                                    </span>
                                    <span className="text-xl text-gray-400">one-time</span>
                                </div>
                                <p className="text-gray-400 text-lg">
                                    Unlock the full potential of PlayCodeHub
                                </p>
                            </div>

                            {/* features grid */}
                            <div className="grid md:grid-cols-3 gap-12 mb-12">
                                {Object.keys(FEATURES).map((label) => (
                                    <FeatureCategory label={label} key={label}>
                                        <>
                                            {FEATURES[label as FeatureLabelType].map((feature, index) => (
                                                <FeatureItem key={index}>
                                                    {feature}
                                                </FeatureItem>
                                            ))}
                                        </>
                                    </FeatureCategory>
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <Link href={'/pricing'}>
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg
                                            transition-all duration-200 font-medium shadow-lg shadow-blue-500/20"
                                    >
                                        <span>Go to Pricing page</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-16 px-4 sm:p-6'></div>
        </div>
    )
}

export default LandingPage