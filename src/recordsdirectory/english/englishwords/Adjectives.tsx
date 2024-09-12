import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'
import {useToggleArray} from "../hooks/useToggleArray";
import {useWord} from "../hooks/useWordTest";
import {FlexWrapper} from "../../../components/FlexWrapper";
import {Button} from "../button/Button";


const arrAdjectives = [
    { eng: 'old', rus: 'старый' },
    { eng: 'busy', rus: 'занятый' },
    { eng: 'easy', rus: 'легкий' },
    { eng: 'empty', rus: 'пустой' },
    { eng: 'foreign', rus: 'иностранный' },
    { eng: 'little', rus: 'маленький (уменьшительно)' },
    { eng: 'small', rus: 'маленький' },
    { eng: 'sunny', rus: 'солнечный' },
    { eng: 'smart', rus: 'умный (общее понятие)' },
    { eng: 'clever', rus: 'умный (сообразительный, остроумный, находчивый)' },
    { eng: 'soft', rus: 'мягкий' },
    { eng: 'hungry', rus: 'голодный' },
    { eng: 'windy', rus: 'ветреный' },
    { eng: 'snowy', rus: 'снежный' },
    { eng: 'rainy', rus: 'дождливый' },
    { eng: 'extra', rus: 'дополнительный' },
    { eng: 'lazy', rus: 'ленивый' },
    { eng: 'careful', rus: 'внимательный' },
    { eng: 'helpful', rus: 'полезный' },
    { eng: 'hard-working', rus: 'трудолюбивый' },
    { eng: 'creative', rus: 'творческий' },
    { eng: 'kind', rus: 'добрый' },
    { eng: 'beautiful', rus: 'красивая' },
    { eng: 'tense', rus: 'напряженный' },
    { eng: 'powerful', rus: 'мощный' },
    { eng: 'intelligent', rus: 'умный (самый умный)' },
    { eng: 'tall', rus: 'высокий' },
    { eng: 'cheap', rus: 'дешевый' },
    { eng: 'silly', rus: 'глупенький' },
    { eng: 'the whole', rus: 'целый, весь/всю' },
    { eng: 'brown', rus: 'коричневый' },
    { eng: 'few', rus: 'мало (исчисл.)' },
    { eng: 'a few', rus: 'несколько (не мало)' },
    { eng: 'little', rus: 'мало (исчисл.)' },
    { eng: 'a little', rus: 'несколько (не мало)' },
];



export const Ajectives = () => {
    const { array: ajectives, toggleArray } = useToggleArray(arrAdjectives);
    const {
        isSingleWordMode, toggleMode, currentWord, inputValue,
        setInputValue, isCorrect, handleNextWord, handleCheckTranslation
    } = useWord(ajectives);

    return (
        <NoteBlock>
            <NotesTitle>Ajectives</NotesTitle>
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
                    ajectives.map((ajective, index) => (
                        <S.TextWrapper key={index}>
                            <S.EngWord>{ajective.eng}</S.EngWord>
                            <S.RusWord>{ajective.rus}</S.RusWord>
                        </S.TextWrapper>
                    ))
                )}
            </Text>
        </NoteBlock>
    );
};



