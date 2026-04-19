import React, {useMemo, useState} from "react";
import {
    Marker,
    NoteBlock,
    NoteLi,
    NoteUl,
    ParagraphTitle,
    Text,
    TextP,
    TypeTitle
} from "../RecordsDirectory_Style";
import {JsPopupItem, JsPopupList} from "./JsPopupList";
import {S} from "../regex/Regex_Styles";

type NestedRow = {
    pattern: string;
    read: string;
    write: string;
};

const nestedItems: JsPopupItem[] = [
    {
        highlight: "Object access: dot / bracket",
        content: "Доступ к свойствам объекта через точку и скобки (скобки важны для динамического ключа).",
        isTop: true,
        code: `
const user = {
  id: 1,
  profile: { name: 'Sergey' }
};

console.log(user.id); // 1
console.log(user.profile.name); // Sergey

const key = 'profile';
console.log(user[key].name); // Sergey
`
    },
    {
        highlight: "Array access by index",
        content: "Доступ к элементам массива по индексу и через at().",
        isTop: true,
        code: `
const items = ['html', 'css', 'js'];

console.log(items[0]); // html
console.log(items[items.length - 1]); // js
console.log(items.at(-1)); // js
`
    },
    {
        highlight: "Nested object + array",
        content: "Частый кейс в API: объект внутри объекта + массивы внутри полей.",
        isTop: true,
        code: `
const state = {
  user: {
    profile: {
      contacts: [
        { type: 'email', value: 'sergey@mail.com' },
        { type: 'telegram', value: '@sergey' }
      ]
    }
  }
};

console.log(state.user.profile.contacts[0].value); // sergey@mail.com
`
    },
    {
        highlight: "Optional chaining for nested access",
        content: "Безопасный доступ к глубине, когда часть пути может отсутствовать.",
        isTop: true,
        code: `
const response = {
  data: {
    user: {
      settings: { theme: 'dark' }
    }
  }
};

console.log(response.data?.user?.settings?.theme); // dark
console.log(response.data?.user?.contacts?.[0]?.value); // undefined
`
    },
    {
        highlight: "Destructuring nested fields",
        content: "Извлечение вложенных полей через деструктуризацию с дефолтами.",
        code: `
const payload = {
  user: {
    profile: { name: 'Sergey', city: 'Moscow' }
  }
};

const {
  user: {
    profile: { name, city = 'Unknown' }
  }
} = payload;

console.log(name, city);
`
    },
    {
        highlight: "Immutable nested update",
        content: "Правильное обновление глубоко вложенных структур без мутации исходного объекта.",
        isTop: true,
        code: `
const state = {
  user: {
    settings: {
      notifications: { email: true, sms: false }
    }
  }
};

const nextState = {
  ...state,
  user: {
    ...state.user,
    settings: {
      ...state.user.settings,
      notifications: {
        ...state.user.settings.notifications,
        sms: true
      }
    }
  }
};

console.log(state.user.settings.notifications.sms); // false
console.log(nextState.user.settings.notifications.sms); // true
`
    },
    {
        highlight: "Array of objects lookup",
        content: "Поиск и доступ в массиве объектов через find/findIndex.",
        isTop: true,
        code: `
const users = [
  { id: 1, profile: { name: 'Ann' } },
  { id: 2, profile: { name: 'Bob' } }
];

const user = users.find((item) => item.id === 2);
console.log(user?.profile?.name); // Bob
`
    },
    {
        highlight: "Generic getByPath helper",
        content: "Утилита для доступа к глубине по пути типа user.profile.contacts[0].value.",
        isTop: true,
        code: String.raw`
function getByPath(source, rawPath) {
  const keys = rawPath
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);

  return keys.reduce((acc, key) => acc?.[key], source);
}

const data = {
  user: {
    profile: {
      contacts: [{ value: 'sergey@mail.com' }]
    }
  }
};

console.log(getByPath(data, 'user.profile.contacts[0].value'));
`
    }
];

const nestedRows: NestedRow[] = [
    {
        pattern: "obj.a.b.c",
        read: "Читаем фиксированный путь",
        write: "Хорошо для стабильной структуры"
    },
    {
        pattern: "obj?.a?.b?.c",
        read: "Безопасный доступ при nullable-ветках",
        write: "Убирает падения на undefined/null"
    },
    {
        pattern: "arr[index] / arr.at(-1)",
        read: "Чтение элемента массива",
        write: "at(-1) удобен для последнего"
    },
    {
        pattern: "find(item => item.id === id)",
        read: "Поиск объекта в массиве",
        write: "Лучше, чем ручной цикл для читаемости"
    },
    {
        pattern: "spread на каждом уровне",
        read: "Иммутабельное обновление вложенности",
        write: "Нужно в state-менеджменте"
    }
];

