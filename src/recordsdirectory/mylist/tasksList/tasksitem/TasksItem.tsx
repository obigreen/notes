import React from "react";
import {S} from '../../MyList_Style'

interface AiItemProps {
    image: string;
    title: string;
    link: string;
    description: string;
}

export const TasksItem = ({ image, title, link, description }: AiItemProps) => (
    <S.AiWrapper>
        <S.ImageContainer>
            <S.Image src={image} alt={title} />
        </S.ImageContainer>
        <S.TextBlock>
            <S.Title>{title}</S.Title>
            <S.LinkWrapp>
                <S.Link target={'_blank'} href={link}>{link}</S.Link>
            </S.LinkWrapp>
            <S.Description>{description}</S.Description>
        </S.TextBlock>
    </S.AiWrapper>
);
