import React, {useMemo, useState} from "react";
import {S} from "../../Regex_Styles";

type ParsedRegex = {
    regex: RegExp | null;
    error: string | null;
};

type MatchInfo = {
    value: string;
    index: number;
};

const parseRegex = (source: string, flags: string): ParsedRegex => {
    try {
        return {regex: new RegExp(source, flags), error: null};
    } catch (error) {
        return {
            regex: null,
            error: error instanceof Error ? error.message : "Некорректное выражение"
        };
    }
};

export const RegexTesterDemo = () => {
    const [source, setSource] = useState("\\b\\w{4}\\b");
    const [flags, setFlags] = useState("g");
    const [text, setText] = useState("JavaScript regex demo: test word code");

    const parsed = useMemo(() => parseRegex(source, flags), [source, flags]);

    const matches = useMemo<MatchInfo[]>(() => {
        if (!parsed.regex) {
            return [];
        }

        if (parsed.regex.global) {
            return Array.from(text.matchAll(parsed.regex), (match) => ({
                value: match[0],
                index: match.index ?? -1
            }));
        }

        const singleMatch = parsed.regex.exec(text);
        if (!singleMatch) {
            return [];
        }

        return [{
            value: singleMatch[0],
            index: singleMatch.index
        }];
    }, [parsed.regex, text]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 3: Мини regex-тестер</S.DemoTitle>
            <S.DemoHint>
                Введи `pattern` и `flags` отдельно, как в <S.TableToken>new RegExp(pattern, flags)</S.TableToken>
            </S.DemoHint>
            <S.DemoLabel htmlFor="tester-source">Pattern (без слешей)</S.DemoLabel>
            <S.DemoInput
                id="tester-source"
                value={source}
                onChange={(event) => setSource(event.currentTarget.value)}
            />

            <S.DemoLabel htmlFor="tester-flags">Flags</S.DemoLabel>
            <S.DemoInput
                id="tester-flags"
                value={flags}
                onChange={(event) => setFlags(event.currentTarget.value)}
                placeholder="gim"
            />

            <S.DemoLabel htmlFor="tester-text">Текст для проверки</S.DemoLabel>
            <S.DemoTextarea
                id="tester-text"
                value={text}
                onChange={(event) => setText(event.currentTarget.value)}
            />

            {parsed.error ? (
                <S.DemoBadge $isError={true}>Ошибка: {parsed.error}</S.DemoBadge>
            ) : (
                <S.DemoBadge>
                    Валидно: /{source}/{flags}
                </S.DemoBadge>
            )}

            <S.DemoLabel>Совпадения ({matches.length})</S.DemoLabel>
            <S.DemoOutput>
                {matches.length
                    ? matches.map((item) => `${item.value} (index: ${item.index})`).join("\n")
                    : "Совпадений нет"}
            </S.DemoOutput>
        </S.DemoCard>
    );
};
