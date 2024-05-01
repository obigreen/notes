import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const interjections = [
    { eng: 'oh', rus: 'о' },
    { eng: 'ah', rus: 'ах' },
    { eng: 'hey', rus: 'эй' },
    { eng: 'Bye!', rus: 'Пока!' },
    { eng: 'Bye-Bye!', rus: 'Пока-пока!' }
];


export const Interjections = () => {
    return (
        <NoteBlock>
            <NotesTitle>Interjections</NotesTitle>
            <Text>
                {interjections.map((interjections, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{interjections.eng}</S.EngWord>
                        <S.RusWord>{interjections.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



