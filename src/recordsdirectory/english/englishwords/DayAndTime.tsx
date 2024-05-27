import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const dayAndTime = [
    { eng: 'Monday', rus: 'Понедельник' },
    { eng: 'Tuesday', rus: 'Вторник' },
    { eng: 'Wednesday', rus: 'Среда' },
    { eng: 'Thursday', rus: 'Четверг' },
    { eng: 'Friday', rus: 'Пятница' },
    { eng: 'Saturday', rus: 'Суббота' },
    { eng: 'Sunday', rus: 'Воскресенье' },
];


export const DayAndTime = () => {
    return (
        <NoteBlock>
            <NotesTitle>Questions</NotesTitle>
            <Text>
                {dayAndTime.map((dayAndTime, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{dayAndTime.eng}</S.EngWord>
                        <S.RusWord>{dayAndTime.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



