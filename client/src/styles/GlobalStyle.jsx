import { createGlobalStyle, css } from "styled-components"
import reset from 'styled-reset'    // normalize쓸지 고민하다가 reset 으로 결정

export const GlobalStyle = createGlobalStyle`
    ${reset}
    
    ${({ theme }) => {
        return css`
        @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 100;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.otf) format('opentype');}
        @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 300;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.otf) format('opentype');}
        @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 400;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf) format('opentype');}
        @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 500;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.otf) format('opentype');}
        @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 700;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf) format('opentype');}
        @font-face {font-family: 'Noto Sans KR';font-style: normal;font-weight: 900;src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2) format('woff2'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff) format('woff'),url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.otf) format('opentype');}

        *, ::after, ::before {	
            box-sizing: border-box;
        }
    
        :root {
            --primaryColor: ${theme.colors.primary};
            --secondaryColor: ${theme.colors.secondary};
            --blackColor: ${theme.colors.black};
            --lightColor: ${theme.colors.light};
            --lightGreyColor: ${theme.colors.lightGrey};
        }

        body, input {
            margin: 0px;
            font-family: ${theme.fonts.family.base};
            line-height: 1.5;
        }
    
        ::selection {
           background: ${theme.colors.primary};
           color: white;
        }
        ::-moz-selection {
           background: ${theme.colors.primary};
           color: white;
        }
    
        a {
            color: ${theme.colors.primary};
            text-decoration: none;
        }

        h1 {
            font-size: 2em;
            font-weight: bold;
            line-height: 1.2;
        }
        h2 {
            font-size: 1.5em;
            line-height: 1.2;
        }
        h3 {
            font-size: 1.17em;
            line-height: 1.2;
        }
        h4 {
            font-size: 1em;
            line-height: 1.2;
        }
        h5 {
            font-size: 0.83em;
            line-height: 1.2;
        }
        h6 {
            font-size: 0.75em;
            line-height: 1.2;
        }
        b, strong {
            font-weight: bold;
        }
        i, em {
            font-style: italic;
        }

        button {
            cursor: pointer;
        }

        ol {
            display: block;
            list-style-type: decimal;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding-inline-start: 40px;
        }
        ul {
            display: block;
            list-style-type: disc;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding-inline-start: 40px;
        }

        .ol-li {
            list-style-type: decimal;
        }
        .ul-li {
            list-style-type: disc;
        }

        blockquote {
            margin: 0 0 1rem;
            padding-top: 5px;
            padding-bottom: 2px;
            padding-left: 14px;
            border-left: ${theme.colors.primary} 4px solid;
            background-color: #f6fff5;
        }

        .primary {
            color: ${theme.colors.primary};
        }
        .outline-none {
            outline: none;
        }
        `
    }}
    
`;