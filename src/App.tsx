import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import styled from "styled-components";
import { MrEye } from "./components/mreye/MrEye";
import { Methods } from "./recordsdirectory/methods/Methods";
import { Propertys } from "./recordsdirectory/propertys/Propertys";
import { Hooks } from "./recordsdirectory/hooks/Hooks";
import { NavBar } from "./components/navbar/NavBar";
import {Events} from "./recordsdirectory/events/Events";
import {Regex} from "./recordsdirectory/regex/Regex";
import {
    asyncItems,
    domItems,
    functionItems,
    JavaScript,
    moduleItems,
    objectItems,
    syntaxItems,
    webApiItems
} from "./recordsdirectory/javascript/JavaScript";
import {JavaScriptSectionPage} from "./recordsdirectory/javascript/JavaScriptSectionPage";
import {JavaScriptOperators} from "./recordsdirectory/javascript/JavaScriptOperators";
import {JavaScriptConditions} from "./recordsdirectory/javascript/JavaScriptConditions";
import {JavaScriptLoops} from "./recordsdirectory/javascript/JavaScriptLoops";
import {JavaScriptTypes} from "./recordsdirectory/javascript/JavaScriptTypes";
import {JavaScriptErrors} from "./recordsdirectory/javascript/JavaScriptErrors";
import {JavaScriptNestedData} from "./recordsdirectory/javascript/JavaScriptNestedData";

const App = () => {
    return (
        <>
            <Container>
                <MrEye />

                <TitleWrapper>
                    <MainTitle>Notes</MainTitle>
                </TitleWrapper>

                <NavBar />
                <Article>
                    <Routes>
                        <Route path={"/"} element={<Navigate to={"javascript"}/>}/>
                        <Route path={"javascript"} element={<JavaScript />} />
                        <Route
                            path={"js-syntax"}
                            element={
                                <JavaScriptSectionPage
                                    title={"Syntax (Синтаксис и типы)"}
                                    sectionTitle={"Core Syntax (Ключевые элементы)"}
                                    description={"Базовые конструкции языка: объявления, типы, сравнения, деструктуризация, шаблонные строки и truthy/falsy."}
                                    items={syntaxItems}
                                    topic={"syntax"}
                                />
                            }
                        />
                        <Route
                            path={"js-functions"}
                            element={
                                <JavaScriptSectionPage
                                    title={"Functions (Функции и this)"}
                                    sectionTitle={"Functions & Scope (Ключевые паттерны)"}
                                    description={"Функции, область видимости, контекст this, call/apply/bind, hoisting и замыкания."}
                                    items={functionItems}
                                    topic={"functions"}
                                />
                            }
                        />
                        <Route
                            path={"js-objects"}
                            element={
                                <JavaScriptSectionPage
                                    title={"Objects (Объекты и классы)"}
                                    sectionTitle={"Objects & Classes (Ключевые паттерны)"}
                                    description={"Работа с объектами, class/constructor, prototype, Map/Set и сериализация JSON."}
                                    items={objectItems}
                                    topic={"objects"}
                                />
                            }
                        />
                        <Route
                            path={"js-async"}
                            element={
                                <JavaScriptSectionPage
                                    title={"Async (Асинхронность)"}
                                    sectionTitle={"Async & Timers (Ключевые паттерны)"}
                                    description={"setTimeout/setInterval, Promise, async/await, Promise.all, try/catch/finally, microtasks."}
                                    items={asyncItems}
                                    topic={"async"}
                                />
                            }
                        />
                        <Route
                            path={"js-dom"}
                            element={
                                <JavaScriptSectionPage
                                    title={"DOM (DOM и UI API)"}
                                    sectionTitle={"DOM & UI (Ключевые паттерны)"}
                                    description={"Получение элементов, вставка, классы, атрибуты, события и контроль поведения браузера."}
                                    items={domItems}
                                    topic={"dom"}
                                />
                            }
                        />
                        <Route
                            path={"js-network"}
                            element={
                                <JavaScriptSectionPage
                                    title={"Network (Сеть и хранение)"}
                                    sectionTitle={"Network & Storage (Ключевые паттерны)"}
                                    description={"fetch, URLSearchParams, AbortController, FormData и хранение данных в браузере."}
                                    items={webApiItems}
                                    topic={"network"}
                                />
                            }
                        />
                        <Route
                            path={"js-modules"}
                            element={
                                <JavaScriptSectionPage
                                    title={"Modules (Модули и runtime)"}
                                    sectionTitle={"Modules & Runtime (Ключевые паттерны)"}
                                    description={"import/export, dynamic import, re-export, globalThis и structuredClone."}
                                    items={moduleItems}
                                    topic={"modules"}
                                />
                            }
                        />
                        <Route path={"js-operators"} element={<JavaScriptOperators />} />
                        <Route path={"js-conditions"} element={<JavaScriptConditions />} />
                        <Route path={"js-loops"} element={<JavaScriptLoops />} />
                        <Route path={"js-nested"} element={<JavaScriptNestedData />} />
                        <Route path={"js-types"} element={<JavaScriptTypes />} />
                        <Route path={"js-errors"} element={<JavaScriptErrors />} />
                        <Route path={"hooks"} element={<Hooks />} />
                        <Route path={"methods"} element={<Methods />} />
                        <Route path={"properties"} element={<Propertys />} />
                        <Route path={"events"} element={<Events />} />
                        <Route path={"regex"} element={<Regex />} />
                        <Route path={"*"} element={<Navigate to={"javascript"}/>}/>
                    </Routes>
                </Article>
            </Container>
        </>
    );
};

const Container = styled.div`
    max-width: 1140px;
    width: 100%;
    padding: 40px 15px;
    margin: 0 auto;
    background-color: #2a2d30;
    position: relative;
`

const TitleWrapper = styled.div`
    max-width: 900px;
    margin: 0 auto 100px auto;
`

const MainTitle = styled.h1`
    font-weight: 600;
    font-size: 32px;
    font-style: normal;
    color: white;
`

const Article = styled.article`
    max-width: 900px;
    width: 100%;
    margin: 0 auto 120px auto;

    & > :not(:last-of-type) {
        margin-bottom: 70px;
    }
`

export default App;
