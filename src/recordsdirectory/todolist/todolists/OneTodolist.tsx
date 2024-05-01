import React, {useEffect, useRef, FC, ChangeEvent, useState} from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {
    BookTitle,
    ButtonCopy,
    CodeBlockWrapp, Link, Marker,
    NoteBlock, NoteLi, NoteUl, ParagraphTitle,
    Text,
    Textarea,
    TextareaWrapper, TextP
} from "../../RecordsDirectory_Style";
import Copy from '../../../accets/img/samuraifastimg/copy.png'


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

export const OneTodolist: FC = () => {


    return (
        <NoteBlock>
            <Text>
                <BookTitle>Todolist one</BookTitle>
                <ParagraphTitle>Подготовка к занятию</ParagraphTitle>

                <NoteUl>
                    <NoteLi><Marker>1</Marker> Создать проект - <Link target={"_blank"}
                                                     href="https://create-react-app.dev/docs/adding-typescript/">React</Link></NoteLi>
                    <NoteLi><Marker>2</Marker> Установить <Marker>зависимости</Marker></NoteLi>
                    <NoteLi><Marker>3</Marker> Запустить приложение</NoteLi>
                </NoteUl>

                <ParagraphTitle>Создание компонента</ParagraphTitle>

                <TextP>
                    Создаю компонент Todolist.tsx
                </TextP>


                <HighlightedCodeBlock>
                    {
                        `
// Todolist.tsx
export const Todolist = () => {
    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={true} /> <span>HTML&CSS</span>
                </li>
                <li>
                    <input type="checkbox" checked={true} /> <span>JS</span>
                </li>
                <li>
                    <input type="checkbox" checked={false} /> <span>React</span>
                </li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}


// App.tsx
function App() {
  return (
    <div className="App">
      <Todolist />
      <Todolist />
      <Todolist />
    </div>
  )
}
                    `
                    }
                </HighlightedCodeBlock>

                <ParagraphTitle>Именованный и default <Marker>export</Marker></ParagraphTitle>
                <TextP>
                    Для отдельных component <Marker>всегда</Marker> ставим именованный export - <Marker>"export const Component"</Marker>
                </TextP>


                <ParagraphTitle>Стрелочная или declaration functions</ParagraphTitle>

                <HighlightedCodeBlock>
                    {
                    `
const Todolist = () => {...}

// or

function Todolist() {...}

() => {}
                    `
                    }
                </HighlightedCodeBlock>
                <ParagraphTitle>props</ParagraphTitle>
                <TextP>С помощью props начну передавать разные заголовки для Todolist</TextP>

            </Text>
        </NoteBlock>
    );
};


// ===========================================================================detals
// <Marker></Marker>
// <Link href="#"></Link>

// <BookTitle></BookTitle>
// <ParagraphTitle></ParagraphTitle>
// <TextP></TextP>

// <NoteUl>
//     <NoteLi></NoteLi>
//     <NoteLi></NoteLi>
//     <NoteLi></NoteLi>
// </NoteUl>

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








