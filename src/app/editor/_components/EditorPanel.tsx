"use client"

import { useAppDispatch, useAppSelector, useMounted } from '@/lib/hooks'
import { Editor } from '@monaco-editor/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { defineMonacoThemes, LANGUAGE_CONFIG } from '../_constants';
import { editor } from 'monaco-editor';
import { setEditor, setFontSize } from '@/reduxTk/editorSlice';
import Image from 'next/image';
import { RotateCcwIcon, ShareIcon, TypeIcon } from 'lucide-react';
import {motion} from "framer-motion";
import { useClerk } from '@clerk/nextjs';
import ShareSnippetDialog from './ShareSnippetDialog';
import {EditorPanelSkeleton, EditorViewSkeleton} from './EditorPanelSkeleton';

function EditorPanel() {

    const clerk = useClerk();
    const isMounted = useMounted();

    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

    const editor = useAppSelector((state) => state.codeEditor.editor);
    const language = useAppSelector((state) => state.codeEditor.language);
    const fontSize = useAppSelector((state) => state.codeEditor.fontSize);
    const theme = useAppSelector((state) => state.codeEditor.theme);
    
    const languageInfo = LANGUAGE_CONFIG[language];
    
    const dispatch = useAppDispatch();

    
    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor){
        const savedCode = localStorage.getItem(`editor-code-${language}`);
        if(savedCode){
            editor.setValue(savedCode);
        } else {
            editor.setValue(languageInfo.defaultCode);
        }
        dispatch(setEditor(editor));
    }

    function handleEditorChange(value: string | undefined){
        if(value){
            localStorage.setItem(`editor-code-${language}`,value);
        }
    }

    function handleFontSizeChange(event: ChangeEvent<HTMLInputElement>){
        const size = Math.max(12, Math.min(parseInt(event.target.value), 24));
        localStorage.setItem("editor-font-size", String(size));
        dispatch(setFontSize(size));
    }

    function handleRefresh(){
        const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
        if(editor){
            editor.setValue(defaultCode);
            
        }
        localStorage.removeItem(`editor-code-${language}`);
    }

    useEffect(() => {
        const savedCode = localStorage.getItem(`editor-code-${language}`);
        const defaultCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
        if(editor){
            editor.setValue(defaultCode);
        }
    }, [language, editor])


    if(!isMounted) return <EditorViewSkeleton />;

    return (
        <div className='relative'>
            <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">

                {/* header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
                            <Image src={"/" + language + ".png"} alt="Logo" width={24} height={24}/>
                        </div>
                        <div>
                            <h2 className="text-sm font-medium text-white">Code Editor</h2>
                            <p className="text-xs text-gray-500">Write and execute your code</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">

                        {/* font size slider */}
                        <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
                            <TypeIcon className="size-4 text-gray-400"/>
                            <div className="flex items-center gap-3">
                                <input 
                                    type='range'
                                    min={12}
                                    max={24}
                                    className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                                    value={fontSize}
                                    onChange={handleFontSizeChange}
                                />
                                <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                                    {fontSize}
                                </span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRefresh}
                            className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
                            aria-label="Reset to default code"
                        >
                            <RotateCcwIcon className="size-4 text-gray-400"/>
                        </motion.button>

                        {/* share button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsShareDialogOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
                        >
                            <ShareIcon className="size-4 text-white"/>
                            <span className="text-sm font-medium text-white">Share</span>
                        </motion.button>
                    </div>
                </div>

                {/* Editor */}
                <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
                    {clerk.loaded && (
                        <Editor 
                            height="600px"
                            language={LANGUAGE_CONFIG[language].monacoLanguage}
                            theme={theme}
                            beforeMount={defineMonacoThemes}
                            onMount={handleEditorDidMount}
                            onChange={handleEditorChange}
                            options={{
                                minimap: { enabled: false },
                                fontSize,
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                                padding: { top: 16, bottom: 16 },
                                renderWhitespace: "selection",
                                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                                fontLigatures: true,
                                cursorBlinking: "smooth",
                                smoothScrolling: true,
                                contextmenu: true,
                                renderLineHighlight: "all",
                                lineHeight: 1.6,
                                letterSpacing: 0.5,
                                roundedSelection: true,
                                scrollbar: {
                                    verticalScrollbarSize: 8,
                                    horizontalScrollbarSize: 8,
                                },
                            }}
                        />
                    )}

                    {!clerk.loaded && <EditorPanelSkeleton />}
                </div>
            </div>

            {isShareDialogOpen && <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)}/>}
        </div>
    )
}

export default EditorPanel