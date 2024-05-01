import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const pronouns = [
    { eng: 'My', rus: 'Мой' },
    { eng: 'her', rus: 'ее' },
    { eng: 'his', rus: 'его' },
    { eng: 'he, she, it', rus: 'он, она, это' },
    { eng: 'our, ours', rus: 'наш, наша, наше, наши' },
    { eng: 'him', rus: 'его' },
    { eng: 'Us', rus: 'мы, нас, нам' },
    { eng: 'Them', rus: 'они, их, им' },
    { eng: 'Me', rus: 'я, меня, мне' }
];


export const Pronouns = () => {
    return (
        <NoteBlock>
            <NotesTitle>Pronouns</NotesTitle>
            <Text>
                {pronouns.map((pronouns, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{pronouns.eng}</S.EngWord>
                        <S.RusWord>{pronouns.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



