import React from 'react';
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from '../English_Styles'


const nouns = [
    { eng: 'people', rus: 'люди' },
    { eng: 'note', rus: 'запись, записка, примечание' },
    { eng: 'notes', rus: 'записи, конспект' },
    { eng: 'post (as in mail)', rus: 'почта' },
    { eng: 'soap', rus: 'мыло' },
    { eng: 'boat', rus: 'лодка, судно' },
    { eng: 'bill', rus: 'счет (ко оплате)' },
    { eng: 'list', rus: 'список' },
    { eng: 'visit', rus: 'визит, посещение' },
    { eng: 'bell', rus: 'колокол' },
    { eng: 'tin', rus: 'банка' },
    { eng: 'event', rus: 'событие' },
    { eng: 'sentence', rus: 'предложение' },
    { eng: 'telly', rus: 'телевизор' },
    { eng: 'file', rus: 'файл' },
    { eng: 'time', rus: 'время' },
    { eng: 'life', rus: 'жизнь' },
    { eng: 'lives', rus: 'жизни' },
    { eng: 'find', rus: 'найти' },
    { eng: 'type', rus: 'тип' },
    { eng: 'test', rus: 'тест' },
    { eng: 'steel', rus: 'сталь' },
    { eng: 'step', rus: 'шаг' },
    { eng: 'lesson', rus: 'урок' },
    { eng: 'line', rus: 'линия' },
    { eng: 'seat', rus: 'сиденье' },
    { eng: 'team', rus: 'команда' },
    { eng: 'meat', rus: 'мясо' },
    { eng: 'beef', rus: 'говядина' },
    { eng: 'tablet', rus: 'планшет' },
    { eng: 'laptop', rus: 'ноутбук' },
    { eng: 'memory', rus: 'память' },
    { eng: 'photos', rus: 'фотографии' },
    { eng: 'developer', rus: 'разработчик' },
    { eng: 'living room', rus: 'гостиная' },
    { eng: 'bookcase', rus: 'книжный шкаф' },
    { eng: 'shelf unit', rus: 'стеллаж' },
    { eng: 'flat', rus: 'квартира' },
    { eng: 'sofa, couch', rus: 'диван' },
    { eng: 'cupboard', rus: 'шкаф' },
    { eng: 'suitcase', rus: 'чемодан' },
    { eng: 'rubbish', rus: 'мусор' },
    { eng: 'cap', rus: 'кепка' },
    { eng: 'key', rus: 'ключ' },
    { eng: 'motorcycle, motorbike', rus: 'мотоцикл' },
    { eng: 'bicycle bike', rus: 'велосипед' },
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
    { eng: 'lesson notes', rus: 'заметки по уроку' },
    { eng: 'vacation', rus: 'отпуск' },
    { eng: 'holidays', rus: 'праздники' },
    { eng: 'nationality', rus: 'национальность' },
    { eng: 'vegetables', rus: 'овощи' }
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



