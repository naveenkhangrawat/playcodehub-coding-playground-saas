
import { editor } from "monaco-editor"
import { Id } from "../../convex/_generated/dataModel"


export type FeatureLabelType = "development" | "collaboration" | "deployment"

export interface Theme {
    id: string,
    label: string,
    color: string
}

export interface ExecutionResult {
    code: string,
    output: string,
    error: string | null
}

export type CodeEditorState = {
    language: string,
    output: string,
    isRunning: boolean,
    error: string | null,
    theme: string,
    fontSize: number,
    editor: editor.IStandaloneCodeEditor | null,
    executionResult: ExecutionResult | null,
}

export type Snippet =  {
    _id: Id<"snippets">;
    _creationTime: number;
    language: string;
    code: string;
    title: string;
    userId: string;
    username: string;
}