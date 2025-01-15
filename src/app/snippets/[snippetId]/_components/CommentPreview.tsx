import { CodeBlock } from '@/components/aceternityUI/code-block';
import React from 'react'

function CommentPreview({content} : {content: string}) {

    const contentParts = content.split(/(```[\w-]*\n[\s\S]*?\n```)/g);

    const result = contentParts.map((part, index) => {
        if(part.startsWith("```")){
            const matchedParts = part.match(/```([\w-]*)\n([\s\S]*?)\n```/);
            if(matchedParts){
                const [, language, code] = matchedParts;
                return (
                    <div key={index} className='mt-4 mb-4'>
                        <CodeBlock language={language} code={code} filename={language}/>
                    </div>
                )
            }
        }

        const normalContent = part.split("\n");
        return (
            <div key={index}>
                {normalContent.map((line, index) => (
                    <p key={index} className=" text-gray-100">
                        {line}
                    </p>
                ))}
            </div>
        )})

    return (
        <div className="max-w-none text-white">
            {result.map((elm, index) => (
                <React.Fragment key={index}>
                {elm}
                </React.Fragment>
            ))}
        </div>
    )
}

export default CommentPreview