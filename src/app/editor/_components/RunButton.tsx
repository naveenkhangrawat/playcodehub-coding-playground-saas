"use client";

import React from 'react'
import {motion} from "framer-motion"
import { useAppDispatch, useAppSelector, useAppStore } from '@/lib/hooks'
import { Loader2, Play } from 'lucide-react';
import { setError, setExecutionResult, setIsRunning, setOutput } from '@/reduxTk/editorSlice';
import { LANGUAGE_CONFIG } from '../_constants';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useStore } from 'react-redux';

function RunButton() {

    const {user} = useUser();

    const saveCodeExecution = useMutation(api.codeExecutions.saveCodeExecution);

    const isRunning = useAppSelector((state) => state.codeEditor.isRunning);
    const language = useAppSelector((state) => state.codeEditor.language);
    const editor = useAppSelector((state) => state.codeEditor.editor);
    const executionResult = useAppSelector((state) => state.codeEditor.executionResult);

    const dispatch = useAppDispatch();
    const store = useAppStore();

    console.log('component rerendering');

    async function executeCode(){
        const currentCode = editor?.getValue() || "";
        if(!currentCode){
            dispatch(setError("Please enter some code"));
            return;
        }

        dispatch(setIsRunning(true));

        try {
            const runtime = LANGUAGE_CONFIG[language].pistonRuntime
            const response = await fetch(`https://emkc.org/api/v2/piston/execute`, {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify({
                    language: runtime.language,
                    version: runtime.version,
                    files: [{content: currentCode}]
                })
            })

            const data = await response.json();
            console.log(data);

            // handle compilation errors
            if(data.compile && data.compile.code !== 0){
                const error = data.compile.stderr || data.compile.output;
                dispatch(setError(error));
                dispatch(setExecutionResult({code: currentCode, output: "", error}));
                return;
            }

            // handle run stage errors
            if(data.run && data.run.code !== 0){
                const error = data.run.stderr || data.run.output;
                dispatch(setError(error));
                dispatch(setExecutionResult({code: currentCode, output: "", error}));
                return;
            }

            // code has successfully executed
            const output = data.run.output;
            dispatch(setOutput(output.trim()));
            dispatch(setError(null));
            dispatch(setExecutionResult({code: currentCode, output: output.trim(), error: null}))

        } catch (error) {
            console.log("Error running code: ", error)
            dispatch(setError("Error running code"));
            dispatch(setExecutionResult({code: currentCode, output: "", error: "Error running code"}))
        } finally{
            dispatch(setIsRunning(false));
        }
    }

    async function runCodeHandler(){
        await executeCode();

        const result = store.getState().codeEditor.executionResult;

        if(user && result){
            // save the result in database
            await saveCodeExecution({
                language: language,
                code: result.code,
                output: result.output || undefined,
                error: result.error || undefined,
            })
        }
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative inline-flex items-center gap-2.5 px-5 py-2.5 disabled:cursor-not-allowed focus:outline-none
            `}
            disabled={isRunning}
            onClick={runCodeHandler}
        >
            {/* bg with gradient */}

            <div className={`absolute inset-0 bg-gradient-to-r ${isRunning ? "from-slate-500 to-slate-400" : "from-blue-600 to-blue-500"} rounded-xl opacity-100 transition-opacity group-hover:opacity-90`} />

            <div className="relative flex items-center gap-2.5">
                {isRunning ? (
                    <>
                        <div className="relative">
                            <Loader2 className="w-4 h-4 animate-spin text-white/70"/>
                            <div className="absolute inset-0 blur animate-pulse" />
                        </div>
                        <span className="text-sm font-medium text-white/90">Executing...</span>
                    </>
                ) : (
                    <>
                        <div className="relative flex items-center justify-center w-4 h-4">
                            <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white"/>
                        </div>
                        <span className="text-sm font-medium text-white/90 group-hover:text-white">
                            Run Code
                        </span>
                    </>
                )}
            </div>
            
        </motion.button>
    )
}

export default RunButton