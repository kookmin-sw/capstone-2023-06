import { createGlobalStyle, css } from "styled-components"
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
    ${ reset }
    
    ${({ theme }) => {
        return css`
        *, ::after, ::before {	
            box-sizing: border-box;
        }
    
        body {
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
        `
    }}
    
`;