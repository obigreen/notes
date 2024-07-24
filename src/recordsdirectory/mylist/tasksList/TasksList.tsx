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
        image: '',
        title: "Советы по чистому коду",
        link: "https://nuancesprog.ru/p/21121/",
        description: "В данной статье автор собрал 18 советов по созданию чистого и эффективного кода JavaScript. А в комментариях под этим постом ты можешь поделиться своими советами!"
    },
    {
        image: Code,
        title: "Полезные фичи Chrome DevTools",
        link: "https://habr.com/ru/articles/791554/",
        description: "В данной статье автор делится интересными находками ChromeDevTools, которые ты мог не знать. А в комментариях под этим постом ты можешь поделиться своими фичами!"
    },
    {
        image: '',
        title: "Плейлист по React",
        link: "https://www.youtube.com/watch?v=2vujABNBFAY&list=PLNkWIWHIRwME_Gv2vlWAR6TfeSXylYfw4&ab_channel=webDev",
        description: "Тот самый канал на котором плейлист по Node"
    },
    {
        image: '',
        title: "Плейлист по TypeScript",
        link: "https://www.youtube.com/watch?v=MtO76yEYbxA&list=PLNkWIWHIRwMEm1FgiLjHqSky27x5rXvQa&ab_channel=webDev",
        description: "Тот самый канал на котором плейлист по Node"
    },
    {
        image: '',
        title: "КАКОЙ ТО ВИДОС ОТ СОКУРСТНИКОВ",
        link: "https://www.youtube.com/watch?v=gHb2bAwuwHM&t=7s&ab_channel=IT-KAMASUTRA",
        description: "из группы с однокурсниками"
    },
    {
        image: '',
        title: "Как разобраться в Git: краткая инструкция для джунов",
        link: "https://proglib.io/p/kak-razobratsya-v-git-kratkaya-instrukciya-dlya-dzhunov-2023-12-19",
        description: "Делимся полезной статьей, из которой вы узнаете, как Git хранит данные, отслеживает изменения и позволяет разработчикам управлять историей коммитов."
    },
    {
        image: '',
        title: "Руководство по Git для новичков",
        link: "https://nuancesprog.ru/p/21021/",
        description: "Делимся с вами руководством, которое поможет освоить логику сервиса. Вы узнаете, что такое ветви, коммиты, познакомитесь с базовыми командами и научитесь разрешать конфликты в Git."
    },
    {
        image: '',
        title: "Redux + Redux Toolkit Продвинутый полный курс | Часть 1",
        link: "https://www.youtube.com/watch?v=YROz0WYExww&ab_channel=%D0%95%D0%B2%D0%B3%D0%B5%D0%BD%D0%B8%D0%B9%D0%9F%D0%B0%D1%80%D0%BE%D0%BC%D0%BE%D0%B2%7CFront-end",
        description: "Этот скинули в группе инкубатора"
    },
    {
        image: '',
        title: "Топ-10 заданий для собеседования по React.js в 2024",
        link: "https://nuancesprog.ru/p/21123/",
        description: "Делимся ниже статьей, в которой вы найдете задания по написанию кода и примеры их выполнения для успешного прохождения собеседования по ReactJS."
    },
    {
        image: '!!!',
        title: "Целая платформа для изучения frontend",
        link: "https://cssbattle.dev/",
        description: "CSSBattle — это онлайн-игра в Code Golfing. Здесь вы пытаетесь визуально повторить Цели за минимально возможное количество строчек CSS-кода и сразиться с игроками со всего мира, чтобы попасть на вершину таблицы лидеров"
    },
    {
        image: '',
        title: "React",
        link: "https://habr.com/ru/articles/792988/" + "https://github.com/magicuidesign/magicui?tab=readme-ov-file" + "",
        description: "1. Лучшие бесплатные курсы React 2024, 2. Список бесплатных  анимированных компонентов для React, Tailwind и Framer."
    },
    {
        image: '',
        title: "Полезные расширения VS Code",
        link: "https://thecode.media/vs-code-ext-front-back-test/",
        description: "Хотим поделиться статьей, в которой собраны расширения для популярного редактора кода VS Code для фронтендеров, бэкендеров и тестировщиков."
    },
    {
        image: '',
        title: "Программируем как профи (без ссылки, попробовать просто по описанию)",
        link: "",
        description: "нашли для вас 5 бесплатных нейронок, которые можно встроить прямо в VSCode. Для этого нам необходимо создать аккаунт Nvidia AI и получить API-ключ любой модели. Затем устанавливаем расширение CodeGPT в VSCode и выбираем в нём провайдера Nvidia. Вставляем туда наш API-ключ и получаем доступ сразу к нескольким нейронкам, которые помогут в написании кода."
    },
    {
        image: '',
        title: "11 сайтов, экономящих время, которые нужны каждому разработчику",
        link: "https://tproger.ru/articles/sobral-11-sajtov--ekonomyashhih-vremya--kotorye-nuzhny-kazhdomu-razrabotchiku",
        description: "11 сайтов, экономящих время, которые нужны каждому разработчику. Оставляем ниже статью, где автор делится 11 полезными сайтами, которые помогают разработчикам сэкономить время на рутинные задачи."
    },
    //======
    {
        image: Karpaty,
        title: "Андрей Карпаты выложил 4-часовое видео о том, как воспроизвести GPT-2 с нуля на Python",
        link: "https://www.youtube.com/watch?v=l8pRSuU81PU&ab_channel=AndrejKarpathy",
        description: "4 часа??? Да, видео начинается с пустого файла, и вы своими глазами видите, как из него рождается LLM, при этом Андрей подробно объясняет каждый шаг (вот у кого точно выходные прошли продуктивно)."
    },
    {
        image: CodeAi,
        title: "Небольшой курс по GPT on python",
        link: "https://www.youtube.com/watch?v=4wNYHB9frlg&list=PL0lO_mIqDDFVack0enw-KzZWUl7VfjqqO&ab_channel=%D0%93%D0%BE%D1%88%D0%B0%D0%94%D1%83%D0%B4%D0%B0%D1%80%D1%8C",
        description: "Плейлист на youtube"
    },
    {
        image: Python,
        title: "Обзор Open Source LLM",
        link: "https://habr.com/ru/articles/818183/",
        description: "В данной статье автор рассказывает про новые Open Source LLM. Статья будет полезна тем, у кого мало опыта в работе с локальными большими языковыми моделями."
    },
    {
        image: Code,
        title: "ChatGPT: Создание клиента",
        link: "https://habr.com/ru/articles/815767/",
        description: "Благодаря данной статье ты научишься создавать и развертывать клиент ChatGPT с помощью Wing и Next.js. Это приложение может запускаться локально или развертываться у твоего облачного провайдера."
    },
    {
        image: '!!!!!!!!',
        title: "Щупаем LLM с сайтом LLM Visualisation",
        link: "https://bbycroft.net/llm",
        description: "Чтобы хорошо что-то понять, нужно увидеть это на примере, а лучше на нескольких. И тут авторы этого сайта попали в яблочко. Здесь подробно, с формулами, слой за слоем, разобрано строение популярных LLM-архитектур, и все это с очень прикольной 3D визуализацией."
    },




    {
        image: Next,
        title: "Next.js",
        link: "https://www.youtube.com/watch?v=cAvIwaucvQM&list=PL0lO_mIqDDFXAbfgj6lcK8cRu6yFdQgnR&ab_channel=%D0%93%D0%BE%D1%88%D0%B0%D0%94%D1%83%D0%B4%D0%B0%D1%80%D1%8C",
        description: "Небольшой курс"
    },
    {
        image: "",
        title: "Курс по работе с промптами для Claude",
        link: "https://docs.google.com/spreadsheets/d/19jzLgRruG9kjUQNKtCg1ZjdD6l6weA6qRXG5zLIAhC8/edit#gid=869808629",
        description: "Курс включает девять уроков, охватывающих структуру промптов, назначение ролей для ИИ, работу с переменными и методы борьбы с галлюцинациями нейросетей. В программе есть практические задания: если задача решена правильно, ячейка таблицы станет зеленой."
    },
    {
        image: '',
        title: "Распознание объектов с faster-coco-eval",
        link: "https://www.youtube.com/watch?v=5bVG2thY2tA&ab_channel=Uproger",
        description: "Делимся ниже видео, в котором автор рассказывает о библиотеке компьютерного зрения faster-coco-eval."
    },
    {
        image: '',
        title: "MongoDB для Python - NoSQL база данных",
        link: "https://www.youtube.com/watch?v=THXT_SGo6xs&ab_channel=Uproger",
        description: "Делимся ниже видео, в котором рассказывают о нереляционной базе данных MongoDB и о том, как с ней работать с помощью библиотеки PyMongo."
    },
    {
        image: '',
        title: "40 незаменимых API",
        link: "https://proglib.io/p/40-nezamenimyh-api-dlya-razrabotchikov-2024-05-14",
        description: "Делимся ниже статьей, где вы найдете 40 API, которые помогут сэкономить время и добавить новые функции в ваши проекты."
    },
    {
        image: Code,
        title: "Vue-приложение для прогноза погоды",
        link: "https://habr.com/ru/companies/selectel/articles/811027/",
        description: "!!СТАТЬЯ НА ДОРАБОТКЕ ИЛИ ВООБЩЕ УДАЛЕНА!! Благодаря данной статье ты узнаешь, как сделать простое приложение погоды без дизайн-макета. Ты поработаешь с HTML, CSS, JavaScript, Vue, Vite, а также развернешь проект на облачном сервере."

    },
    {
        image: '',
        title: "Как обойти ИИ-детектор Copyleaks",
        link: "https://vc.ru/life/1210800-kak-oboiti-obnaruzhenie-ii-kontenta-detektorom-copyleaks-polnoe-rukovodstvo",
        description: "Привет, друзья! Многие из вас пользуются ИИ-инструментами для быстрого создания контента. Однако продвинутые ИИ-детекторы, такие как Copyleaks, стали серьезной проблемой для тех, кто использует ИИ. Пользователи ищут способы опубликовать или отправить на проверку сгенерированный контент, чтобы ИИ-детектор не обнаружил, что контент написан не человеком."
    },
    {
        image: Code,
        title: "Inline Caches",
        link: "https://habr.com/ru/articles/810543/",
        description: "Inline Caches (IC) - это механизм оптимизации виртуальной машины JavaScript, который используется для ускорения доступа к свойствам объектов. Когда JavaScript-код выполняется, виртуальная машина создает специальные структуры данных, называемые inline caches, для хранения информации о свойствах объектов. Делимся статьей, где автор рассказывает про Inline Caches."
    },
    {
        image: Code,
        title: "Основы Event Loop",
        link: "https://habr.com/ru/companies/otus/articles/801249/",
        description: "Event Loop — это механизм, который позволяет JavaScript выполнять асинхронный код. Он контролирует порядок выполнения кода, обрабатывая события, колбэки и задачи. Делимся статьей, где автор рассказывает про основы Event Loop."
    },
    {
        image: Code,
        title: "Структура объекта в движках",
        link: "https://habr.com/ru/articles/804421/",
        description: "В данной статье автор рассказывает, как объекты хранятся в памяти и обрабатываются JS-движками. Ты узнаешь, могут ли действия разработчика оказать влияние на производительность и потребление памяти."
    },
    {
        image: Js,
        title: "Use strict mode в JavaScript",
        link: "https://thecode.media/use-strict-mode/",
        description: "Оставляем ниже полезную статью, из которой вы узнаете, что такое строгий режим use strict mode в JavaScript и зачем он нужен."
    },
    {
        image: Node,
        title: "Ютуб курс по Node.js",
        link: "https://www.youtube.com/watch?v=xJvAfWinaow&list=PLNkWIWHIRwMFtsaJ4b_wwkJDHKJeuAkP0&ab_channel=webDev",
        description: "НА ЭТОМ КАНАЛЕ ЕСТЬ ЕЩЕ ОТЛИЧНЫЕ ПЛЕЙЛИСТЫ И ПО РЕАКТ И ПО NEXT"
    },
    {
        image: '',
        title: "Распознавание лиц в базе данных",
        link: "https://habr.com/ru/articles/810509/",
        description: "Оставляем статью, где автор коротко объясняет принцип распознавания, хранения и поиска лиц в базе данных. В качестве примера используется библиотека Insightface и база данных PostgreSQL."
    },
];

