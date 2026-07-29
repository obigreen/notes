import React, {useMemo, useState} from "react";
import {S} from "../../Regex_Styles";

export const RegexSanitizeDemo = () => {
    const [value, setValue] = useState("A man, a plan! 2026");

    const cleaned = useMemo(
        () => value.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase(),
        [value]
    );

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 1: Очистка строки для поиска/палиндрома</S.DemoTitle>
            <S.DemoHint>
                Оставляем Unicode-буквы и числовые символы:{" "}
                <S.TableToken>{String.raw`/[^\p{L}\p{N}]/gu`}</S.TableToken>
            </S.DemoHint>
            <S.DemoLabel htmlFor="sanitize-input">Исходная строка</S.DemoLabel>
            <S.DemoTextarea
                id="sanitize-input"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
            />
            <S.DemoLabel>Результат</S.DemoLabel>
            <S.DemoOutput>{cleaned || "(пусто)"}</S.DemoOutput>
        </S.DemoCard>
    );
};
