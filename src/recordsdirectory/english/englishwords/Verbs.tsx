import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'
import {useToggleArray} from "../hooks/useToggleArray";
import {useWord} from "../hooks/useWordTest";
import {FlexWrapper} from "../../../components/FlexWrapper";
import {Button} from "../button/Button";


const arrVerbs = [
    { eng: 'listen', rus: 'слушать' },
    { eng: 'open', rus: 'открыть, раскрытый' },
    { eng: 'visit', rus: 'посещать' },
    { eng: 'learn', rus: 'учить' },
    { eng: 'write', rus: 'писать' },
    { eng: 'come in', rus: 'входить' },
    { eng: 'go out', rus: 'выходить' },
    { eng: 'spend', rus: 'тратить' },
    { eng: 'send', rus: 'отправлять' },
    { eng: 'see', rus: 'видеть' },
    { eng: 'set', rus: 'набор' },
    { eng: 'test (verb)', rus: 'тестировать' },
    { eng: 'spell', rus: 'произносить (по буквам)' },
    { eng: 'find', rus: 'найти' },
    { eng: 'meet', rus: 'встречаться, знакомиться' },
    { eng: 'mend', rus: 'чинить' },
    { eng: 'tell', rus: 'сказать (рассказывать, сообщать)' },
    { eng: 'lend', rus: 'одолжить, занять' },
    { eng: 'wash', rus: 'мыть' },
    { eng: 'start', rus: 'начинать' },
    { eng: 'drive', rus: 'водить, управлять' },
    { eng: 'have', rus: 'иметь' },
    { eng: 'read', rus: 'читать' },
    { eng: 'study', rus: 'изучать' },
    { eng: 'live', rus: 'жить' },
    { eng: 'eat', rus: 'есть' },
    { eng: 'do', rus: 'делать (обычные дела, задачи)' },
    { eng: 'make', rus: 'делать, создавать (что то новое)' },
    { eng: 'choose', rus: 'выбирать' },
    { eng: 'rest', rus: 'отдыхать' },
    { eng: 'train', rus: 'тренироваться' },
    { eng: 'speak', rus: 'говорить (обычный разговор)' },
    { eng: 'go', rus: 'идти' },
    { eng: 'take', rus: 'брать' },
    { eng: 'get dressed', rus: 'одеться' },
    { eng: 'think', rus: 'думать' },
    { eng: 'want', rus: 'хотеть' },
    { eng: 'give', rus: 'давать' },
    { eng: 'use', rus: 'использовать' },
    { eng: 'ask', rus: 'спрашивать' },
    { eng: 'feel', rus: 'чувствовать' },
    { eng: 'tired', rus: 'уставать' },
    { eng: 'forget', rus: 'забывать' },
    { eng: 'afraid', rus: 'бояться' },
    { eng: 'angry', rus: 'злиться' },
    { eng: 'thirsty', rus: 'хочется пить, жажда' },
    { eng: 'to book', rus: 'бронировать (столик)' },
    { eng: 'charge', rus: 'заряжать' },
    { eng: 'watch', rus: 'смотреть' },
];



export const Verbs = () => {
    const { array: verbs, toggleArray } = useToggleArray(arrVerbs);
    const {
        isSingleWordMode, toggleMode, currentWord, inputValue,
        setInputValue, isCorrect, handleNextWord, handleCheckTranslation
    } = useWord(verbs);

    return (
        <NoteBlock>
            <NotesTitle>Verbs</NotesTitle>
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
                    verbs.map((verb, index) => (
                        <S.TextWrapper key={index}>
                            <S.EngWord>{verb.eng}</S.EngWord>
                            <S.RusWord>{verb.rus}</S.RusWord>
                        </S.TextWrapper>
                    ))
                )}
            </Text>
        </NoteBlock>
    );
};



