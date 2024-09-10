import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'
import {useToggleArray} from "../hooks/useToggleArray";
import {useWord} from "../hooks/useWordTest";
import {FlexWrapper} from "../../../components/FlexWrapper";
import {Button} from "../button/Button";


const arrPrepositions = [
    { eng: 'for', rus: 'для' },
    { eng: 'with', rus: 'с (кем-то, чем-то)' },
    { eng: 'without', rus: 'без' },
    { eng: 'in', rus: 'в' },
    { eng: 'into', rus: 'внутрь' },
    { eng: 'about', rus: 'о (о ком-то, о чем-то)' },
    { eng: 'from', rus: 'из' },
    { eng: 'or', rus: 'или' },
    { eng: 'at', rus: 'у, в, на' },
    { eng: 'of', rus: 'из, от' },
    { eng: 'to', rus: 'к (чему-то), в' },
    { eng: 'also', rus: 'также' },
    { eng: 'on', rus: 'на' },
    { eng: 'from ... to ...', rus: 'с ... до ...' },
    { eng: 'near', rus: 'рядом' },
    { eng: 'during', rus: 'в течении' },
    { eng: 'only', rus: 'только' },
    { eng: 'before', rus: 'до' },
    { eng: 'after', rus: 'после' },
    { eng: 'through', rus: 'через' },
    { eng: 'over', rus: 'над' },
    { eng: 'under', rus: 'под' },
    { eng: 'between', rus: 'между' },
    { eng: 'as', rus: 'как' },
    { eng: 'by', rus: 'у, рядом с' },
];


export const Prepositions = () => {
    const { array: prepositions, toggleArray } = useToggleArray(arrPrepositions);
    const {
        isSingleWordMode, toggleMode, currentWord, inputValue,
        setInputValue, isCorrect, handleNextWord, handleCheckTranslation
    } = useWord(prepositions);

    return (
        <NoteBlock>
            <NotesTitle>Prepositions</NotesTitle>
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
                    prepositions.map((preposition, index) => (
                        <S.TextWrapper key={index}>
                            <S.EngWord>{preposition.eng}</S.EngWord>
                            <S.RusWord>{preposition.rus}</S.RusWord>
                        </S.TextWrapper>
                    ))
                )}
            </Text>
        </NoteBlock>
    );
};



