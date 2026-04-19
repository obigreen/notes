import React, {useEffect, useRef, useState} from "react";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import {NoteBlock, NotesTitle, Text, TextP} from "../RecordsDirectory_Style";
import {S as EventS} from "../events/Event_Styles";

export type JsPopupItem = {
    highlight: string;
    content: string;
    code: string;
    isTop?: boolean;
};

type JsPopupListProps = {
    title: string;
    description?: string;
    items: JsPopupItem[];
};

export const JsPopupList = ({title, description, items}: JsPopupListProps) => {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <NotesTitle>{title}</NotesTitle>
            <Text>
                {description && <TextP>{description}</TextP>}
                <EventS.List>
                    {items.map((item) => (
                        <EventS.Item key={item.highlight}>
                            <EventS.HighlightedText
                                $isTop={item.isTop}
                                onClick={() => setSelectedCode(item.code)}
                            >
                                {item.highlight}
                            </EventS.HighlightedText>: {item.content}
                        </EventS.Item>
                    ))}
                </EventS.List>
            </Text>

            {selectedCode && (
                <EventS.Overlay onClick={() => setSelectedCode(null)}>
                    <EventS.PopupWrapper onClick={(event) => event.stopPropagation()}>
                        <pre>
                            <code ref={codeRef} className="javascript">
                                {selectedCode.trim()}
                            </code>
                        </pre>
                    </EventS.PopupWrapper>
                </EventS.Overlay>
            )}
        </NoteBlock>
    );
};
