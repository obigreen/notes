import React from 'react';
import {BookTitle, NoteBlock, Section, Text} from "../../RecordsDirectory_Style";
import {AiItem} from "./aiitem/AiItem";
import GPT from "../../../accets/img/logoAi/chatGPT.svg"
import {S} from '../MyList_Style'


const mainAi = [
    {
        image: GPT,
        title: "GPT4",
        link: "https://chatgpt.com/",
        description: "Основная языковая модель"
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



export const AiList = () => {
    return (
        <NoteBlock>
            <Text>
                <BookTitle>Ai list</BookTitle>
                <S.ListTitle>Main</S.ListTitle>
                <Section>
                    {mainAi.map((item, index) => (
                        <AiItem
                            key={index}
                            image={item.image}
                            title={item.title}
                            link={item.link}
                            description={item.description}
                        />
                    ))}
                </Section>
                <S.ListTitle>Main</S.ListTitle>
                <Section>
                    {aiData2.map((item, index) => (
                        <AiItem
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

