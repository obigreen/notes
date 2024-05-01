import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from "../English_Styles";


const phrases = [
    { eng: 'Me too.', rus: 'Я тоже.' },
    { eng: 'much work', rus: 'много работы' },
    { eng: 'Day off', rus: 'выходной день' },
    { eng: 'Did you have a day off on Monday?', rus: 'У тебя был выходной в понедельник?' },
    { eng: 'I had a day off', rus: 'У меня был выходной' },
    { eng: 'What do you do today?', rus: 'Что ты делаешь сегодня?' },
    { eng: "What's your surname?", rus: 'Как ваша фамилия?' },
    { eng: "What's your phone number?", rus: 'Какой у вас номер телефона?' },
    { eng: 'What do you do?', rus: 'Чем вы занимаетесь?' },
    { eng: "What's your job?", rus: 'Какая у вас работа?' },
    { eng: 'how do you describe your sister?', rus: 'Как ты описываешь свою сестру?' },
    { eng: "that's all", rus: 'это всё' },
    { eng: 'What time do you have breakfast at 8 am.', rus: 'Во сколько ты завтракаешь в 8 утра.' },
    { eng: 'What time do you get dressed?', rus: 'Во сколько ты одеваешься?' },
    { eng: 'When do you start work?', rus: 'Когда ты начинаешь работать?' },
    { eng: 'When do you have a shower?', rus: 'Когда ты принимаешь душ?' },
    { eng: 'it is late', rus: 'уже поздно' },
    { eng: 'from ... to ...', rus: 'с ... до ... (обозначает некое пространство от-до, с-до и.т.д.)' },
    { eng: "It's half past eight.", rus: 'Сейчас половина девятого.' },
    { eng: "It's ten to three.", rus: 'Сейчас без десяти три.' },
    { eng: "It's ten to one.", rus: 'Сейчас без десяти один.' }
];

export const Phrases = () => {
    return (
        <NoteBlock>
            <NotesTitle>Phrases</NotesTitle>
            <Text>
                {phrases.map((phrases, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{phrases.eng}</S.EngWord>
                        <S.RusWord>{phrases.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};

