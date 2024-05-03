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
} from "../../../RecordsDirectory_Style";
import Copy from '../../../../accets/img/samuraifastimg/copy.png'

//type for texteria
type TextareaWithStorageProps = {
    id: string;
};

//type for code
interface HighlightedCodeBlockProps {
    children: string;
}

// ---------------------------------------------------------------------------------------
// code block + copy button
const HighlightedCodeBlock: FC<HighlightedCodeBlockProps> = ({children}) => {
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

//save texteria
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
// ---------------------------------------------------------------------------------------


export const CodeForLessons: FC = () => {
    return (
        <NoteBlock>
            <Text>
                <ParagraphTitle>Method .map через цикл</ParagraphTitle>
                <HighlightedCodeBlock>
                    {
                        `
const taskslist: Array<JSX.Element> = []
for (let i = 0; i < props.tasks.length; i++) {
    taskslist.push(
        <li><input type='checkbox' checked={props.tasks[i].isDone}/>
            <span>{props.tasks[i].title}</span>
            <button onClick={() => {
                props.removeTasak(props.tasks[i].id)
            }}>x
            </button>
        </li>
    )
}
                        `
                    }
                </HighlightedCodeBlock>

                <ParagraphTitle>Method .map через const</ParagraphTitle>
                <HighlightedCodeBlock>
                    {
                        `
const taskslist: Array<JSX.Element> = props.tasks.map(t => {

    return (
        <li>
            <input type='checkbox' checked={t.isDone}/>
            <span>{t.title}</span>
            <button>x</button>
        </li>
    )
})

// так отрисовываем
<ul>
     {taskslist}
</ul>
                        `
                    }
                </HighlightedCodeBlock>

                <TextareaWrapper>
                    <TextareaWithStorage id="123"></TextareaWithStorage>
                </TextareaWrapper>
            </Text>
        </NoteBlock>
    );
};
// ATTENTION!!!!!!!!!!!! с 2ым туду разобрать прошлые комменты

// // удаление tasks
// function removeTasak(taskId: number) {
//     // через filter
//     let resutlTasks = tasks.filter(t => t.id !== taskId) // к примеру если
//     // id не равно(!==) выбранному для удаления id то вернет true
//     // если равен то false
//     setTasks(resutlTasks)
//
//     // через цикл
//     // const newState = []
//     // for (let i = 0; i < tasks.length; i++) {
//     //     if (tasks[i].id !== taskId) {
//     //         newState.push(tasks[i])
//     //     }
//     // }
//     // setTasks(newState)
// }

// // фильтрация списков по кнопкам
// // local state
// const [filter, setFilter] = useState<FilterValuesType>("All")
//
// const changeFilter = (nextFilter: FilterValuesType) => {
//     setFilter(nextFilter)
// }
// // UI
// const getTasksForTodolist = (allTasks: Array<TaskType>, nextFilterValue: FilterValuesType) => {
//     switch (nextFilterValue) {
//         case "Active":
//             //!t.isDone упрощена от t.isDone === false, если сокращать, обязательно отследить что бы у false стояло !-не, а то у меня 2 кнопки отрабатывали Completed так как я просто сократил t.isDone оба =)
//             return allTasks.filter(t => !t.isDone);
//         case "Completed":
//             return allTasks.filter(t => t.isDone);
//         default:
//             return allTasks;
//     }
// }
// const tasksForTodolist = getTasksForTodolist(tasks, filter);
//
//
// // function changeFilter(value: FilterValuesType) {
// //     setFilter(value);
// // }
// // let tasksForTodolist = tasks;
// // if (filter === "Completed") {
// //     tasksForTodolist = tasks.filter(t => t.isDone);
// // }
// //
// // if (filter === "Active") {
// //     tasksForTodolist = tasks.filter(t => t.isDone);
// // }







// ===========================================================================detals
// <Marker></Marker>
// <Link target={"_blank"} href="#"></Link>

// <BookTitle></BookTitle>
// <ParagraphTitle></ParagraphTitle>
// <TextP></TextP>
//
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
//
//         `
//     }
// </HighlightedCodeBlock>


// <VideoContainer>
//     <iframe src="https://www.youtube.com/embed/84wKkCVqEnk"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
// </VideoContainer>

