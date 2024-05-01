import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const nouns = [
    { eng: 'people', rus: 'люди' },
    { eng: 'note', rus: 'запись, записка, примечание' },
    { eng: 'notes', rus: 'записи, конспект' },
    { eng: 'post (as in mail)', rus: 'почта' },
    { eng: 'soap', rus: 'мыло' },
    { eng: 'toast', rus: 'тост (хлеб)' },
    { eng: 'boat', rus: 'лодка, судно' },
    { eng: 'film', rus: 'фильм' },
    { eng: 'bill', rus: 'счет (ко оплате)' },
    { eng: 'list', rus: 'список' },
    { eng: 'visit', rus: 'визит, посещение' },
    { eng: 'visit', rus: 'посещать' },
    { eng: 'tennis', rus: 'теннис' },
    { eng: 'belly', rus: 'живот (разговорный)' },
    { eng: 'tin', rus: 'банка' },
    { eng: 'minute', rus: 'минута' },
    { eng: 'event', rus: 'событие' },
    { eng: 'sentence', rus: 'предложение' },
    { eng: 'telly', rus: 'телевизор' },
    { eng: 'file', rus: 'файл' },
    { eng: 'time', rus: 'время' },
    { eng: 'slide', rus: 'слайд' },
    { eng: 'life', rus: 'жизнь' },
    { eng: 'lives', rus: 'жизни' },
    { eng: 'find', rus: 'найти' },
    { eng: 'type', rus: 'тип' },
    { eng: 'test', rus: 'тест' },
    { eng: 'Steel', rus: 'сталь' },
    { eng: 'Step', rus: 'шаг' },
    { eng: 'lesson', rus: 'урок' },
    { eng: 'bell', rus: 'колокол' },
    { eng: 'Line', rus: 'линия' },
    { eng: 'seat', rus: 'сиденье' },
    { eng: 'team', rus: 'команда' },
    { eng: 'meat', rus: 'мясо' },
    { eng: 'beef', rus: 'говядина' }
];


export const Nouns = () => {
    return (
        <NoteBlock>
            <NotesTitle>Nouns</NotesTitle>
            <Text>
                {nouns.map((nouns, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{nouns.eng}</S.EngWord>
                        <S.RusWord>{nouns.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



