import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import styled from "styled-components";
import { MrEye } from "./components/mreye/MrEye";
import { Methods } from "./recordsdirectory/methods/Methods";
import { Propertys } from "./recordsdirectory/propertys/Propertys";
import { Hooks } from "./recordsdirectory/hooks/Hooks";
import { NavBar } from "./components/navbar/NavBar";
import {Events} from "./recordsdirectory/events/Events";

const App = () => {
    return (
        <Router>
            <Container>
                <MrEye />

                <TitleWrapper>
                    <MainTitle>Notes</MainTitle>
                </TitleWrapper>

                <NavBar />
                <Article>
                    <Routes>
                        <Route path="/hooks" element={<Hooks />} />
                        <Route path="/methods" element={<Methods />} />
                        <Route path="/propertys" element={<Propertys />} />
                        <Route path="/events" element={<Events />} />
                    </Routes>
                </Article>
            </Container>
        </Router>
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

