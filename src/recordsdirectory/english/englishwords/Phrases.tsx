import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from "../English_Styles";


const phrases = [
    { eng: 'Me too.', rus: 'Я тоже.' },
    { eng: 'Much work', rus: 'много работы' },
    { eng: 'Day off', rus: 'выходной день' },
    { eng: 'Did you have a day off on Monday?', rus: 'У тебя был выходной в понедельник?' },
    { eng: 'I had a day off', rus: 'У меня был выходной' },
    { eng: 'What do you do today?', rus: 'Что ты делаешь сегодня?' },
    { eng: "What's your surname?", rus: 'Как ваша фамилия?' },
    { eng: "What's your phone number?", rus: 'Какой у вас номер телефона?' },
    { eng: 'What do you do?', rus: 'Чем вы занимаетесь?' },
    { eng: "What's your job?", rus: 'Какая у вас работа?' },
    { eng: 'How do you describe your sister?', rus: 'Как ты описываешь свою сестру?' },
    { eng: "That's all", rus: 'Это всё' },
    { eng: 'What time do you have breakfast?', rus: 'Во сколько ты завтракаешь?' },
    { eng: 'What time do you get dressed?', rus: 'Во сколько ты одеваешься?' },
    { eng: 'I have breakfast at 8 am.', rus: 'Я завтракаю в 8 утра.' },
    { eng: 'When do you start work?', rus: 'Когда ты начинаешь работать?' },
    { eng: 'When do you have a shower?', rus: 'Когда ты принимаешь душ?' },
    { eng: 'It is late', rus: 'Уже поздно' },
    { eng: "It's half past eight.", rus: 'Сейчас половина девятого.' },
    { eng: "It's ten to three.", rus: 'Сейчас без десяти три.' },
    { eng: "It's ten to one.", rus: 'Сейчас без десяти один.' },
    { eng: "What do you do on holidays?", rus: "Что ты делаешь в праздники?" },
    { eng: "I like working out", rus: "Мне нравится заниматься спортом" },
    { eng: "A little bit", rus: "Немного" },
    { eng: "He doesn't have a bath", rus: "У него нет ванны" },
    { eng: "I hear you", rus: "Я тебя слышу" },
    { eng: "As extra", rus: "Как дополнение" },
    { eng: "In addition", rus: "В добавок, кроме того" },
    { eng: "It is the same here", rus: "Здесь то же самое" },
    { eng: "How many degrees?", rus: "Сколько градусов?" },
    { eng: "At the same time as me", rus: "В то же время что и я" },
    { eng: "When I have time", rus: "Когда у меня будет время" },
    { eng: "Go for a walk?", rus: "Пойти на прогулку?" },
    { eng: "I almost never drive to Moscow", rus: "Я почти никогда не езжу в Москву на машине" },
    { eng: "When do you surf the internet?", rus: "Когда ты сидишь в интернете?" },
    { eng: "What programming language do you study?", rus: "Какой язык программирования ты изучаешь?" },
    { eng: "What's his breed?", rus: "Какая его порода?" },
    { eng: "Two times a day", rus: "Два раза в день" },
    { eng: "Near you?", rus: "Рядом с тобой?" },
    { eng: "I was born in 95", rus: "Я родился в 95" },
    { eng: "Is on the 27th of May", rus: "Приходится на 27 мая" },
    { eng: "How old am I?", rus: "Сколько мне лет?" },
    { eng: "I think you are ...", rus: "Я думаю, ты ..." },
    { eng: "What will you do today?", rus: "Что будешь делать сегодня?" },
    { eng: "I will play", rus: "Я буду играть" },
    { eng: "What else will you do today?", rus: "Что еще ты будешь делать сегодня?" },
    { eng: "Maybe something else", rus: "Может что-то другое" },
    { eng: "Wife's education is a nurse", rus: "Образование жены — медсестра" },
    { eng: "That's why", rus: "Вот почему" },
    { eng: "I didn't decide yet", rus: "Я еще не решил" },
    { eng: "What genre do you like?", rus: "Какой жанр ты любишь?" },
    { eng: "I listened to", rus: "Я слушал" },
    { eng: "The same story", rus: "Та же история" },
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

