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
    { eng: 'set', rus: 'устанавливать' },
    { eng: 'test (verb)', rus: 'тестировать' },
    { eng: 'spell', rus: 'произносить, чары' },
    { eng: 'sleep', rus: 'спать' },
    { eng: 'meet', rus: 'встречаться, знакомиться' },
    { eng: 'mend', rus: 'чинить' },
    { eng: 'tell', rus: 'сказать' },
    { eng: 'lend', rus: 'одолжить, занять' }
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



