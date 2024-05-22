import React from 'react';
import {HookUseState} from "./hooksComponents/useState/HookUseState";
import {HookUseRef} from "./hooksComponents/useRef/HookUseRef";

export const Hooks = () => {
    return (
        <>
           <HookUseState/>
            <HookUseRef/>
        </>
    );
};

