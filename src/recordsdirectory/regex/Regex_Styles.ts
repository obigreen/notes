import styled from "styled-components";

const HighlightedText = styled.span<{ $isTop?: boolean }>`
    background-color: ${({$isTop}) => ($isTop ? "#ffd9d9" : "#e8e8e8")};
    border-radius: 5px;
    padding: 2px 6px;
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
        margin-bottom: 20px;
    }
`;

const PopupWrapper = styled.div`
    position: fixed;
    max-width: 900px;
    width: calc(100% - 20px);
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

const TableWrap = styled.div`
    width: 100%;
    overflow-x: auto;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 7px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 20px;
`;

const NoteTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 660px;
    background-color: #ffffff;
`;

const TableHeadCell = styled.th`
    background-color: #1e1f22;
    color: white;
    font-weight: 600;
    text-align: left;
    padding: 14px 12px;
    border: 1px solid #d9d9d9;
`;

const TableCell = styled.td`
    vertical-align: top;
    padding: 12px;
    border: 1px solid #d9d9d9;
    font-size: 18px;
    line-height: 1.3;
`;

const TableToken = styled.code`
    display: inline-block;
    border-radius: 6px;
    background-color: #f2f2f2;
    padding: 2px 6px;
    font-size: 16px;
    font-family: "Courier New", monospace;
`;

const DemoGrid = styled.div`
    display: grid;
    gap: 16px;
`;

const DemoCard = styled.div`
    border: 1px solid #d7d7d7;
    border-radius: 12px;
    padding: 16px;
    background-color: #ffffff;
`;

const DemoTitle = styled.h5`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const DemoHint = styled.p`
    margin-bottom: 10px;
    font-size: 16px;
`;

const DemoLabel = styled.label`
    display: block;
    font-size: 16px;
    margin-bottom: 8px;
    font-weight: 500;
`;

const DemoInput = styled.input`
    width: 100%;
    border: 1px solid #cfcfcf;
    border-radius: 8px;
    font-size: 16px;
    padding: 8px 10px;
    margin-bottom: 10px;
`;

const DemoTextarea = styled.textarea`
    width: 100%;
    border: 1px solid #cfcfcf;
    border-radius: 8px;
    font-size: 16px;
    padding: 8px 10px;
    margin-bottom: 10px;
    min-height: 88px;
    resize: vertical;
`;

const DemoSelect = styled.select`
    width: 100%;
    border: 1px solid #cfcfcf;
    border-radius: 8px;
    font-size: 16px;
    padding: 8px 10px;
    margin-bottom: 10px;
`;

const DemoOutput = styled.pre`
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 16px;
    line-height: 1.4;
    border-radius: 8px;
    padding: 10px;
    background-color: #f4f4f4;
    margin-bottom: 10px;
`;

const DemoBadge = styled.span<{ $isError?: boolean }>`
    display: inline-block;
    padding: 3px 7px;
    border-radius: 6px;
    font-size: 14px;
    margin-bottom: 10px;
    background-color: ${({$isError}) => ($isError ? "#ffe5e5" : "#eaf8e6")};
    color: ${({$isError}) => ($isError ? "#8f1111" : "#1d5f1f")};
`;

export const S = {
    HighlightedText,
    List,
    Item,
    PopupWrapper,
    Overlay,
    TableWrap,
    NoteTable,
    TableHeadCell,
    TableCell,
    TableToken,
    DemoGrid,
    DemoCard,
    DemoTitle,
    DemoHint,
    DemoLabel,
    DemoInput,
    DemoTextarea,
    DemoSelect,
    DemoOutput,
    DemoBadge
};
