import React, {useEffect, useRef, FC, ChangeEvent, useState} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

import Copy from '../../../../accets/img/samuraifastimg/copy.png'
import {
    BookTitle,
    ButtonCopy,
    CodeBlockWrapp, Link, Marker, NoteBlock, NoteLi, NoteUl,
    ParagraphTitle,
    Textarea,
    TextareaWrapper, TextP, Text
} from "../../../RecordsDirectory_Style";


type TextareaWithStorageProps = {
    id: string;
};

interface HighlightedCodeBlockProps {
    children: string;
}

const HighlightedCodeBlock: FC<HighlightedCodeBlockProps> = ({children}) => {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [])



    //
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

//texteria
const useTextareaStorage = (id: string): [string, (value: string) => void] => {
    const localStorageKey = `textareaContent_${id}`;
    const [value, setValue] = useState<string>(() => {
        return localStorage.getItem(localStorageKey) || '';
    });

    const setStoredValue = (newValue: string) => {
        setValue(newValue);
        localStorage.setItem(localStorageKey, newValue);
    };
    return [value, setStoredValue];
};
const TextareaWithStorage = ({id}: TextareaWithStorageProps) => {
    const [textValue, setTextValue] = useTextareaStorage(id);

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(event.target.value);
    };

    return (
        <TextareaWrapper>
            <Textarea value={textValue} onChange={handleTextChange}/>
        </TextareaWrapper>
    );
};

export const OneWhatJavaScript: FC = () => {


    return (
        <NoteBlock>
            <Text>

            </Text>
        </NoteBlock>
    );
};


// ===========================================================================detals

// <NoteUl>
//     <NoteLi></NoteLi>
//     <NoteLi></NoteLi>
//     <NoteLi></NoteLi>
// </NoteUl>

// <BookTitle></BookTitle>
// <ParagraphTitle></ParagraphTitle>
// <TextP></TextP>

// <Marker></Marker>
// <Link href="#"></Link>


// <TextareaWrapper>
//     <TextareaWithStorage id=" " />
// </TextareaWrapper>

// <HighlightedCodeBlock>
//     {
//         `

//                     `
//     }
// </HighlightedCodeBlock>


// <VideoContainer>
//     <iframe src="https://www.youtube.com/embed/84wKkCVqEnk"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
// </VideoContainer>