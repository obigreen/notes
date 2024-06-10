import React from 'react';
import {BookTitle, NoteBlock, Section, Text} from "../../RecordsDirectory_Style";
import {AiItem} from "./aiitem/AiItem";
import GPT from "../../../accets/img/logoAi/chatGPT.svg"
import Coze from "../../../accets/img/logoAi/coze.png"
import Copilot from "../../../accets/img/logoAi/copilot.svg"
import Modyfi from "../../../accets/img/logoAi/modyfi.svg"
import Suno from "../../../accets/img/logoAi/suno.png"
import StableAudio from "../../../accets/img/logoAi/stableAudio.png"
import {S} from '../MyList_Style'


const mainAi = [
    {
        image: GPT,
        title: "GPT4",
        link: "https://chatgpt.com/",
        description: "Основная языковая модель"
    },
    {
        image: Suno,
        title: "Suno",
        link: "https://suno.com/",
        description: "Создание музыки"
    },
    {
        image: Coze,
        title: "Coze",
        link: "https://www.coze.com/space/7359239578794557445/bot",
        description: "Бесплатный gpt4/turbo/128k"
    },
    {
        image: Copilot,
        title: "Copilot",
        link: "https://copilot.microsoft.com/",
        description: ""
    },
    {
        image: "",
        title: "",
        link: "",
        description: ""
    },

];

const editors = [
    {
        image: Modyfi,
        title: "modyfi",
        link: "https://app.modyfi.com/dashboard/projects/recent",
        description: "Некая версия простого фотошопа с возможностью генерации или объединения картинок с помощью ИИ"
    },
];

const music = [
    {
        image: StableAudio,
        title: "StableAudio",
        link: "https://stableaudio.com/",
        description: "Создание музыки, как то слабовато в сравнении с Suno, но надо тоже по юзать"
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
                <S.ListTitle>Editors</S.ListTitle>
                <Section>
                    {editors.map((item, index) => (
                        <AiItem
                            key={index}
                            image={item.image}
                            title={item.title}
                            link={item.link}
                            description={item.description}
                        />
                    ))}
                </Section>
                <S.ListTitle>Music</S.ListTitle>
                <Section>
                    {music.map((item, index) => (
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

