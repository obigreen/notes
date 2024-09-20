import React, {useEffect, useRef} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

import {
    ParagraphTitle,
    ButtonCopy,
    CodeBlockWrapp, Marker,
    NoteBlock, Text, TextP, BookTitle, Section, TypeTitle
} from "../RecordsDirectory_Style";
import Copy from '../../accets/img/all/copy.png'

//type for code
interface HighlightedCodeBlockProps {
    children: string;
}

// ---------------------------------------------------------------------------------------
// code block + copy button
const HighlightedCodeBlock = ({children}: HighlightedCodeBlockProps) => {
    const codeRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [])
    const handleCopyClick = async () => {
        if (codeRef.current) {
            const range = document.createRange();
            range.selectNodeContents(codeRef.current);

            if (navigator.clipboard) {
                try {
                    const text = range.toString();
                    await navigator.clipboard.writeText(text);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            } else {
                const selection = window.getSelection();
                if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(range);
                    document.execCommand('copy');
                    selection.removeAllRanges();
                }
            }
        }
    }
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


// ---------------------------------------------------------------------------------------


export const InterviewQuestions = () => {

    return (
        <NoteBlock>
            <TypeTitle>Interview Questions</TypeTitle>
            <Text>
                <Section>
                    <ParagraphTitle>Who is <Marker>Front-end</Marker> developer?</ParagraphTitle>
                    <TextP>Базовая задаче Front-end разработчика, связать tag с function</TextP>
                </Section>
            </Text>
        </NoteBlock>
    );
};

