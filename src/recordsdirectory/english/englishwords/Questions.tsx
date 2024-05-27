import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const questions = [
    { eng: 'What?', rus: 'Что?' },
    { eng: 'Who?', rus: 'Кто?' },
    { eng: 'Where?', rus: 'Где?' },
    { eng: 'When?', rus: 'Когда?' },
    { eng: 'Why?', rus: 'Почему?' },
    { eng: 'How?', rus: 'Как?' },
    { eng: 'How many?', rus: 'Сколько?' },
    { eng: 'Whose?', rus: 'Чей?' },
    { eng: 'Whom?', rus: 'Кому?' },
    { eng: 'What is?', rus: 'Что такое?' },
];


export const Questions = () => {
    return (
        <NoteBlock>
            <NotesTitle>Questions</NotesTitle>
            <Text>
                {questions.map((questions, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{questions.eng}</S.EngWord>
                        <S.RusWord>{questions.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



