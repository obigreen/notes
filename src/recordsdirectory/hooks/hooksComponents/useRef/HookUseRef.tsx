import React, {useEffect, useRef} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {
    ButtonCopy,
    CodeBlockWrapp, Link,
    Text, BookTitle, Section, NoteBlock
} from "../../../RecordsDirectory_Style";
import Copy from '../../../../accets/img/all/copy.png'


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


export const HookUseRef = () => {


    return (
        <NoteBlock>
            <Text>
                <BookTitle>useRef</BookTitle>
                <Section>
                    <Link target={"_blank"} href="https://react.dev/reference/react/useRef">useRef - документация</Link>
                </Section>
            </Text>
        </NoteBlock>
   );
};

