import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const unlearnedWords = [
    { eng: 'Us', rus: 'мы, нас, нам' },
    { eng: 'our, ours', rus: 'наш, наша, наше, наши' },
    { eng: 'them', rus: 'их, им' },
    { eng: 'me', rus: 'я, меня, мне' },
    { eng: 'Why?', rus: 'Почему?' },
    // { eng: 'How?', rus: 'Как?' },
    { eng: 'Whom?', rus: 'Кому?' },
    { eng: 'What is?', rus: 'Что такое?' },
    { eng: 'because', rus: 'потому что' },
    { eng: 'also', rus: 'также' },
    { eng: 'at', rus: 'у, в, на' },
    // { eng: 'learn', rus: 'учить' },
    { eng: 'spend', rus: 'тратить' },
    { eng: 'send', rus: 'отправлять' },
    { eng: 'lend', rus: 'одолжить, занять' },
    { eng: 'make', rus: 'создавать' },
    { eng: 'choose', rus: 'выбирать' },
    { eng: 'take', rus: 'брать' },
    // { eng: 'bill', rus: 'счет (ко оплате)' },
    { eng: 'shelf unit', rus: 'стеллаж' },
    { eng: 'flat', rus: 'квартира' },
    { eng: 'cupboard', rus: 'шкаф' },
    { eng: 'suitcase', rus: 'чемодан' },
    { eng: 'rubbish', rus: 'мусор' },
    // { eng: 'cap', rus: 'кепка' },
    { eng: 'nephew', rus: 'племянник' },
    { eng: 'niece', rus: 'племянница' },
    { eng: 'wardrobe', rus: 'шкаф для одежды' },
    { eng: 'shoe rack', rus: 'обувница' },
    { eng: 'sink', rus: 'раковина' },
    { eng: 'bath', rus: 'ванна' },
    { eng: 'afternoon', rus: 'после полудня' },
    // { eng: 'vacation', rus: 'отпуск' },
    // { eng: 'holidays', rus: 'праздники' },
    // { eng: 'vegetables', rus: 'овощи' },
    // { eng: 'clever', rus: 'умный (сообразительный, остроумный, находчивый)' },
    // { eng: 'soft', rus: 'мягкий' },
    // { eng: 'hungry', rus: 'голодный' },
    // { eng: 'windy', rus: 'ветреный' },
    // { eng: 'rainy', rus: 'дождливый' },
    // { eng: 'extra', rus: 'дополнительный' },
    // { eng: 'careful', rus: 'осторожный' },
    // { eng: 'helpful', rus: 'полезный' }
];


export const UnlearnedWords = () => {
    return (
        <NoteBlock>
            <NotesTitle>Unlearned Words</NotesTitle>
            <Text>
                {unlearnedWords.map((unlearnedWords, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{unlearnedWords.eng}</S.EngWord>
                        <S.RusWord>{unlearnedWords.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



