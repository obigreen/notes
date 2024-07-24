import React from "react";
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
// import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';


const App = () => {
    return (


        // <Router>
        //     <main>
        //         <Container>
        //             <MrEye/>
        //
        //             <TitleWrapper>
        //                 <MainTitle>Incubator notes</MainTitle>
        //             </TitleWrapper>
        //
        //             <Navigation>
        //                 <NavLink to="/jsforchildren">JS For Children</NavLink>
        //                 <NavLink to="/propertys">Propertys</NavLink>
        //                 <NavLink to="/methods">Methots</NavLink>
        //                 <NavLink to="/hooks">Hooks</NavLink>
        //                 <NavLink to="/english">English</NavLink>
        //                 <NavLink to="/botquestions">Bot Questions</NavLink>
        //                 <NavLink to="/interviewquestions">Interview Questions</NavLink>
        //                 <NavLink to="/mylist">My List</NavLink>
        //             </Navigation>
        //
        //             <Article>
        //                 <WrappUse/>
        //                 <Routes>
        //                     <Route path="/jsforchildren" element={<JsForChildren/>}/>
        //                     <Route path="/propertys" element={<Propertys />} />
        //                     <Route path="/methots" element={<Methods />} />
        //                     <Route path="/hooks" element={<Hooks />} />
        //                     <Route path="/hooks" element={<English />} />
        //                     <Route path="/bot-questions" element={<BotQuestions />} />
        //                     <Route path="/interview-questions" element={<InterviewQuestions />} />
        //                     <Route path="/my-list" element={<MyList />} />
        //                 </Routes>
        //             </Article>
        //
        //         </Container>
        //     </main>
        // </Router>


        <main>
            <Container>
                <MrEye/>

                <TitleWrapper>
                    <MainTitle>Incubator notes</MainTitle>
                </TitleWrapper>

                <Article>
                    <WrappUse/>


                    <JsForChildren/>

                    <Propertys/>
                    <Methods/>
                    <Hooks/>

                    <English/>

                    <BotQuestions/>
                    <InterviewQuestions/>

                    <MyList/>
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

// const Navigation = styled.nav`
//     display: flex;
//     justify-content: space-around;
//     margin-bottom: 30px;
// `
//
// const NavLink = styled(Link)`
//     color: white;
//     text-decoration: none;
//     font-size: 18px;
//
//     &:hover {
//         text-decoration: underline;
//     }
// `


export default App;
