import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const nouns = [
    { eng: 'note', rus: 'запись, записка, примечание' },
    { eng: 'notes', rus: 'записи, конспект' },
    { eng: 'post (as in mail)', rus: 'почта' },
    { eng: 'soap', rus: 'мыло' },
    { eng: 'boat', rus: 'лодка, судно' },
    { eng: 'bill', rus: 'счет (ко оплате)' },
    { eng: 'list', rus: 'список' },
    { eng: 'visit', rus: 'визит, посещение' },
    { eng: 'tin', rus: 'банка' },
    { eng: 'event', rus: 'событие' },
    { eng: 'sentence', rus: 'предложение' },
    { eng: 'life', rus: 'жизнь' },
    { eng: 'lives', rus: 'жизни' },
    { eng: 'type', rus: 'тип' },
    { eng: 'step', rus: 'шаг' },
    { eng: 'lesson', rus: 'урок' },
    { eng: 'line', rus: 'линия' },
    { eng: 'seat', rus: 'сиденье' },
    { eng: 'team', rus: 'команда' },
    { eng: 'meat', rus: 'мясо' },
    { eng: 'tablet', rus: 'планшет' },
    { eng: 'laptop', rus: 'ноутбук' },
    { eng: 'memory', rus: 'память' },
    { eng: 'developer', rus: 'разработчик' },
    { eng: 'living room', rus: 'гостиная' },
    { eng: 'bookcase', rus: 'книжный шкаф' },
    { eng: 'shelf unit', rus: 'стеллаж' },
    { eng: 'flat', rus: 'квартира' },
    { eng: 'sofa, couch', rus: 'диван' },
    { eng: 'cupboard', rus: 'шкаф' },
    { eng: 'suitcase', rus: 'чемодан' },
    { eng: 'rubbish', rus: 'мусор' },
    { eng: 'key', rus: 'ключ' },
    { eng: 'uncle', rus: 'дядя' },
    { eng: 'aunt', rus: 'тетя' },
    { eng: 'nephew', rus: 'племянник' },
    { eng: 'niece', rus: 'племянница' },
    { eng: 'bathroom', rus: 'ванная комната' },
    { eng: 'toilet room', rus: 'туалет' },
    { eng: 'bedroom', rus: 'спальня' },
    { eng: 'wardrobe', rus: 'шкаф для одежды' },
    { eng: 'shoe rack', rus: 'обувница' },
    { eng: 'kitchen', rus: 'кухня' },
    { eng: 'fridge', rus: 'холодильник' },
    { eng: 'stove cooker', rus: 'плита' },
    { eng: 'microwave', rus: 'микроволновая печь' },
    { eng: 'sink', rus: 'раковина' },
    { eng: 'washing machine', rus: 'стиральная машина' },
    { eng: 'dishwasher', rus: 'посудомоечная машина' },
    { eng: 'rest', rus: 'отдых' },
    { eng: 'bath', rus: 'ванна' },
    { eng: 'afternoon', rus: 'после полудня' },
    { eng: 'vacation', rus: 'отпуск' },
    { eng: 'holidays', rus: 'праздники' },
    { eng: 'nationality', rus: 'национальность' },
    { eng: 'vegetables', rus: 'овощи' },
    { eng: 'relative', rus: 'родственник' },
    { eng: 'plate', rus: 'тарелка' },
    { eng: 'canteen', rus: 'столовая, кафетерий' },
    { eng: 'south', rus: 'юг' },
    { eng: 'garden', rus: 'сад' },
    { eng: 'answer', rus: 'ответ' },
    { eng: 'diamond', rus: 'бриллиант' },
    { eng: 'chair', rus: 'стул' },
    { eng: 'coat', rus: 'куртка, пальто' },
    { eng: 'piece of paper', rus: 'лист бумаги' },
    { eng: 'reservation', rus: 'бронь' },
];


export const Nouns = () => {
    return (
        <NoteBlock>
            <NotesTitle>Nouns</NotesTitle>
            <Text>
                {nouns.map((nouns, index) => (
                    <S.TextWrapper key={index}>
                        <S.EngWord>{nouns.eng}</S.EngWord>
                        <S.RusWord>{nouns.rus}</S.RusWord>
                    </S.TextWrapper>
                ))}
            </Text>
        </NoteBlock>
    );
};



