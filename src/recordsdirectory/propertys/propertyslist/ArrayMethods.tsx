import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, NotesTitle, Text} from '../../RecordsDirectory_Style';

import {S} from '../Property_Styles'

type MethodProps = {
    arrayItems?: Array<{
        highlight: string;
        content: string;
        code: string;
    }>;
};


export const propertys = [

    {
        highlight: ".length",
        content: "Возвращает длину строки или количество элементов в массиве.",
        code: `
    // Пример 1: Длина строки
    let greeting = 'Здравствуй, мир!';
    console.log(greeting.length); // 14
    
    // Пример 2: Количество элементов в массиве
    let fruits = ['Яблоко', 'Банан', 'Груша'];
    console.log(fruits.length); // 3
    
    // Пример 3: Длина пустой строки
    let emptyString = '';
    console.log(emptyString.length); // 0
        `
    },

    {
        highlight: ".prototype",
        content: "Позволяет добавлять новые свойства и методы к конструкторам объектов.",
        code: `
    // Пример 1: Добавление метода к конструктору
    function Person(name) {
      this.name = name;
    }
    Person.prototype.greet = function() {
      console.log('Привет, ' + this.name);
    };
    let person = new Person('Анна');
    person.greet(); // Привет, Анна
    
    // Пример 2: Добавление свойства через prototype
    function Animal(name) {
      this.name = name;
    }
    Animal.prototype.numberOfLegs = 4;
    let dog = new Animal('Собака');
    console.log(dog.numberOfLegs); // 4
    
    // Пример 3: Расширение встроенных объектов
    String.prototype.sayHello = function() {
      return 'Привет, ' + this + '!';
    };
    console.log('мир'.sayHello()); // Привет, мир!
        `
    },
    {
        highlight: ".constructor",
        content: "Содержит функцию-конструктор для создания объекта.",
        code: `
    // Пример 1: Получение конструктора объекта
    let numbers = [1, 2, 3];
    console.log(numbers.constructor === Array); // true
    
    // Пример 2: Создание экземпляра через constructor
    let original = new Date();
    let copy = new original.constructor();
    console.log(copy instanceof Date); // true
    
    // Пример 3: Использование constructor для проверки типа
    function isInstanceOfArray(obj) {
      return obj.constructor === Array;
    }
    console.log(isInstanceOfArray([1, 2, 3])); // true
    console.log(isInstanceOfArray({key: 'value'})); // false
        `
    },
    {
        highlight: ".innerHTML",
        content: "Получает или задает HTML-содержимое элемента.",
        code: `
    // Пример 1: Получение HTML-содержимого
    let div = document.createElement('div');
    div.innerHTML = '<p>Это параграф.</p>';
    console.log(div.innerHTML); // <p>Это параграф.</p>
    
    // Пример 2: Изменение HTML-содержимого
    let container = document.createElement('div');
    container.innerHTML = '<p>Старое содержимое</p>';
    container.innerHTML = '<p>Новое содержимое</p>';
    console.log(container.innerHTML); // <p>Новое содержимое</p>
    
    // Пример 3: Добавление HTML-элементов
    let list = document.createElement('ul');
    list.innerHTML += '<li>Первый элемент</li>';
    list.innerHTML += '<li>Второй элемент</li>';
    document.body.appendChild(list);
        `
    },

    {
        highlight: ".value",
        content: "Используется для получения или установки значения элементов формы.",
        code: `
    // Пример 1: Получение значения input
    let input = document.createElement('input');
    input.type = 'text';
    input.value = 'Привет';
    console.log(input.value); // Привет
    
    // Пример 2: Изменение значения
    input.value = 'Новое приветствие';
    console.log(input.value); // Новое приветствие
    
    // Пример 3: Использование значения из формы
    input.addEventListener('change', function() {
      console.log('Новое значение: ', this.value); // Выводит новое значение при его изменении
    });
    document.body.appendChild(input);
        `
    },
    {
        highlight: ".src",
        content: "Получает или устанавливает значение атрибута src для элементов, таких как img или script.",
        code: `
    // Пример 1: Установка пути к изображению
    let image = document.createElement('img');
    image.src = 'image-path.jpg';
    console.log(image.src); // image-path.jpg
    
    // Пример 2: Смена источника изображения
    image.src = 'another-image-path.jpg';
    console.log(image.src); // another-image-path.jpg
    
    // Пример 3: Загрузка скрипта
    let script = document.createElement('script');
    script.src = 'script.js';
    document.head.appendChild(script);
        `
    },
    {
        highlight: ".style",
        content: "Позволяет получить или установить стиль элемента CSS.",
        code: `
    // Пример 1: Изменение цвета фона
    let box = document.createElement('div');
    box.style.backgroundColor = 'blue';
    
    // Пример 2: Установка ширины и высоты
    box.style.width = '100px';
    box.style.height = '100px';
    
    // Пример 3: Добавление нескольких стилей сразу
    box.style.cssText = 'border: 1px solid black; padding: 10px;';
    `
    },
    {
        highlight: ".href",
        content: "Получает или устанавливает значение атрибута href для ссылок.",
        code: `
    // Пример 1: Установка атрибута href у ссылки
    let link = document.createElement('a');
    link.href = 'http://example.com';
    console.log(link.href); // http://example.com
    
    // Пример 2: Изменение атрибута href
    link.href = 'http://example.org';
    console.log(link.href); // http://example.org
    
    // Пример 3: Получение атрибута href
    let currentHref = link.getAttribute('href');
    console.log(currentHref); // http://example.org
    `
    },
    {
        highlight: ".classList",
        content: "Позволяет работать с классами элемента. Добавлять, удалять и проверять наличие.",
        code: `
    // Пример 1: Добавление класса
    let button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    
    // Пример 2: Удаление класса
    button.classList.remove('btn-primary');
    
    // Пример 3: Переключение класса
    button.classList.toggle('btn-active');
    `
    },
    {
        highlight: ".parentNode",
        content: "Возвращает родительский узел элемента.",
        code: `
    // Пример 1: Получение родителя элемента
    let child = document.createElement('span');
    let parent = document.createElement('div');
    parent.appendChild(child);
    console.log(child.parentNode === parent); // true
    
    // Пример 2: Удаление элемента через его родителя
    parent.removeChild(child);
    
    // Пример 3: Использование parentNode для вставки элемента перед другим элементом
    let sibling = document.createElement('p');
    parent.appendChild(sibling);
    parent.insertBefore(child, sibling);
    `
    },
    {
        highlight: ".children",
        content: "Возвращает коллекцию дочерних элементов.",
        code: `
    // Пример 1: Получение дочерних элементов
    let itemList = document.createElement('ul');
    itemList.innerHTML = '<li>Первый элемент</li><li>Второй элемент</li>';
    console.log(itemList.children.length); // 2
    
    // Пример 2: Доступ к определенному дочернему элементу
    let firstChild = itemList.children[0];
    console.log(firstChild.innerHTML); // Первый элемент
    
    // Пример 3: Перебор всех дочерних элементов
    Array.from(itemList.children).forEach(child => {
      console.log(child.innerHTML);
    });
    `
    },
    {
        highlight: ".attributes",
        content: "Позволяет получить доступ ко всем атрибутам элемента.",
        code: `
    // Пример 1: Получение всех атрибутов элемента
    let inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', 'Введите имя');
    console.log(inputField.attributes.length); // 2
    
    // Пример 2: Доступ к конкретному атрибуту
    let typeAttribute = inputField.attributes.getNamedItem('type');
    console.log(typeAttribute.value); // text
    
    // Пример 3: Удаление атрибута
    inputField.removeAttribute('placeholder');
    `
    }
];


export const ArrayMethods: React.FC<MethodProps> = ({arrayItems = []}) => {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <NotesTitle>Method Array</NotesTitle>
            <Text>
                <S.List>
                    {propertys.map((item, index) => (
                        <S.Item key={index}>
                            <S.HighlightedText
                                onClick={() => item.code && setSelectedCode(item.code)}>
                                {item.highlight}
                            </S.HighlightedText>: {item.content}
                        </S.Item>
                    ))}
                </S.List>
            </Text>
            {selectedCode && (
                <S.Overlay onClick={() => setSelectedCode(null)}>
                    <S.PopupWrapper>
                        <pre>
                            <code ref={codeRef} className="javascript">
                                {selectedCode.trim()}
                            </code>
                        </pre>
                    </S.PopupWrapper>
                </S.Overlay>
            )}
        </NoteBlock>
    );
};



