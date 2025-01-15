import React from 'react'
import EditorHeader from './_components/EditorHeader';
import EditorPanel from './_components/EditorPanel';
// import FloatingMenu from './_components/FloatingMenu';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import OutputPanel from './_components/OutputPanel';

function EditorPage() {
    return (
        <div className='min-h-screen'>
            <div className='max-w-[1800px] mx-auto p-4'>
                <EditorHeader />

                <ResizablePanelGroup 
                    direction='horizontal' 
                    className='grid grid-cols-1 lg:grid-cols-2 gap-4'
                >
                    <ResizablePanel defaultSize={60} minSize={50} maxSize={80} >
                        <EditorPanel />
                    </ResizablePanel>

                    <ResizableHandle withHandle/>

                    <ResizablePanel defaultSize={40}>
                        <OutputPanel />
                    </ResizablePanel>
                </ResizablePanelGroup>
                {/* output panel */}
            </div>

            {/* <FloatingMenu /> */}
        </div>
    )
}

export default EditorPage;