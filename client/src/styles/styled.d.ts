import "styled-components";
import { ColorsTypes, FontSizeTypes, DevicesTypes } from "./theme";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: ColorsTypes;
        fonts: FontSizeTypes;
        devices: DevicesTypes;
    }
}