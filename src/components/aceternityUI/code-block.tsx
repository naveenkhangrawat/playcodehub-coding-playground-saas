"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { atomDark, duotoneDark, materialDark, oneDark, nightOwl, dark, funky, coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code } from "lucide-react";



type CodeBlockProps = {
    language: string;
    filename: string;
    highlightLines?: number[];
    } & (
    | {
        code: string;
        tabs?: never;
    }
    | {
        code?: never;
        tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
        }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

    return (
        <div className="relative w-full rounded-lg bg-[#121218] p-4 text-sm">
            <div className="flex flex-col gap-2 mb-1">
                {tabsExist && (
                    <div className="flex  overflow-x-auto">
                    {tabs.map((tab, index) => (
                        <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`px-3 !py-2 text-xs transition-colors font-sans ${
                            activeTab === index
                            ? "text-white"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                        >
                        {tab.name}
                        </button>
                    ))}
                    </div>
                )}
                {!tabsExist && filename && (
                    <div className="flex justify-between items-center px-4 sm:px-6 py-2 border-b border-[#ffffff0a]">
                        <div className="flex items-center gap-2 text-[#808086]">
                            <Code className="w-4 h-4"/>
                            <span className="text-sm font-medium">{filename}</span>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
                        >
                            {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                        </button>
                    </div>
                )}
            </div>
            <div className="max-h-[615px] overflow-auto">
                <SyntaxHighlighter
                language={activeLanguage}
                style={oneDark}
                customStyle={{
                    margin: 0,
                    padding: '10px',
                    background: "transparent",
                    fontSize: "16px", // text-sm equivalent,
                }}
                wrapLines={true}
                showLineNumbers={true}
                lineProps={(lineNumber) => ({
                    style: {
                    backgroundColor: activeHighlightLines.includes(lineNumber)
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    display: "block",
                    width: "100%",
                    },
                })}
                PreTag="div"
                >
                {String(activeCode)}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};
