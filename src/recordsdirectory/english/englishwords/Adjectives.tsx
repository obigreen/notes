import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const adjectives = [
    { eng: 'old', rus: 'старый' },
    { eng: 'busy', rus: 'занятый' },
    { eng: 'easy', rus: 'легкий' },
    { eng: 'empty', rus: 'пустой' },
    { eng: 'foreign', rus: 'иностранный' },
    { eng: 'little', rus: 'маленький' }
];


export const Ajectives = () => {
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



