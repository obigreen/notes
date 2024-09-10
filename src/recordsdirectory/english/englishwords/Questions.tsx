import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'
import {Button} from "../button/Button";
import {useToggleArray} from "../hooks/useToggleArray";
import {useWord} from "../hooks/useWordTest";
import {FlexWrapper} from "../../../components/FlexWrapper";


const arrQestions = [
    {eng: 'What?', rus: 'Что?'},
    {eng: 'Who?', rus: 'Кто?'},
    {eng: 'Where?', rus: 'Где?'},
    {eng: 'When?', rus: 'Когда?'},
    {eng: 'Why?', rus: 'Почему?'},
    {eng: 'How?', rus: 'Как?'},
    {eng: 'How many?', rus: 'Сколько? (исчесл.)'},
    {eng: 'How much?', rus: 'Сколько? (не исчесл.)'},
    {eng: 'Whose?', rus: 'Чей?'},
    {eng: 'Whom?', rus: 'Кому?'},
    {eng: 'What is?', rus: 'Что такое?'},
    {eng: 'Which', rus: 'Который?'},
];


export const Questions = () => {
    const { array: questions, toggleArray } = useToggleArray(arrQestions);
    const {
        isSingleWordMode, toggleMode, currentWord, inputValue,
        setInputValue, isCorrect, handleNextWord, handleCheckTranslation
    } = useWord(questions);

    return (
        <NoteBlock>
            <NotesTitle>Questions</NotesTitle>
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
                    questions.map((question, index) => (
                        <S.TextWrapper key={index}>
                            <S.EngWord>{question.eng}</S.EngWord>
                            <S.RusWord>{question.rus}</S.RusWord>
                        </S.TextWrapper>
                    ))
                )}
            </Text>
        </NoteBlock>
    );
};