const code = [
    {
        image: '',
        title: "Таймер",
        link: "https://codepen.io/borntofrappe/pen/dwVZRQ",
        description: "Делимся готовым кодом для создания таймера на HTML, CSS и JavaScript."
    },
    {
        image: '',
        title: "To Do List",
        link: "https://codepen.io/lockingdong/pen/qNeyVL",
        description: "Вы можете создать To Do List на HTML, CSS и JavaScript с помощью готового кода ниже."
    },
    {
        image: '',
        title: "Игра Змейка на JavaScript",
        link: "https://codepen.io/HunorMarton/pen/dyXjaza",
        description: "Вы можете создать популярную игру змейка на HTML, CSS и JavaScript с помощью готового кода ниже."
    },
    {
        image: '',
        title: "Карусель на JavaScript",
        link: "https://codepen.io/dui77/pen/dyEMZxK",
        description: "Хотим поделиться ниже кодом для создания карусели с эффектом при наведении."
    },
    {
        image: '',
        title: "Калькулятор в телефоне на JavaScript",
        link: "https://codepen.io/krautgti/pen/mdXaLWr",
        description: "Оставляем для вас ниже готовый код телефонного калькулятора с числом Пи и отрицательными числами."
    },
    {
        image: '',
        title: "Пузырчатая плёнка на JavaScript",
        link: "https://codepen.io/brumgb/pen/QWPzmJM",
        description: "Оставляем для вас ниже интересный код для создания пузырчатой пленки со звуком при нажатии на JavaScript."
    },
    {
        image: '',
        title: "Игра Камень, ножницы, бумага",
        link: "https://codepen.io/imvpn22/pen/XQBPmJ",
        description: "Оставляем для вас код популярной игры Камень, ножницы, бумага, в которой можно выбирать количество раундов."
    },
    {
        image: '',
        title: "Генератор градиента",
        link: "https://codepen.io/ClementRoche/pen/papMew",
        description: "Делимся ниже кодом для создания генератора фонового градиента из двух и более цветов на HTML, CSS и JavaScript."
    },
    {
        image: '',
        title: "Игра змейка",
        link: "https://codepen.io/thisisbetkowski/pen/QoPQBy",
        description: "Оставляем готовый код для создания популярной игры змейка на HTML, CSS и JavaScript."
    },
    {
        image: '',
        title: "Калькулятор",
        link: "https://codepen.io/kassandrasanch/pen/oNJNGbg",
        description: "Оставляем ниже готовый код для создания калькулятора на HTML, CSS и JavaScript."
    },
    {
        image: '',
        title: "Игральные кубики",
        link: "",
        description: "Оставляем для вас код для создания игральных кубиков на HTML, CSS и JavaScript."
    },
    {
        image: '',
        title: "Игральные кубики",
        link: "https://codepen.io/ksenia-k/pen/VwOaQWv",
        description: "Оставляем для вас код для создания игральных кубиков на HTML, CSS и JavaScript."
    },
    {
        image: '',
        title: "Многофункциональные часы",
        link: "https://codepen.io/amirrezajef/pen/NEoJKd",
        description: "Делимся ниже готовым кодом для создания часов с функциями таймера и секундомера."
    },
    {
        image: '',
        title: "Создание LEGO фигурки",
        link: "https://codepen.io/joshbader/pen/MZMzjr",
        description: "Забирайте необычный готовый код ниже, чтобы создавать LEGO фигурки на HTML, CSS и JavaScript."
    },
    {
        image: '',
        title: "Цифровые часы",
        link: "https://codepen.io/Metty/pen/poYwNjv",
        description: "Хотим поделиться готовым кодом для создания анимированных цифровых часов."
    },
    {
        image: '',
        title: "Уведомления",
        link: "https://codepen.io/josetxu/pen/OJGXdzY",
        description: "Делимся готовым кодом различных вариантов всплывающих уведомлений на HTML и CSS."
    },
    {
        image: '',
        title: "3D карусель",
        link: "",
        description: "Хотим поделиться кодом вращающейся 3D карусели с изображениями на HTML, CSS и JavaScript."
    },
    {
        image: '',
        title: "3D карусель",
        link: "https://codepen.io/raulperez0481/pen/yLWLePm",
        description: "Хотим поделиться кодом вращающейся 3D карусели с изображениями на HTML, CSS и JavaScript."
    },
    {
        image: '',
        title: "Секундомер",
        link: "https://codepen.io/omid_kh/pen/eYMxJaB",
        description: "Делимся с вами кодом, который поможет создать секундомер на HTML, CSS и JavaScript.\n"
    },
    {
        image: '',
        title: "Онлайн крестики-нолики на JavaScript и WebSocket",
        link: "https://github.com/YuraKoch/tic-tac-toe" + "https://www.youtube.com/watch?v=KyVMxsMp7UI&ab_channel=YuraKoch",
        description: "[!!!2 ССЫЛКИ!! 1 - гит, 2 - ролик на ютуб]Оставляем код и видео, в котором автор подробно рассказывает, как создать игру крестики-нолики на JavaScript с использованием технологии WebSocket."
    },
    {
        image: '',
        title: "Стеклянные кнопки",
        link: "https://codepen.io/ghaste/pen/RwOEMwO",
        description: "Делимся с вами готовым кодом необычного варианта оформления кнопок на HTML и CSS."
    },
    {
        image: '',
        title: "Музыкальный плеер на JavaScript",
        link: "https://codepen.io/ecemgo/pen/vYPadZz",
        description: "Оставляем ниже готовый код для создания музыкального плеера со слайдером на JavaScript."
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

