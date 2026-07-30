import React from 'react';
import {HookUseState} from "./hooksComponents/useState/HookUseState";
import {HookUseRef} from "./hooksComponents/useRef/HookUseRef";
import {TypeTitle} from "../RecordsDirectory_Style";
import {HookReferenceList} from "./HookReferenceList";

export const Hooks = () => {
    return (
        <>
            <TypeTitle>Hooks (Хуки React)</TypeTitle>
            <HookReferenceList/>
            <HookUseState/>
            <HookUseRef/>
        </>
    );
};
