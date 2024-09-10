import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import {TypeTitle} from "../RecordsDirectory_Style";
import {Questions} from "./englishwords/Questions";
import {Verbs} from "./englishwords/Verbs";
import {Nouns} from "./englishwords/Nouns";
import {Ajectives} from "./englishwords/Adjectives";
import {Pronouns} from "./englishwords/Pronouns";
import {Prepositions} from "./englishwords/Prepositions";
import {ConjunctionsAndParticle} from "./englishwords/ConjunctionsAndParticle";
import {Adverbs} from "./englishwords/Adverbs";
import {Phrases} from "./englishwords/Phrases";
import {TheoryEng} from "./TheoryEng";
import {DayAndTime} from "./englishwords/DayAndTime";
import {ProgrammingLanguageTranslate} from "./englishwords/ProgrammingLanguageTranslate";
import {NavBar} from "./menu/NavBar";


export const English = () => {
    return (
        <Router>
            <TypeTitle>English</TypeTitle>
            <NavBar/>
            <Routes>
                <Route path="/verbs" element={<Verbs/>}/>
                <Route path="/nouns" element={<Nouns/>}/>
                <Route path="/adjectives" element={<Ajectives/>}/>
                <Route path="/questions" element={<Questions/>}/>
                <Route path="/pronouns" element={<Pronouns/>}/>
                <Route path="/prepositions" element={<Prepositions/>}/>
                <Route path="/conjunctions" element={<ConjunctionsAndParticle/>}/>
                <Route path="/adverbs" element={<Adverbs/>}/>
                <Route path="/phrases" element={<Phrases/>}/>
                <Route path="/day-and-time" element={<DayAndTime/>}/>
                <Route path="/programming-translate" element={<ProgrammingLanguageTranslate/>}/>
                <Route path="/theory-eng" element={<TheoryEng/>}/>
            </Routes>
        </Router>
    );
};

