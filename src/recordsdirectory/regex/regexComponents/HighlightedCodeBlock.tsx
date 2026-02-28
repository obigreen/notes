import React, {useEffect, useRef} from "react";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import {
    ButtonCopy,
    CodeBlockWrapp
} from "../../RecordsDirectory_Style";
import Copy from "../../../accets/img/all/copy.png";

type HighlightedCodeBlockProps = {
    children: string;
};

export const HighlightedCodeBlock = ({children}: HighlightedCodeBlockProps) => {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [children]);

    const handleCopyClick = async () => {
        if (!codeRef.current) {
            return;
        }

        const range = document.createRange();
        range.selectNodeContents(codeRef.current);

        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(range.toString());
            } catch (error) {
                console.error("Failed to copy text:", error);
            }
            return;
        }

        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand("copy");
            selection.removeAllRanges();
        }
    };

    return (
        <CodeBlockWrapp>
            <pre>
                <code ref={codeRef} className="javascript">
                    {children}
                </code>
            </pre>
            <ButtonCopy onClick={handleCopyClick}>
                <img src={Copy} alt="Copy"/>
            </ButtonCopy>
        </CodeBlockWrapp>
    );
};
