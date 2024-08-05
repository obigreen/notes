import React from 'react';
import {BookTitle, NoteBlock, Section, Text} from "../../RecordsDirectory_Style";
import Karpaty from "../../../accets/img/lections/one.jpg"
import Next from "../../../accets/img/lections/next.jpg"
import Code from "../../../accets/img/lections/code.jpg"
import CodeAi from "../../../accets/img/lections/codeAi.jpg"
import Python from "../../../accets/img/lections/python.jpg"
import Node from "../../../accets/img/lections/nodejs.jpg"
import Js from "../../../accets/img/lections/js.jpg"
import {TasksItem} from "./tasksitem/TasksItem";
import {S} from '../MyList_Style'


const articles = [
    {
        image: '!',
        title: "Целая платформа для изучения frontend",
        link: "https://cssbattle.dev/",
        description: "CSSBattle — это онлайн-игра в Code Golfing. Здесь вы пытаетесь визуально повторить Цели за минимально возможное количество строчек CSS-кода и сразиться с игроками со всего мира, чтобы попасть на вершину таблицы лидеров"
    },
    {
        image: '!',
        title: "LLM с сайтом LLM Visualisation",
        link: "https://bbycroft.net/llm",
        description: "Чтобы хорошо что-то понять, нужно увидеть это на примере, а лучше на нескольких. И тут авторы этого сайта попали в яблочко. Здесь подробно, с формулами, слой за слоем, разобрано строение популярных LLM-архитектур, и все это с очень прикольной 3D визуализацией."
    },
];

const code = [
    {
        image: '',
        title: "Онлайн крестики-нолики на JavaScript и WebSocket",
        link: "https://github.com/YuraKoch/tic-tac-toe" + "https://www.youtube.com/watch?v=KyVMxsMp7UI&ab_channel=YuraKoch",
        description: "[!!!2 ССЫЛКИ!! 1 - гит, 2 - ролик на ютуб]Оставляем код и видео, в котором автор подробно рассказывает, как создать игру крестики-нолики на JavaScript с использованием технологии WebSocket."
    },
];


export const TasksList = () => {
    return (
        <NoteBlock>
            <Text>
                <BookTitle>Tasks list</BookTitle>
                <S.ListTitle>Статьи</S.ListTitle>
                <Section>
                    {articles.map((item, index) => (
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
                    {code.map((item, index) => (
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

