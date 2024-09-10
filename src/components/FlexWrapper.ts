import styled from "styled-components";

type FlexWrapperPropsType = {
    justify?: string
    direction?: string
    align?: string
    wrap?: string
    gap?: string
    padding?: string
    margin?: string
    position?: string
    background?: string
    height?: string
    border?: string
}

export const FlexWrapper = styled.div<FlexWrapperPropsType>`
    display: flex;
    justify-content: ${props => props.justify || "row"};
    flex-direction: ${props => props.direction || "flex-start"};
    align-items: ${props => props.align || "stretch"};
    flex-wrap: ${props => props.wrap || "nowrap"};
    gap: ${props => props.gap};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    position: ${props => props.position};
    background-color: ${props => props.background || 'transparent'};
    height:${props => props.height};
    border-radius: ${props => props.border};
`