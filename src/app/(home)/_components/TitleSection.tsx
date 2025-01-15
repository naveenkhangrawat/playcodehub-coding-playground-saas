import React from 'react'


interface TitleSectionProps {
    title: React.ReactNode,
    subheading? : string,
    pill: string,
    mainHeading? : boolean
}

function TitleSection({title, subheading, pill, mainHeading}: TitleSectionProps) {
    return (
        <>
        <div className='flex flex-col gap-6 justify-center items-center'>
            <div className='rounded-full p-[1px] text-sm bg-gradient-to-r from-blue-700 to-purple-800'>
                <div className='rounded-full px-3 py-1 bg-black'>
                    {pill}
                </div>
            </div>
            <h1 className={`${mainHeading ? "text-4xl sm:text-7xl" : "text-3xl sm:text-5xl"} sm:max-w-[850px] text-center font-semibold bg-clip-text text-transparent bg-gradient-to-b from-purple-300 to-purple-100 bg-opacity-50`}>
                {title}
            </h1>
            <p className='text-purple-100 sm:max-w-[550px] text-center mt-3'>
                {subheading}
            </p>
        </div>
        </>
    )
}

export default TitleSection