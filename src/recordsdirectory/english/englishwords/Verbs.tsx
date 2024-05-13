import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const verbs = [
    { eng: 'listen', rus: 'слушать' },
    { eng: 'open', rus: 'открыть, раскрытый' },
    { eng: 'visit', rus: 'визит, посещение' },
    { eng: 'visit', rus: 'посещать' },
    { eng: 'learn', rus: 'учить' },
    { eng: 'write', rus: 'писать' },
    { eng: 'come in', rus: 'входить' },
    { eng: 'go out', rus: 'выходить' },
    { eng: 'spend', rus: 'тратить' },
    { eng: 'send', rus: 'отправлять' },
    { eng: 'see', rus: 'видеть' },
    { eng: 'set', rus: 'набор' },
    { eng: 'test (verb)', rus: 'тестировать' },
    { eng: 'spell', rus: 'произносить' },
    { eng: 'sleep', rus: 'спать' },
    { eng: 'meet', rus: 'встречаться, знакомиться' },
    { eng: 'mend', rus: 'чинить' },
    { eng: 'tell', rus: 'сказать' },
    { eng: 'lend', rus: 'одолжить, занять' },
    { eng: 'wash', rus: 'мыть' },
    { eng: 'start', rus: 'начинать' },
    { eng: 'drive', rus: 'водить, управлять' },
    { eng: 'have', rus: 'иметь' },
    { eng: 'read', rus: 'читать' },
    { eng: 'study', rus: 'изучать' },
    { eng: 'live', rus: 'жить' },
    { eng: 'eat', rus: 'есть' },
    { eng: 'do', rus: 'делать' },
    { eng: 'make', rus: 'делать, создавать' },
    { eng: 'choose', rus: 'выбирать' },
//
    { eng: 'rest', rus: 'отдыхать' },
    { eng: 'train', rus: 'тренироваться' },
    { eng: 'speak', rus: 'говорить' },
    { eng: 'goes', rus: 'ходит' },
    { eng: 'works', rus: 'работает' },
    { eng: 'sleeps', rus: 'спит' },
    { eng: 'takes', rus: 'принимает' },
    { eng: 'have', rus: 'иметь' },
    { eng: 'made', rus: 'сделал' }
];


export const Verbs = () => {
    return (
        <NoteBlock>
            <NotesTitle>Verbs</NotesTitle>
            <Text>
                {verbs.map((verbs, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{verbs.eng}</S.EngWord>
                        <S.RusWord>{verbs.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



