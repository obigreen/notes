import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const prepositions = [
    { eng: 'for', rus: 'для' },
    { eng: 'With', rus: 'с' },
    { eng: 'in', rus: 'в' },
    { eng: 'into', rus: 'внутрь' },
    { eng: 'about', rus: 'о (о ком-то, о чем-то)' },
    { eng: 'From', rus: 'из' },
    { eng: 'Or', rus: 'или' },
    { eng: 'at', rus: 'у, в, на' },
    { eng: 'of', rus: 'из, от' },
    { eng: 'to', rus: 'к' },
    { eng: 'also', rus: 'также' },
    { eng: 'on', rus: 'на' },
    { eng: 'from ... to ...', rus: 'с ... до ...' }
];


export const Prepositions = () => {
    return (
        <NoteBlock>
            <NotesTitle>Prepositions</NotesTitle>
            <Text>
                {prepositions.map((prepositions, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{prepositions.eng}</S.EngWord>
                        <S.RusWord>{prepositions.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



