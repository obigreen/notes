import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'
import {useToggleArray} from "../hooks/useToggleArray";
import {useWord} from "../hooks/useWordTest";
import {FlexWrapper} from "../../../components/FlexWrapper";
import {Button} from "../button/Button";


const arrConjunctionsAndParticle = [
    { eng: 'so', rus: 'так' },
    { eng: 'but', rus: 'но' },
    { eng: 'and', rus: 'и' },
    { eng: 'or', rus: 'или' },
    { eng: 'because', rus: 'потому что' },
    { eng: 'well', rus: 'ну' },
];

export const ConjunctionsAndParticle = () => {
    const { array: conjunctionsAndParticle, toggleArray } = useToggleArray(arrConjunctionsAndParticle);
    const {
        isSingleWordMode, toggleMode, currentWord, inputValue,
        setInputValue, isCorrect, handleNextWord, handleCheckTranslation
    } = useWord(conjunctionsAndParticle);

    return (
        <NoteBlock>
            <NotesTitle>Conjunctions and Particle</NotesTitle>
            <Text>
                <FlexWrapper gap={'20px'} margin={'0 0 20px 0'}>
                    <Button onClick={toggleArray} iconId={'random'}/>
                    <Button onClick={toggleMode} iconId={isSingleWordMode ? "back" : "englishWord"} />
                </FlexWrapper>


                {isSingleWordMode ? (
                    <div>
                        <S.TextWrapper>
                            <S.EngWord>{currentWord.eng}</S.EngWord>
                            {isCorrect ? (
                                <S.RusWord>{currentWord.rus}</S.RusWord>
                            ) : (
                                <S.Input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Введите перевод"
                                />
                            )}
                        </S.TextWrapper>

                        {!isCorrect ? (
                            <Button onClick={handleCheckTranslation} title="Проверить" />
                        ) : (
                            <Button onClick={handleNextWord} title="Следующее слово" />
                        )}
                    </div>
                ) : (
                    conjunctionsAndParticle.map((word, index) => (
                        <S.TextWrapper key={index}>
                            <S.EngWord>{word.eng}</S.EngWord>
                            <S.RusWord>{word.rus}</S.RusWord>
                        </S.TextWrapper>
                    ))
                )}
            </Text>
        </NoteBlock>
    );
};



