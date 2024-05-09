import React, {useEffect, useRef} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {S} from "../SamuraiFast_Styles";
import Copy from "../../../accets/img/all/copy.png";
import {ButtonCopy, CodeBlockWrapp, NoteBlock, NotesTitle, VideoContainer} from "../../RecordsDirectory_Style";

type NoteProps = {
    id: number;
    iframeSrc: string;
    code: string;
    noteTitle: string;
}

export const notesData = [
    {
        id: 1,
        noteTitle: "Destructuring useState",
        iframeSrc: "https://www.youtube.com/embed/wqs3LuU2x3s",

        code:
            `
    const result = useState(tasks)
    const state = result[0]
    const setState = result[1]

    const [state, setState] = useState(tasks)
            `
    },
    {
        id: 2,
        noteTitle: "ArrayMethots .filter",
        iframeSrc: "https://www.youtube.com/embed/84wKkCVqEnk",

        code:
            `
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "REACT", isDone: false}
    ]);


    function removeTasak(taskId: number) {
        let resutlTasks = tasks.filter(t => t.id !== taskId)
        setTasks(resutlTasks)
    }            
            `
    },
];

export const SamuraiFastItem: React.FC<{ data: NoteProps }> = ({data}) => {

    const codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, []);


    const copyToClipboard = () => {
        navigator.clipboard.writeText(data.code).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <NoteBlock>
            <NotesTitle>{data.noteTitle}</NotesTitle>

            <S.NotesBlock>
                <VideoContainer>
                    <iframe src={data.iframeSrc}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
                </VideoContainer>
            </S.NotesBlock>

            <CodeBlockWrapp>
                <pre>
                    <code ref={codeRef} className="javascript">
                        {data.code}
                    </code>
                </pre>
                <ButtonCopy onClick={copyToClipboard}>
                    <img src={Copy} alt="Copy"/>
                </ButtonCopy>
            </CodeBlockWrapp>
        </NoteBlock>
    );
};