import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'
import {useToggleArray} from "../hooks/useToggleArray";
import {useWord} from "../hooks/useWordTest";
import {FlexWrapper} from "../../../components/FlexWrapper";
import {Button} from "../button/Button";


const arrProgrammingLanguage = [
    { eng: 'Is not defined', rus: 'Не существует' },
    { eng: 'primary', rus: 'Начальный' },
    { eng: 'secondary', rus: 'Вторичный' },
    { eng: 'Assets', rus: 'Ресурсы' },
    { eng: 'layout', rus: 'Макет' },
    { eng: 'Array', rus: 'Массив' },
    { eng: 'Join', rus: 'Присоединиться' },
    { eng: 'Current', rus: 'Текущий' },
    { eng: 'Event', rus: 'Событие' },
    { eng: 'Сhange', rus: 'Изменения' },
];


export const ProgrammingLanguageTranslate = () => {
    const { array: programmingLanguage, toggleArray } = useToggleArray(arrProgrammingLanguage);
    const {
        isSingleWordMode, toggleMode, currentWord, inputValue,
        setInputValue, isCorrect, handleNextWord, handleCheckTranslation
    } = useWord(programmingLanguage);

    return (
        <NoteBlock>
            <NotesTitle>Programming Language</NotesTitle>
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
                    programmingLanguage.map((programmingLang, index) => (
                        <S.TextWrapper key={index}>
                            <S.EngWord>{programmingLang.eng}</S.EngWord>
                            <S.RusWord>{programmingLang.rus}</S.RusWord>
                        </S.TextWrapper>
                    ))
                )}
            </Text>
        </NoteBlock>
    );
};



