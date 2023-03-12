import { DefaultTheme } from "styled-components";

// 폰트
const fonts = {
    family: {
        base: `'Noto Sans KR', sans-serif`,
        title: `'Noto Sans KR', sans-serif`,
    },
    size: {
        // 디자인 결정되면 그때 변경할 것. 그전에는 base만 사용
        sm: "0.5rem",
        base: "1rem",
        // lg: "2rem",
        // xl: "2.5rem",
        // title: "6rem",
    }
};
export type FontSizeTypes = typeof fonts;


// 색상
const colors = {
    primary: '#79b44d',
    secondary: '#accc95',
    black: "#222222",
};
export type ColorTypes = typeof colors;


// 반응형
const size = {
    mobile: "576px",
    tablet: "768px",
    desktop: "992px",
    desktopLarge: "1200px",
};
const devices = {
    mobile: `@media only screen and (min-width: ${size.mobile})`,
    tablet: `@media only screen and (min-width: ${size.tablet})`,
    desktop: `@media only screen and (min-width: ${size.desktop})`,
    desktopLarge: `@media only screen and (min-width: ${size.desktopLarge})`,
};
export type DevicesTypes = typeof devices;


const theme : DefaultTheme = {
    colors,
    fonts,
    devices,
};
export default theme;