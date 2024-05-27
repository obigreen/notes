import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const adjectives = [
    { eng: 'Is not defined', rus: 'Не существует' },
    { eng: 'primary', rus: 'Начальный' },
    { eng: 'secondary', rus: 'Вторичный' },
    { eng: 'Assets', rus: 'Ресурсы' },
    { eng: 'layout', rus: 'Макет' },
    { eng: 'Array', rus: 'Массив' },

];


export const ProgrammingLanguageTranslate = () => {
    return (
        <NoteBlock>
            <NotesTitle>Ajectives</NotesTitle>
            <Text>
                {adjectives.map((adjectives, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{adjectives.eng}</S.EngWord>
                        <S.RusWord>{adjectives.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



