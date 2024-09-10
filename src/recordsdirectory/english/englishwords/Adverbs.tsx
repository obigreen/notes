import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'
import {useToggleArray} from "../hooks/useToggleArray";
import {useWord} from "../hooks/useWordTest";
import {FlexWrapper} from "../../../components/FlexWrapper";
import {Button} from "../button/Button";


const arrAdverbs = [
    { eng: 'near', rus: 'рядом' },
    { eng: 'very', rus: 'очень' },
    { eng: 'just', rus: 'только что' },
    { eng: 'still', rus: 'все еще' },
    { eng: 'even', rus: 'даже' },
    { eng: 'also', rus: 'также' },
    { eng: 'often', rus: 'часто' },
    { eng: 'usually', rus: 'обычно' },
    { eng: 'really', rus: 'действительно' },
    { eng: 'always', rus: 'всегда' },
    { eng: 'sometimes', rus: 'иногда' },
    { eng: 'never', rus: 'никогда' },
    { eng: 'well', rus: 'хорошо' },
    { eng: 'actually', rus: 'на самом деле' },
    { eng: 'quickly', rus: 'быстро' },
    { eng: 'together', rus: 'вместе' },
    { eng: 'soon', rus: 'скоро' },
    { eng: 'finally', rus: 'наконец' },
    { eng: 'then', rus: 'тогда, затем' },
    { eng: 'here', rus: 'здесь' },
    { eng: 'there', rus: 'там' },
    { eng: 'out loud', rus: 'вслух' },
    { eng: 'almost', rus: 'почти' },
];


export const Adverbs = () => {
    const { array: adverbs, toggleArray } = useToggleArray(arrAdverbs);
    const {
        isSingleWordMode, toggleMode, currentWord, inputValue,
        setInputValue, isCorrect, handleNextWord, handleCheckTranslation
    } = useWord(adverbs);

    return (
        <NoteBlock>
            <NotesTitle>Adverbs</NotesTitle>
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
                    adverbs.map((adverb, index) => (
                        <S.TextWrapper key={index}>
                            <S.EngWord>{adverb.eng}</S.EngWord>
                            <S.RusWord>{adverb.rus}</S.RusWord>
                        </S.TextWrapper>
                    ))
                )}
            </Text>
        </NoteBlock>
    );
};


