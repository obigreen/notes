import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const conjunctions = [
    { eng: 'so', rus: 'так' },
    { eng: 'but', rus: 'но' },
    { eng: 'and', rus: 'и' },
    { eng: 'or', rus: 'или' },
    { eng: 'because', rus: 'потому что' }
];


export const Conjunctions = () => {
    return (
        <NoteBlock>
            <NotesTitle>Conjunctions</NotesTitle>
            <Text>
                {conjunctions.map((conjunctions, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{conjunctions.eng}</S.EngWord>
                        <S.RusWord>{conjunctions.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



