import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #1e1f22;
        font-family: "Open Sans", sans-serif;
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
        cursor: pointer;
        color: inherit;
    }

    button {
        background-color: unset;
        border: none;
        cursor: pointer;
    }
    
`




