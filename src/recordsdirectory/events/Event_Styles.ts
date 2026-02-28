import styled from "styled-components";

const HighlightedText = styled.span<{ $isTop?: boolean }>`
    background-color: ${({$isTop}) => ($isTop ? "#ffd9d9" : "#e8e8e8")};
    border-radius: 5px;
    padding: 2px 5px;
    cursor: pointer;
    color: ${({$isTop}) => ($isTop ? "#b30a0a" : "#1e1f22")};
    border: 1px solid ${({$isTop}) => ($isTop ? "#ff9a9a" : "transparent")};
    font-weight: ${({$isTop}) => ($isTop ? 700 : 500)};
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
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
    position: fixed;
    max-width: 900px;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    max-height: 90vh;
    overflow-y: auto;
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
