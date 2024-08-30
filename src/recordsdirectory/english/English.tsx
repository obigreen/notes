import React from 'react';
import {TypeTitle} from "../RecordsDirectory_Style";
import {Questions} from "./englishwords/Questions";
import {Verbs} from "./englishwords/Verbs";
import {Nouns} from "./englishwords/Nouns";
import {Ajectives} from "./englishwords/Adjectives";
import {Pronouns} from "./englishwords/Pronouns";
import {Prepositions} from "./englishwords/Prepositions";
import {Conjunctions} from "./englishwords/Conjunctions";
import {Adverbs} from "./englishwords/Adverbs";
import {Phrases} from "./englishwords/Phrases";
import {TheoryEng} from "./TheoryEng";
import {DayAndTime} from "./englishwords/DayAndTime";
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
                {/*наречия*/}
                <Adverbs/>
                {/*дни недели, время*/}
                <DayAndTime/>
            </>
            {/*фразы*/}
            <Phrases/>
            {/*перевод языка программирования*/}
            <ProgrammingLanguageTranslate/>

            <TheoryEng/>
        </>
    );
};

