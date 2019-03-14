import * as styleGenerators from "./styleGenerators";
import typographyStyles from "./typographyStyles";
import base from "./styleBase";

const {
    generateMarginStyles,
    generatePaddingStyles,
    generateShadowStyles,
} = styleGenerators;

// Create sizeUnits array
const baseUnit = 8;
const sizeCount = 20;
let sizeUnits = [baseUnit];
for (let i = 0; i < sizeCount; i++) {
    let size = sizeUnits[i] + baseUnit;
    sizeUnits.push(size);
}

const theme = {
    base,
    typography: typographyStyles,
    elevation: {
        ...generateShadowStyles(),
    },
    whitespace: {
        ...generateMarginStyles(sizeUnits),
        ...generatePaddingStyles(sizeUnits),
    },
    utility: {
        hideReadable: {
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
        },
        hide: {
            display: "none !important",
        },
    },
};

export default theme;