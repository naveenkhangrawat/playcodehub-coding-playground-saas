import { CodeEditorState, ExecutionResult } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


function getSavedInitialState(){
    if(typeof window === "undefined"){
        return {
            language: "javascript",
            fontSize: 16,
            theme: "vs-dark"
        }
    }

    const savedLanguage = localStorage.getItem("editor-language") || "javascript";
    const savedFontSize = localStorage.getItem("editor-font-size") || 16;
    const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";

    return {
        language: savedLanguage,
        fontSize: Number(savedFontSize),
        theme: savedTheme
    }
}

const savedInitialState = getSavedInitialState();


const initialState: CodeEditorState = {
    ...savedInitialState,
    editor: null,
    error: null,
    output: "",
    isRunning: false,
    executionResult: null,
}


const editorSlice = createSlice({
    name: "codeEditor",
    initialState,
    reducers: {
        setEditor: (state, action) => {
            state.editor = action.payload
        },
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
        setFontSize: (state, action: PayloadAction<number>) => {
            state.fontSize = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setIsRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload;
        },
        setOutput: (state, action: PayloadAction<string>) => {
            state.output = action.payload;
        },
        setExecutionResult: (state, action: PayloadAction<ExecutionResult | null>) => {
            if(action.payload){
                state.executionResult = {...state.executionResult, ...action.payload}
            }
            state.executionResult = action.payload
        }
    }
})

export const {
    setEditor, 
    setTheme, 
    setLanguage, 
    setFontSize, 
    setError, 
    setIsRunning, 
    setOutput,
    setExecutionResult

} = editorSlice.actions;

export default editorSlice.reducer;