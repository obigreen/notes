import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const adjectives = [
    { eng: 'old', rus: 'старый' },
    { eng: 'busy', rus: 'занятый' },
    { eng: 'easy', rus: 'легкий' },
    { eng: 'empty', rus: 'пустой' },
    { eng: 'foreign', rus: 'иностранный' },
    { eng: 'little', rus: 'маленький (уменьшительно)' },
    { eng: 'small', rus: 'маленький' },
    { eng: 'sunny', rus: 'солнечный' },
    { eng: 'smart', rus: 'умный (общее понятие)' },
    { eng: 'clever', rus: 'умный (сообразительный, остроумный, находчивый)' },
    { eng: 'soft', rus: 'мягкий' },
    { eng: 'hungry', rus: 'голодный' },
    { eng: 'windy', rus: 'ветреный' },
    { eng: 'snowy', rus: 'снежный' },
    { eng: 'rainy', rus: 'дождливый' },
    { eng: 'extra', rus: 'дополнительный' },
    { eng: 'lazy', rus: 'ленивый' },
    { eng: 'careful', rus: 'внимательный' },
    { eng: 'helpful', rus: 'полезный' },
    { eng: 'hard-working', rus: 'трудолюбивый' },
    { eng: 'creative', rus: 'творческий' },
    { eng: 'kind', rus: 'добрый' },
    { eng: 'beautiful', rus: 'красивая' },
    { eng: 'tense', rus: 'напряженный' },
    { eng: 'powerful', rus: 'мощный' },
    { eng: 'intelligent', rus: 'умный (самый умный)' },
    { eng: 'tall', rus: 'высокий' },
    { eng: 'cheap', rus: 'дешевый' },
    { eng: 'silly', rus: 'глупенький' },
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



