import React from "react";
import Modal from 'react-modal';
import './App.css';
import styled from "styled-components";
import {MrEye} from "./components/mreye/MrEye";
import {English} from "./recordsdirectory/english/English";
import {WrappUse} from "./components/use/WrappUse";
import {JsForChildren} from "./recordsdirectory/jsforchildren_book/JSForChildren";
import {Methods} from "./recordsdirectory/methods/Methods";
import {Propertys} from "./recordsdirectory/propertys/Propertys";
import {Hooks} from "./recordsdirectory/hooks/Hooks";
import {BotQuestions} from "./recordsdirectory/bot_And_InterviewQuestions/BotQuestions";
import {InterviewQuestions} from "./recordsdirectory/bot_And_InterviewQuestions/InterviewQuestions";
import {MyList} from "./recordsdirectory/mylist/MyList";


const App = () => {
    return (
        <main>
            <Container>
                <MrEye/>

                <TitleWrapper>
                    <MainTitle>Incubator notes</MainTitle>
                </TitleWrapper>

                <Article>
                    <WrappUse/>


                    {/*<JsForChildren/>*/}


                    <English/>
                    <Methods/>
                    <Hooks/>
                    <Propertys/>
                    {/*<BotQuestions/>*/}
                    {/*<InterviewQuestions/>*/}

                    {/*<MyList/>*/}
                </Article>

            </Container>
        </main>
    );
};

const Container = styled.div`
    max-width: 1140px;
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
