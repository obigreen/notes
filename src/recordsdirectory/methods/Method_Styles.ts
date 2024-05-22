import styled from "styled-components";

const HighlightedText = styled.span`
    background-color: #e8e8e8;
    border-radius: 5px;
    padding: 2px 5px;
    cursor: pointer;
    color: #1e1f22;
`;

const List = styled.ul`
    list-style-type: none; // Убираем маркеры списка
    padding: 0; // Сбрасываем внутренние отступы
`;
const Item = styled.li`
    position: relative;
    line-height: 1.8;
    font-style: normal;

    &:not(:last-child) {
        margin-bottom: 35px;
    }
`;

const PopupWrapper = styled.div`
    position: absolute;
    max-width: 900px;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9;
`;

export const S = {
    HighlightedText, List, Item, PopupWrapper, Overlay
}