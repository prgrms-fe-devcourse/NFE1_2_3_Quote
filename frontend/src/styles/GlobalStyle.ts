import { createGlobalStyle } from "styled-components";
import NanumSquareBold from "@assets/fonts/NanumSquareB.ttf";
import NanumSquareRegular from "@assets/fonts/NanumSquareR.ttf";

const GlobalStyle = createGlobalStyle`    
     @font-face {
        font-family: "NanumSquareBold";
        src: local("NanumSquareBold"), url(${NanumSquareBold}) format("truetype");
        font-weight: bold;
    }
    @font-face {
        font-family: "NanumSquareRegular";
        src: local("NanumSquareRegular"), url(${NanumSquareRegular}) format("truetype");
        font-weight: normal;
    }
    * {
        font-family: 'NanumSquareRegular', sans-serif;
        font-weight: normal;
        box-sizing: border-box;
    }
    body {
        margin: 0;
        height: 100%;
        background-color: #f3f3f3;
    }
`;

export default GlobalStyle;
