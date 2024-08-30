import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const adverbs = [
    { eng: 'near', rus: 'рядом' },
    { eng: 'very', rus: 'очень' },
    { eng: 'just', rus: 'только что' },
    { eng: 'still', rus: 'все еще' },
    { eng: 'even', rus: 'даже' },
    { eng: 'also', rus: 'также' },
    { eng: 'often', rus: 'часто' },
    { eng: 'usually', rus: 'обычно' },
    { eng: 'really', rus: 'действительно' },
    { eng: 'always', rus: 'всегда' },
    { eng: 'sometimes', rus: 'иногда' },
    { eng: 'never', rus: 'никогда' },
    { eng: 'well', rus: 'хорошо' },
    { eng: 'actually', rus: 'на самом деле' },
    { eng: 'quickly', rus: 'быстро' },
    { eng: 'together', rus: 'вместе' },
    { eng: 'soon', rus: 'скоро' },
    { eng: 'finally', rus: 'наконец' },
    { eng: 'then', rus: 'тогда, затем' },
    { eng: 'here', rus: 'здесь' },
    { eng: 'there', rus: 'там' },
    { eng: 'out loud', rus: 'вслух' },
    { eng: 'almost', rus: 'почти' },
];


export const Adverbs = () => {
    return (
        <NoteBlock>
            <NotesTitle>Interjections</NotesTitle>
            <Text>
                {adverbs.map((adverbs, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{adverbs.eng}</S.EngWord>
                        <S.RusWord>{adverbs.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



