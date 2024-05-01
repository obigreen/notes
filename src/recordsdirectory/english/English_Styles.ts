import styled from "styled-components";


const TextWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
`

const RusWord = styled.p`
    font-weight: 600;
    font-size: 20px;
    font-style: normal;
    color: #1e1f22;
`
const EngWord = styled.p`
    font-weight: 600;
    font-size: 20px;
    font-style: normal;
    color: #1e1f22;
`

export const S = {
    TextWrapper, RusWord, EngWord
}