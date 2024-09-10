import React, {useEffect, useState} from 'react';
import CloseWords from "../../accets/img/english/forenglish.png";
import styled from "styled-components";

export const WrappUse = () => {

    //закрывашка
    const [isRectangleVisible, setIsRectangleVisible] = useState(false);
    const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        if (isRectangleVisible) {
            const handleMouseMovement = (event: MouseEvent) => {
                setCursorPosition({
                    x: event.clientX - 250,
                    y: event.clientY - 30
                });
            };

            window.addEventListener('mousemove', handleMouseMovement);

            return () => {
                window.removeEventListener('mousemove', handleMouseMovement);
            };
        }
    }, [isRectangleVisible]);

    useEffect(() => {
        const handleWindowClick = (event: MouseEvent) => {
            if (event.target === event.currentTarget) {
                setIsRectangleVisible(false);
            }
        };

        window.addEventListener('click', handleWindowClick);
        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, []);

    const handleToggleRectangle = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setIsRectangleVisible(!isRectangleVisible);
    };

    useEffect(() => {
    }, [isRectangleVisible]);

    useEffect(() => {
        const handleWindowClick = () => {
            if (isRectangleVisible) {
                setIsRectangleVisible(false);
            }
        };

        window.addEventListener('click', handleWindowClick);

        return () => {
            window.removeEventListener('click', handleWindowClick);
        };
    }, [isRectangleVisible]);
    return (
        <>
            <WrappUseButton onClick={handleToggleRectangle}>
                <ButtonUse>
                    <img src={CloseWords} alt="CloseWords"/>
                </ButtonUse>
            </WrappUseButton>

            {isRectangleVisible && (
                <Rectangle
                    style={{
                        left: cursorPosition.x,
                        top: cursorPosition.y,
                        height: `calc(100vh - ${cursorPosition.y}px)`
                    }}
                />
            )}
        </>
    );
};

const WrappUseButton = styled.div`
    position: fixed;
    width: 40px;
    height: auto;
    top: 15px;
    right: 15px;
    z-index: 999;
`
const ButtonUse = styled.button`
    display: flex;
    background: transparent;
    border: none;
    cursor: pointer;

    img {
        width: 40px;
        height: auto;

    }
`

const Rectangle = styled.div`
    position: fixed;
    z-index: 99999;
    width: 500px;
    border-radius: 12px 12px 0 0;
    background-image: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
`;
