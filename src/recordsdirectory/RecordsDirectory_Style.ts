import styled from "styled-components";


//All notes
export const NoteBlock = styled.section`
    width: 100%;
    margin: 0 auto 70px auto;
`

export const Text = styled.article`
    padding: 15px;
    background-color: #f7f7f7;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 10px 0;
    position: relative;
`;

export const NotesTitle = styled.h3`
    font-weight: 500;
    font-size: 23px;
    font-style: normal;
    color: white;
    margin-bottom: 10px;
`

export const TypeTitle = styled.h2`
    font-weight: 600;
    font-size: 30px;
    font-style: normal;
    color: white;
    margin-bottom: 50px;
`

export const Link = styled.a`

`

// notesBloks
export const Section = styled.div`
    margin-bottom: 50px;
`

export const BookTitle = styled.h3`
    margin-bottom: 60px;
    font-style: normal;
    font-size: 30px;
    font-weight: 700;
`
export const ParagraphTitle = styled.h4`
    margin-bottom: 40px;
    font-style: normal;
    font-size: 24px;
`
export const TextP = styled.p`
    margin-bottom: 15px;
    font-weight: 200;
    font-style: normal;
    font-size: 20px;
    line-height: 1.2;

`
export const Marker = styled.span`
    //создать маркеру стили и передавать из через пропсы, жирность там, выделение и всякое 
    font-weight: 700;
`

export const NoteUl = styled.ul`
    margin-bottom: 20px;
    padding-left: 30px;
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
`
export const NoteLi = styled.li`
    &:not(:last-child) {
        margin-bottom: 15px;
    }
`


//Copy code bitton
export const CodeBlockWrapp = styled.div`
    width: 100%;
    position: relative;
    margin-bottom: 40px;
    //display: none;
`
export const ButtonCopy = styled.button`
    position: absolute;
    top: 9px;
    right: 7px;
    cursor: pointer;
    background: transparent;
    border: none;

    img {
        width: 20px;
        height: auto;
    }
`


//video
export const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* Ratio 16:9 (100%/16*9 = 56.25%) */
    height: 0;
    margin-bottom: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 7px 0 rgba(0, 0, 0, 0.19);

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        border-radius: 12px;
        border: none;
    }
`
