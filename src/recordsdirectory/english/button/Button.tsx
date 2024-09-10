import React from 'react';
import styled from "styled-components";
import {Icon} from "../../../components/icon/Icon";


type PropsType = {
    onClick: () => void
    iconId?: string; // Иконка необязательна
    title?: string
}

export const Button = ({onClick, title, iconId}: PropsType) => {
    return (
        <RandomButton onClick={onClick}>
            {iconId ? <Icon iconId={iconId} width="50" height="50" viewBox={"0 0 32 32"}/> : title}
        </RandomButton>
    );
};

const RandomButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    top: 10px;
    left: 10px;
    border-radius: 10px;
    padding: 10px;
    border: none;
    background-color: #1e1f22;
    cursor: pointer;
    color: white;
    font-style: normal;
    font-size: 20px;
`

