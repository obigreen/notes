import styled from "styled-components";

const ListTitle = styled.h2`
    margin-bottom: 10px;
    font-size: 25px;
    font-style: normal;
`

const AiWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    background-color: #fafafa;

    &:not(:last-child) {
        margin-bottom: 15px;
    }
`;

// Стиль для блока изображения
const ImageContainer = styled.div`
    min-width: 200px;
    max-width: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px; /* Расстояние между изображением и текстом */
`;

// Стиль для изображения
const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: 100%;
`;

// Стиль для блока текста в секции
const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
`;

// Стиль для заголовка
const Title = styled.h2`
    font-size: 18px;
    margin: 0 0 10px 0; /* Удаление отступа сверху и снизу */
`;

const LinkWrapp = styled.div`
    margin-bottom: 10px;
`

// Стиль для ссылки
const Link = styled.a`
    font-size: 16px;
    color: blue;
    text-decoration: none;
    display: inline-block;
    word-break: break-all;
    overflow-wrap: break-word;
`;

// Стиль для описания
const Description = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0; /* Удаление отступа */
    width: 100%;
`;


export const S = {
    AiWrapper, ImageContainer, Image, TextBlock, Title, Link, Description, ListTitle, LinkWrapp
}