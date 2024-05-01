import React, {useEffect} from 'react';
import "./mreyestyle.css"


export const MrEye = () => {

    // глаз
    useEffect(() => {
        let pupils = document.querySelectorAll('.pupil');

        const debounce = (func: (...args: any[]) => void, ms: number) => {
            let callAllowed = true;

            return function (...args: any[]) {
                if (!callAllowed) {
                    return;
                }

                func(...args);

                callAllowed = false;

                setTimeout(() => {
                    callAllowed = true;
                }, ms);
            };
        };

        document.addEventListener('mousemove', debounce((e: MouseEvent) => {
            let x = e.clientX,
                y = e.clientY,
                height = window.innerHeight,
                width = window.innerWidth;

            let deltaX = (x - width / 2) / width,
                deltaY = (y - height / 2) / height;

            pupils.forEach((pupil: any) => {
                pupil.style.transform = `
translateX(${deltaX * 25}px)
translateY(${deltaY * 25}px)`;
            });
        }, 0));
    }, []);


    return (
        <div className="boogie-wrapp">
            <div className="boogie-wrapp-main">
                <div className="boogie-wrapp-head">
                    <div className="eye">
                        <div className="pupil"></div>
                    </div>
                </div>
                <div className="boogie-wrapp-hands">
                    <div className="boogie-wrapp-hands-left">
                        <div className="boogie-wrapp-hands-left-wrapp">
                            <div className="boogie-wrapp-hands-left hands-left hands-left-one"></div>
                            <div className="boogie-wrapp-hands-left hands-left hands-left-two"></div>
                            <div className="boogie-wrapp-hands-left hands-left hands-left-three"></div>
                            <div className="sleeve-left"></div>
                        </div>
                    </div>
                    <div className="boogie-wrapp-hands-right">
                        <div className="boogie-wrapp-hands-right-wrapp">
                            <div className="boogie-wrapp-hands-right hands-right hands-right-one"></div>
                            <div className="boogie-wrapp-hands-right hands-right hands-right-two"></div>
                            <div className="boogie-wrapp-hands-right hands-right hands-right-three"></div>
                            <div className="sleeve-right"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};








