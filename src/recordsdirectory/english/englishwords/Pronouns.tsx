import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const pronouns = [
    { eng: 'he, she, it', rus: 'он, она, это' },
    { eng: 'you', rus: 'ты, вы' },
    { eng: 'we', rus: 'мы' },
    { eng: 'they', rus: 'они' },
    { eng: 'my', rus: 'мой' },
    { eng: 'me', rus: 'я, меня, мне' },
    { eng: 'Us', rus: 'мы, нас, нам' },
    { eng: 'her', rus: 'ее, ей' },
    { eng: 'his', rus: 'его' },
    { eng: 'him', rus: 'ему' },
    { eng: 'our, ours', rus: 'наш, наша, наше, наши' },
    { eng: 'them', rus: 'их, им' },
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



