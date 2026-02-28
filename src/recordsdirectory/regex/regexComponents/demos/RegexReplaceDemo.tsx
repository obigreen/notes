import React, {useMemo, useState} from "react";
import {S} from "../../Regex_Styles";

type ReplacePreset = {
    id: string;
    name: string;
    regex: RegExp;
    replacement: string;
    note: string;
};

const replacePresets: ReplacePreset[] = [
    {
        id: "spaces",
        name: "Сжать пробелы",
        regex: /\s+/g,
        replacement: " ",
        note: "Полезно для нормализации пользовательского ввода."
    },
    {
        id: "digits",
        name: "Скрыть цифры",
        regex: /\d/g,
        replacement: "#",
        note: "Пример маскирования ID/номеров."
    },
    {
        id: "tags",
        name: "Убрать HTML-теги",
        regex: /<\/?[^>]+>/g,
        replacement: "",
        note: "Учебный вариант очистки html-строки."
    },
    {
        id: "not-letters",
        name: "Оставить только буквы",
        regex: /[^a-zа-я]/gi,
        replacement: "",
        note: "Быстрая фильтрация для поиска по словам."
    }
];

export const RegexReplaceDemo = () => {
    const [presetId, setPresetId] = useState(replacePresets[0].id);
    const [text, setText] = useState("Hello    world\n<script>alert(1)</script> 2026");

    const preset = useMemo(
        () => replacePresets.find((item) => item.id === presetId) || replacePresets[0],
        [presetId]
    );

    const result = useMemo(
        () => text.replace(preset.regex, preset.replacement),
        [text, preset]
    );

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 2: replace() + regex</S.DemoTitle>
            <S.DemoLabel htmlFor="replace-preset">Выбери шаблон</S.DemoLabel>
            <S.DemoSelect
                id="replace-preset"
                value={presetId}
                onChange={(event) => setPresetId(event.currentTarget.value)}
            >
                {replacePresets.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </S.DemoSelect>
            <S.DemoHint>
                Текущее выражение: <S.TableToken>{preset.regex.toString()}</S.TableToken>
            </S.DemoHint>
            <S.DemoHint>{preset.note}</S.DemoHint>
            <S.DemoLabel htmlFor="replace-input">Исходный текст</S.DemoLabel>
            <S.DemoTextarea
                id="replace-input"
                value={text}
                onChange={(event) => setText(event.currentTarget.value)}
            />
            <S.DemoLabel>Результат replace</S.DemoLabel>
            <S.DemoOutput>{result || "(пусто)"}</S.DemoOutput>
        </S.DemoCard>
    );
};
