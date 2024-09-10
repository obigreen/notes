import {theme} from "./Theme";

type FontPropsStyle = {
    famaly?: string
    weight?: number
    lineHeight?: number
    color?: string

    minW: number
    maxW: number
}

export const font = ({famaly, weight, color, lineHeight, minW, maxW}: FontPropsStyle) => `
font-famaly: ${famaly || "Poppins"};
font-weight: ${weight || 400};
line-height: ${lineHeight || 1.2};
color: ${color || theme.color.backround};
font-size: calc( (100vw - 360px)/(1440 - 360) * (${maxW} - ${minW}) + ${minW}px);
`