import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'
import {useToggleArray} from "../hooks/useToggleArray";
import {useWord} from "../hooks/useWordTest";
import {FlexWrapper} from "../../../components/FlexWrapper";
import {Button} from "../button/Button";


const arrPronouns = [
    { eng: 'he, she, it', rus: 'он, она, это' },
    { eng: 'you', rus: 'ты, вы' },
    { eng: 'your', rus: 'твой, ваш' },
    { eng: 'we', rus: 'мы' },
    { eng: 'they', rus: 'они' },
    { eng: 'my', rus: 'мой' },
    { eng: 'me', rus: 'я, меня, мне' },
    { eng: 'us', rus: 'мы, нас, нам' },
    { eng: 'her', rus: 'ее, ей' },
    { eng: 'his', rus: 'его' },
    { eng: 'him', rus: 'ему' },
    { eng: 'our, ours', rus: 'наш, наша, наше, наши' },
    { eng: 'them', rus: 'их, им (вижу их)' },
    { eng: 'their', rus: 'их (их дом)' },
    { eng: 'this', rus: 'этот, это' },
    { eng: 'these', rus: 'эти' },
    { eng: 'that', rus: 'тот, та, то' },
    { eng: 'those', rus: 'те' },
    { eng: 'other', rus: 'другой, другие' },
];

export const Pronouns = () => {
    const { array: pronouns, toggleArray } = useToggleArray(arrPronouns);
    const {
        isSingleWordMode, toggleMode, currentWord, inputValue,
        setInputValue, isCorrect, handleNextWord, handleCheckTranslation
    } = useWord(pronouns);

    return (
        <NoteBlock>
            <NotesTitle>Pronouns</NotesTitle>
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
                    pronouns.map((pronoun, index) => (
                        <S.TextWrapper key={index}>
                            <S.EngWord>{pronoun.eng}</S.EngWord>
                            <S.RusWord>{pronoun.rus}</S.RusWord>
                        </S.TextWrapper>
                    ))
                )}
            </Text>
        </NoteBlock>
    );
};