const getByPath = (source: any, rawPath: string) => {
    const keys = rawPath
        .replace(/\[(\d+)\]/g, ".$1")
        .split(".")
        .filter(Boolean);

    return keys.reduce((acc, key) => acc?.[key], source);
};

const NestedPathDemo = () => {
    const [path, setPath] = useState("user.profile.contacts[0].value");

    const data = useMemo(
        () => ({
            user: {
                profile: {
                    name: "Sergey",
                    contacts: [
                        {type: "email", value: "sergey@mail.com"},
                        {type: "telegram", value: "@sergey"}
                    ]
                }
            },
            stats: {
                visits: [10, 20, 35]
            }
        }),
        []
    );

    const value = useMemo(() => getByPath(data, path), [data, path]);

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 1: Доступ к вложенности по path</S.DemoTitle>
            <S.DemoHint>
                Пробуй пути: <S.TableToken>user.profile.name</S.TableToken>,
                <S.TableToken>user.profile.contacts[1].value</S.TableToken>,
                <S.TableToken>stats.visits[2]</S.TableToken>
            </S.DemoHint>
            <S.DemoLabel htmlFor="nested-path">Path</S.DemoLabel>
            <S.DemoInput
                id="nested-path"
                value={path}
                onChange={(event) => setPath(event.currentTarget.value)}
            />
            <S.DemoOutput>{JSON.stringify(value, null, 2) ?? "undefined"}</S.DemoOutput>
        </S.DemoCard>
    );
};

const NestedUpdateDemo = () => {
    const [state, setState] = useState({
        user: {
            settings: {
                notifications: {
                    email: true,
                    sms: false
                }
            }
        }
    });

    const toggleSms = () => {
        setState((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                settings: {
                    ...prev.user.settings,
                    notifications: {
                        ...prev.user.settings.notifications,
                        sms: !prev.user.settings.notifications.sms
                    }
                }
            }
        }));
    };

    return (
        <S.DemoCard>
            <S.DemoTitle>Demo 2: Иммутабельное обновление глубины</S.DemoTitle>
            <S.DemoHint>
                Нажми Toggle и посмотри, как меняется только нужная ветка без мутации исходных уровней.
            </S.DemoHint>
            <button onClick={toggleSms}>Toggle sms</button>
            <S.DemoOutput>{JSON.stringify(state, null, 2)}</S.DemoOutput>
        </S.DemoCard>
    );
};

export const JavaScriptNestedData = () => {
    return (
        <>
            <TypeTitle>Nested Data (Объекты, массивы, вложенности)</TypeTitle>

            <NoteBlock>
                <Text>
                    <TextP>
                        Это ключевая категория для практики JavaScript: в реальных задачах данные почти всегда
                        <Marker> вложенные</Marker>.
                        Нужно уметь: читать глубину, безопасно обходить nullable-ветки и обновлять глубину без мутаций.
                    </TextP>
                    <NoteUl>
                        <NoteLi>
                            Для чтения глубины: <Marker>optional chaining</Marker> и аккуратные path-проверки.
                        </NoteLi>
                        <NoteLi>
                            Для поиска в массивах объектов: <Marker>find / findIndex</Marker>.
                        </NoteLi>
                        <NoteLi>
                            Для обновления в state: <Marker>spread на каждом уровне</Marker>.
                        </NoteLi>
                    </NoteUl>
                </Text>
            </NoteBlock>

            <JsPopupList
                title="Nested Patterns (Кликни по паттерну)"
                description="Как доставать и обновлять вложенные данные в объекте/массиве без ошибок."
                items={nestedItems}
            />

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Таблица: Как Достучаться До Вложенности</ParagraphTitle>
                    <S.TableWrap>
                        <S.NoteTable>
                            <thead>
                            <tr>
                                <S.TableHeadCell>Паттерн</S.TableHeadCell>
                                <S.TableHeadCell>Чтение</S.TableHeadCell>
                                <S.TableHeadCell>Когда применять</S.TableHeadCell>
                            </tr>
                            </thead>
                            <tbody>
                            {nestedRows.map((row) => (
                                <tr key={row.pattern}>
                                    <S.TableCell><S.TableToken>{row.pattern}</S.TableToken></S.TableCell>
                                    <S.TableCell>{row.read}</S.TableCell>
                                    <S.TableCell>{row.write}</S.TableCell>
                                </tr>
                            ))}
                            </tbody>
                        </S.NoteTable>
                    </S.TableWrap>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Практика: Вложенности В Действии</ParagraphTitle>
                    <S.DemoGrid>
                        <NestedPathDemo/>
                        <NestedUpdateDemo/>
                    </S.DemoGrid>
                </Text>
            </NoteBlock>
        </>
    );
};
