import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const prepositions = [
    { eng: 'for', rus: 'для' },
    { eng: 'with', rus: 'с (кем-то, чем-то)' },
    { eng: 'without', rus: 'без' },
    { eng: 'in', rus: 'в' },
    { eng: 'into', rus: 'внутрь' },
    { eng: 'about', rus: 'о (о ком-то, о чем-то)' },
    { eng: 'from', rus: 'из' },
    { eng: 'or', rus: 'или' },
    { eng: 'at', rus: 'у, в, на' },
    { eng: 'of', rus: 'из, от' },
    { eng: 'to', rus: 'к (чему-то), в' },
    { eng: 'also', rus: 'также' },
    { eng: 'on', rus: 'на' },
    { eng: 'from ... to ...', rus: 'с ... до ...' },
    { eng: 'near', rus: 'рядом' },
    { eng: 'during', rus: 'в течении' },
    { eng: 'only', rus: 'только' },
    { eng: 'before', rus: 'до' },
    { eng: 'after', rus: 'после' },
    { eng: 'through', rus: 'через' },
    { eng: 'over', rus: 'над' },
    { eng: 'under', rus: 'под' },
    { eng: 'between', rus: 'между' },
    { eng: 'as', rus: 'как' },
    { eng: 'by', rus: 'у, рядом с' },
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



