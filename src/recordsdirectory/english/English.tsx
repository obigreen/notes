import React from 'react';
import {TypeTitle} from "../RecordsDirectory_Style";
import {Questions} from "./englishwords/Questions";
import {Verbs} from "./englishwords/Verbs";
import {Nouns} from "./englishwords/Nouns";
import {Ajectives} from "./englishwords/Adjectives";
import {Pronouns} from "./englishwords/Pronouns";
import {Prepositions} from "./englishwords/Prepositions";
import {Conjunctions} from "./englishwords/Conjunctions";
import {Interjections} from "./englishwords/Interjections";
import {Phrases} from "./englishwords/Phrases";
import {TheoryEng} from "./TheoryEng";
import {DayAndTime} from "./englishwords/DayAndTime";
import {UnlearnedWords} from "./englishwords/UnlearnedWords";
import {ProgrammingLanguageTranslate} from "./englishwords/ProgrammingLanguageTranslate";

export const English = () => {
    return (
        <>
            <TypeTitle>English</TypeTitle>

            {/*глаголы*/}
            <Verbs/>
            {/*существительные*/}
            <Nouns/>
            {/*прилагательные*/}
            <Ajectives/>


            {/*Времянка*/}
            <>
                <Questions/>
                {/*местоимения*/}
                <Pronouns/>
                {/*предлоги*/}
                <Prepositions/>
                {/*союзы*/}
                <Conjunctions/>
                {/*междометия*/}
                <Interjections/>
                {/*дни недели, время*/}
                <DayAndTime/>
            </>
            {/*фразы*/}
            <Phrases/>
            {/*надо выучить слова/фразы*/}
            <UnlearnedWords/>
            {/*перевод языка программирования*/}
            <ProgrammingLanguageTranslate/>

            <TheoryEng/>
        </>
    );
};

