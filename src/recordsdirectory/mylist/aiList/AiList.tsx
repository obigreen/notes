import React from 'react';
import {BookTitle, NoteBlock, Section, Text} from "../../RecordsDirectory_Style";
import {AiItem} from "./aiitem/AiItem";
import GPT from "../../../accets/img/logoAi/chatGPT.svg"
import Coze from "../../../accets/img/logoAi/coze.png"
import Copilot from "../../../accets/img/logoAi/copilot.svg"
import Modyfi from "../../../accets/img/logoAi/modyfi.svg"
import Suno from "../../../accets/img/logoAi/suno.png"
import StableAudio from "../../../accets/img/logoAi/stableAudio.png"
import renderNet from "../../../accets/img/logoAi/renderNet.png"
import logoDiffusion from "../../../accets/img/logoAi/logoDiffusion.png"
import huggingface from "../../../accets/img/logoAi/huggingface.svg"
import bypassGPT from "../../../accets/img/logoAi/bypassGPT.jpg"
import xpassportphoto from "../../../accets/img/logoAi/xpassportphoto.png"
import goEnhance from "../../../accets/img/logoAi/goEnhance.png"
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
    {
        image: huggingface,
        title: "PASD Magnify",
        link: "https://huggingface.co/spaces/fffiloni/PASD",
        description: "Улучшение качества фотографии"
    },
];

const music = [
    {
        image: StableAudio,
        title: "StableAudio",
        link: "https://stableaudio.com/",
        description: "Создание музыки, как то слабовато в сравнении с Suno, но надо тоже по юзать"
    },
    {
        image: Suno,
        title: "Suno",
        link: "https://suno.com/",
        description: "Создание музыки"
    },
];

const video = [
    {
        image: goEnhance,
        title: "GoEnhance",
        link: "https://app.goenhance.ai/vid2vid",
        description: "Enhance AI Vid2Vid — это онлайн-инструмент, который преобразует обычные видео в высококачественные клипы с помощью искусственного интеллекта. Платформа использует передовые алгоритмы для улучшения видео, улучшая разрешение, четкость и общее качество. Пользователи могут загружать свои видео, и AI автоматически обрабатывает их, делая картинку более резкой и детализированной. Это идеальное решение для тех, кто хочет повысить качество своих видеоматериалов без сложных технических настроек. Начните улучшать свои видео на Enhance AI Vid2Vid."
    },
];

const createImg = [
    {
        image: renderNet,
        title: "RenderNet AI",
        link: "https://rendernet.ai/",
        description: "RenderNet AI — это платформа для создания высококачественных изображений с помощью искусственного интеллекта. Она позволяет генерировать постоянные персонажи и контролировать позы и композицию благодаря функциям FaceLock и ControlNet. Платформа поддерживает более 100 моделей для разнообразных визуальных эффектов, включая Stable Diffusion. Используется для визуального сторителлинга, маркетинга и создания цифровых аватаров."
    },
    {
        image: logoDiffusion,
        title: "Logo Diffusion",
        link: "https://logodiffusion.com/",
        description: "Logo Diffusion — это платформа для создания уникальных логотипов с помощью искусственного интеллекта. Она использует продвинутые алгоритмы, такие как диффузионные модели, для автоматического генерирования логотипов. Платформа позволяет пользователям задавать параметры, такие как стиль и цветовая палитра, чтобы создать логотип, который идеально подходит для их бренда. Logo Diffusion обеспечивает высокое качество дизайна и разнообразие, что делает его идеальным для стартапов и малых бизнесов. Начните создавать свои уникальные логотипы на сайте Logo Diffusion."
    },
    {
        image: xpassportphoto,
        title: "xPassportPhoto",
        link: "https://xpassportphoto.com/",
        description: "xPassportPhoto — это онлайн-сервис для создания фотографий на паспорт и другие документы с помощью искусственного интеллекта. Платформа предлагает простой и быстрый способ получения фотографий, соответствующих стандартам и требованиям разных стран. Пользователи могут загружать свои фотографии, и AI автоматически обрезает и оптимизирует их под нужный формат. xPassportPhoto позволяет создавать фотографии для паспортов, виз и других документов, обеспечивая высокое качество и точность. Узнайте больше и начните пользоваться сервисом на официальном сайте xPassportPhoto."
    },
];

const tools = [
    {
        image: bypassGPT,
        title: "BypassGPT",
        link: "https://bypassgpt.ai/",
        description: "BypassGPT — это платформа для преобразования текста, созданного искусственным интеллектом, так, чтобы он выглядел как написанный человеком. Используя передовые алгоритмы, BypassGPT изменяет AI-текст, делая его неразличимым для детекторов AI, таких как GPTZero и Originality.ai. Платформа поддерживает более 50 языков и предлагает интуитивно понятный интерфейс, где пользователи могут вставить свой текст и получить результат одним нажатием кнопки. Это делает BypassGPT идеальным инструментом для студентов, создателей контента и маркетологов, стремящихся избежать обнаружения AI-контента и улучшить его восприятие. Узнайте больше и начните использовать BypassGPT на официальном сайте."
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
                <S.ListTitle>Video</S.ListTitle>
                <Section>
                    {video.map((item, index) => (
                        <AiItem
                            key={index}
                            image={item.image}
                            title={item.title}
                            link={item.link}
                            description={item.description}
                        />
                    ))}
                </Section>
                <S.ListTitle>Create Img</S.ListTitle>
                <Section>
                    {createImg.map((item, index) => (
                        <AiItem
                            key={index}
                            image={item.image}
                            title={item.title}
                            link={item.link}
                            description={item.description}
                        />
                    ))}
                </Section>
                <S.ListTitle>Tools</S.ListTitle>
                <Section>
                    {tools.map((item, index) => (
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

