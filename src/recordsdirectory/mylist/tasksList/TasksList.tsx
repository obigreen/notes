import React from 'react';
import {BookTitle, NoteBlock, Section, Text} from "../../RecordsDirectory_Style";
import GPT from "../../../accets/img/logoAi/chatGPT.svg"
import {TasksItem} from "./aiitem/TasksItem";
import {S} from '../MyList_Style'

const mainAi = [
    {
        image: GPT,
        title: "Как оформить свой профиль на Github, чтобы работодатель тебя заметил?",
        link: "https://chatgpt.com/",
        description: "Хей! А ты знал, что 68% работодателей отбирают себе junior разработчиков основываясь на их портфолио на Github? Следовательно если ты никогда не занимался оформлением своего Github портфолио и профиля – тебе вероятнее всего пришлют отказ. Это работает именно у начинающих разработчиков. И что делать в таком случае? – На самом деле страшного ничего нет, нужно просто уделить время и оформить его по чек листу, который подготовил Макс из codereview со своей командой."
    },
    {
        image: "image_placeholder2.png",
        title: "Название 2",
        link: "#",
        description: "Описание 2"
    },
];

const aiData2 = [
    {
        image: '',
        title: "Назваqweqweqние 1",
        link: "#",
        description: "Описание 1"
    },
];


export const TasksList = () => {
    return (
        <NoteBlock>
            <Text>
                <BookTitle>Tasks list</BookTitle>
                <S.ListTitle>Статьи</S.ListTitle>
                <Section>
                    {mainAi.map((item, index) => (
                        <TasksItem
                            key={index}
                            image={item.image}
                            title={item.title}
                            link={item.link}
                            description={item.description}
                        />
                    ))}
                </Section>
                <S.ListTitle>Код</S.ListTitle>
                <Section>
                    {aiData2.map((item, index) => (
                        <TasksItem
                            key={index}
                            image={item.image}
                            title={item.title}
                            link={item.link}
                            description={item.description}
                        />
                    ))}
                </Section>

            </Text>
        </NoteBlock>
    );
};

