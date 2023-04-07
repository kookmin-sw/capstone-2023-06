import "styled-components";
import { ColorsTypes, FontSizeTypes, DevicesTypes, ZIndexTypes } from "./theme";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: ColorsTypes;
        fonts: FontSizeTypes;
        devices: DevicesTypes;
        zIndex: ZIndexTypes;
    }
}