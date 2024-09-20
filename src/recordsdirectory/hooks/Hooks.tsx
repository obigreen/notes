import React from 'react';
import {HookUseState} from "./hooksComponents/useState/HookUseState";
import {HookUseRef} from "./hooksComponents/useRef/HookUseRef";
import {TypeTitle} from "../RecordsDirectory_Style";

export const Hooks = () => {
    return (
        <>
            <TypeTitle>Hooks</TypeTitle>
           <HookUseState/>
            <HookUseRef/>
        </>
    );
};

