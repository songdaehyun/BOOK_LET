import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
// 폰트 
@font-face {
    font-family: "Pretendard-Regular";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
}  

@font-face {
    font-family: 'JejuMyeongjo';
    font-weight: normal;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/jeju/JejuMyeongjo.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/jeju/JejuMyeongjo.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/jeju/JejuMyeongjo.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/jeju/JejuMyeongjo.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/jeju/JejuMyeongjo.ttf') format("truetype");
    font-display: swap;
} 

    * {
        font-family: Pretendard, "Arial", sans-serif;
        /* font-family: Pretendard-Regular, "Arial", sans-serif; */
        font-size: 16px;
    }

    button {
        color: black;
    }
`;
