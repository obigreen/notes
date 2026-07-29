import React, {useState, useRef, useEffect} from "react";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import {NoteBlock, Text} from '../../RecordsDirectory_Style';

import {S} from '../Property_Styles'

type PropertyItem = {
    highlight: string;
    content: string;
    code: string;
    isTop?: boolean;
};

export const propertys: PropertyItem[] = [

    {
        highlight: ".length",
        content: "Для строки возвращает число UTF-16 code units; для массива — длину по индексным позициям, включая пустые слоты; для функции — число формальных параметров до первого default-параметра, без rest.",
        isTop: true,
        code: `
    // Примеры для .length

    // 1) Длина строки
    const greeting = 'Здравствуй, мир!';
    console.log(greeting.length); // 16

    // 2) Количество элементов в массиве
    const fruits = ['Яблоко', 'Банан', 'Груша'];
    console.log(fruits.length); // 3

    // 3) Последний элемент массива
    const lastFruit = fruits[fruits.length - 1];
    console.log(lastFruit); // 'Груша'

    // 4) Реальный кейс: ограничение ввода по длине
    const userName = 'Sergey';
    if (userName.length >= 3) {
      console.log('Имя валидно');
    }

    // 5) Function.length — параметры до первого default/rest, не аргументы вызова
    function request(url, options = {}, ...middlewares) {}
    console.log(request.length); // 1

    // Строковая length считает UTF-16 code units, а не видимые символы
    console.log('👍'.length); // 2
        `
    },

    {
        highlight: ".current",
        content: "Содержит текущее значение ref (часто используется с useRef в React).",
        isTop: true,
        code: `
    // Пример свойства .current в React
    import React, { useRef, useEffect } from 'react';

    function SearchInput() {
      const inputRef = useRef<HTMLInputElement | null>(null);

      useEffect(() => {
        // После монтирования .current содержит DOM-элемент input
        inputRef.current?.focus();
      }, []);

      const clear = () => {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      };

      return (
        <div>
          <input ref={inputRef} placeholder='Поиск...' />
          <button onClick={clear}>Очистить</button>
        </div>
      );
    }

    // Важно: изменение ref.current НЕ вызывает ререндер.
        `
    },

    {
        highlight: ".prototype",
        content: "Позволяет добавлять свойства и методы в прототип функции-конструктора.",
        code: `
    // 1) Добавление метода в prototype
    function Person(name) {
      this.name = name;
    }

    Person.prototype.greet = function () {
      return 'Привет, ' + this.name;
    };

    const p = new Person('Анна');
    console.log(p.greet()); // 'Привет, Анна'

    // 2) Общее свойство для всех экземпляров
    Person.prototype.role = 'student';
    console.log(p.role); // 'student'

    // 3) Практика: если метод общий, лучше класть в prototype,
    // а не создавать функцию заново в каждом объекте.
        `
    },

    {
        highlight: ".constructor",
        content: "Обычно наследуется из prototype и указывает на связанную функцию; свойство изменяемо и не доказывает, кто фактически создал объект.",
        code: `
    // 1) Проверка конструктора
    const numbers = [1, 2, 3];
    console.log(numbers.constructor === Array); // true

    // 2) Создание копии через constructor
    const originalDate = new Date();
    const copyDate = new originalDate.constructor(originalDate.getTime());
    console.log(copyDate instanceof Date); // true

    // 3) Осторожно: constructor можно переопределить,
    // поэтому для точных проверок часто используют Array.isArray и instanceof.
        `
    },

    {
        highlight: ".innerHTML",
        content: "Получает или задает HTML-содержимое элемента.",
        isTop: true,
        code: `
    // 1) innerHTML подходит для статичного доверенного шаблона
    const card = document.createElement('div');
    card.innerHTML = '<h3>Заголовок</h3><p>Описание</p>';
    console.log(card.innerHTML);

    // 2) Полная перезапись содержимого
    card.innerHTML = '<button>Купить</button>';

    // 3) Данные из API/пользовательский текст создаём безопасными DOM-операциями
    const users = ['Ann', 'Bob', 'Kate'];
    const list = document.createElement('ul');
    users.forEach((user) => {
      const item = document.createElement('li');
      item.textContent = user;
      list.appendChild(item);
    });
    document.body.appendChild(list);

    // Важно: innerHTML с непроверенными данными создаёт XSS-риск.
    // Операция element.innerHTML += ... ещё и пересоздаёт дочерние DOM-узлы.
        `
    },

    {
        highlight: ".textContent",
        content: "Получает или задает текстовое содержимое без HTML-разметки.",
        isTop: true,
        code: `
    // 1) Установка текста
    const title = document.createElement('h2');
    title.textContent = 'Новости';

    // 2) textContent трактует разметку как обычный текст
    const msg = document.createElement('p');
    msg.textContent = '<b>Не жирный текст</b>';
    console.log(msg.textContent); // '<b>Не жирный текст</b>'

    // 3) Реальный кейс: безопасный вывод пользовательского ввода
    const userInput = '<script>alert(1)</script>';
    const output = document.createElement('div');
    output.textContent = userInput;
    document.body.appendChild(output);
        `
    },

    {
        highlight: ".value",
        content: "Используется для чтения/записи значения элементов формы.",
        isTop: true,
        code: `
    // 1) Input value
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'Привет';
    console.log(input.value); // 'Привет'

    // 2) Изменение значения
    input.value = 'Новое значение';

    // 3) Textarea value
    const textarea = document.createElement('textarea');
    textarea.value = 'Комментарий';

    // 4) Реальный кейс: валидация формы
    function validateEmail(emailInput) {
      const email = emailInput.value.trim();
      return email.includes('@') && email.includes('.');
    }
        `
    },

    {
        highlight: ".selectedIndex",
        content: "Текущий индекс выбранного option в select (или -1, если ничего не выбрано).",
        isTop: true,
        code: `
    const select = document.createElement('select');
    select.innerHTML = '<option>ru</option><option>en</option><option>de</option>';
    select.selectedIndex = 1;

    console.log(select.value); // 'en'
    console.log(select.selectedIndex); // 1

    // Реальный кейс: синхронизация языка интерфейса
    select.addEventListener('change', () => {
      const locale = select.value;
      document.documentElement.lang = locale;
    });
        `
    },

    {
        highlight: ".files",
        content: "Список выбранных файлов у input[type=file]. Используется для валидации и загрузки.",
        isTop: true,
        code: `
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;

    fileInput.addEventListener('change', () => {
      const files = fileInput.files; // FileList
      if (!files?.length) return;

      // 1) Базовая проверка размеров
      const tooBig = Array.from(files).find((file) => file.size > 5 * 1024 * 1024);
      if (tooBig) {
        console.log('Файл слишком большой:', tooBig.name);
        return;
      }

      // 2) Формирование FormData для отправки
      const formData = new FormData();
      Array.from(files).forEach((file) => formData.append('files', file));
      console.log('Готово к upload');
    });
        `
    },

    {
        highlight: ".checked",
        content: "Показывает состояние checkbox/radio: отмечен или нет.",
        isTop: true,
        code: `
    // 1) Проверка checkbox
    const agree = document.createElement('input');
    agree.type = 'checkbox';
    agree.checked = true;
    console.log(agree.checked); // true

    // 2) Toggle по клику
    agree.addEventListener('change', () => {
      console.log('Состояние:', agree.checked);
    });

    // 3) Реальный кейс: блокировать submit, пока не принято соглашение
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Отправить';
    submitBtn.disabled = !agree.checked;

    agree.addEventListener('change', () => {
      submitBtn.disabled = !agree.checked;
    });
        `
    },

    {
        highlight: ".disabled",
        content: "Отключает интерактивность элементов формы (button/input/select).",
        isTop: true,
        code: `
    // 1) Отключение кнопки
    const btn = document.createElement('button');
    btn.textContent = 'Сохранить';
    btn.disabled = true;

    // 2) Включение обратно
    btn.disabled = false;

    // 3) Отключение инпута
    const phone = document.createElement('input');
    phone.disabled = true;

    // 4) Реальный кейс: запретить повторную отправку формы
    async function handleSubmit() {
      btn.disabled = true;
      try {
        // await api.save(...)
      } finally {
        btn.disabled = false;
      }
    }
        `
    },

    {
        highlight: ".src",
        content: "Получает или устанавливает путь к ресурсу (img, script, iframe).",
        isTop: true,
        code: `
    // 1) Установка изображения
    const image = document.createElement('img');
    image.src = '/assets/banner.jpg';

    // 2) Смена источника изображения
    image.src = '/assets/banner-2.jpg';

    // 3) Подключение скрипта
    const script = document.createElement('script');
    script.src = '/widgets/chat.js';
    document.head.appendChild(script);

    // 4) Реальный кейс: fallback если картинка не загрузилась
    image.onerror = () => {
      image.onerror = null; // предотвращает цикл, если placeholder тоже недоступен
      image.src = '/assets/placeholder.png';
    };
        `
    },

    {
        highlight: ".href",
        content: "Получает или устанавливает адрес ссылки.",
        code: `
    // 1) Создание ссылки
    const link = document.createElement('a');
    link.href = 'https://example.com';
    link.textContent = 'Открыть сайт';

    // 2) Чтение href
    console.log(link.href);

    // 3) Реальный кейс: добавить UTM-метку
    const url = new URL(link.href);
    url.searchParams.set('utm_source', 'notes_app');
    link.href = url.toString();
    console.log(link.href);
        `
    },

    {
        highlight: ".style",
        content: "Позволяет читать/изменять inline-стили элемента.",
        isTop: true,
        code: `
    // 1) Базовые стили
    const box = document.createElement('div');
    box.style.backgroundColor = 'royalblue';
    box.style.width = '120px';
    box.style.height = '60px';

    // 2) Пакетно добавляем стили, не стирая уже заданные declarations
    Object.assign(box.style, {
      borderRadius: '12px',
      color: 'white',
      padding: '10px'
    });

    // Присваивание box.style.cssText = '...' заменило бы весь inline-style.

    // 3) Чтение стиля
    console.log(box.style.width); // '120px'

    // 4) Реальный кейс: показать/скрыть блок
    const panel = document.createElement('div');
    panel.style.display = 'none';

    function togglePanel(isOpen) {
      panel.style.display = isOpen ? 'block' : 'none';
    }
        `
    },

    {
        highlight: ".classList",
        content: "Добавляет, удаляет, проверяет и переключает CSS-классы.",
        isTop: true,
        code: `
    // 1) Добавление класса
    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-primary');

    // 2) Удаление
    button.classList.remove('btn-primary');

    // 3) Переключение
    button.classList.toggle('is-active');

    // 4) Проверка
    console.log(button.classList.contains('btn')); // true

    // 5) Реальный кейс: подсветка выбранного пункта меню
    function selectTab(tab) {
      document.querySelectorAll('.tab').forEach(el => el.classList.remove('tab--active'));
      tab.classList.add('tab--active');
    }
        `
    },

    {
        highlight: ".id",
        content: "Идентификатор элемента (должен быть уникальным в документе).",
        isTop: true,
        code: `
    // 1) Установка id
    const section = document.createElement('section');
    section.id = 'profile';

    // 2) Поиск по id
    document.body.appendChild(section);
    const found = document.getElementById('profile');
    console.log(found === section); // true

    // 3) Реальный кейс: якорная навигация
    const link = document.createElement('a');
    link.href = '#profile';
    link.textContent = 'К профилю';
        `
    },

    {
        highlight: ".className",
        content: "Строка со всеми классами элемента (альтернатива classList).",
        code: `
    // 1) Назначение нескольких классов сразу
    const card = document.createElement('div');
    card.className = 'card card--shadow card--padded';

    // 2) Перезапись className
    card.className = 'card card--compact';

    // 3) Получение
    console.log(card.className); // 'card card--compact'

    // На практике чаще удобнее classList, когда надо добавлять/удалять точечно.
        `
    },

    {
        highlight: ".dataset",
        content: "Доступ к data-атрибутам элемента через объект dataset.",
        isTop: true,
        code: `
    // 1) Запись data-* атрибутов
    const item = document.createElement('div');
    item.dataset.userId = '42';
    item.dataset.role = 'admin';

    // 2) Чтение
    console.log(item.dataset.userId); // '42'

    // 3) То же значение через getAttribute
    console.log(item.getAttribute('data-user-id')); // '42'

    // 4) Реальный кейс: делегирование кликов по карточкам
    function onCardClick(event) {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest('[data-user-id]');
      if (!target) return;
      console.log('Открываем пользователя:', target.dataset.userId);
    }
        `
    },

    {
        highlight: ".parentNode",
        content: "Возвращает родительский узел элемента.",
        code: `
    // 1) Получение родителя
    const child = document.createElement('span');
    const parent = document.createElement('div');
    parent.appendChild(child);

    console.log(child.parentNode === parent); // true

    // 2) Удаление через родителя
    parent.removeChild(child);

    // 3) Реальный кейс: удалить текущий элемент списка
    const li = document.createElement('li');
    li.textContent = 'Задача';
    const ul = document.createElement('ul');
    ul.appendChild(li);
    li.parentNode?.removeChild(li);
        `
    },

    {
        highlight: ".children",
        content: "Коллекция дочерних HTML-элементов без текстовых узлов.",
        isTop: true,
        code: `
    // 1) Получение дочерних элементов
    const list = document.createElement('ul');
    list.innerHTML = '<li>Первый</li><li>Второй</li><li>Третий</li>';

    console.log(list.children.length); // 3
    console.log(list.children[0].textContent); // 'Первый'

    // 2) Преобразование в массив для map/filter
    const labels = Array.from(list.children).map((el) => el.textContent);
    console.log(labels); // ['Первый', 'Второй', 'Третий']

    // 3) Реальный кейс: пронумеровать пункты меню
    Array.from(list.children).forEach((el, index) => {
      el.setAttribute('data-index', String(index + 1));
    });
        `
    },

    {
        highlight: ".firstElementChild",
        content: "Возвращает первый дочерний HTML-элемент или null.",
        code: `
    const container = document.createElement('div');
    container.innerHTML = '<p>Первый</p><p>Второй</p>';

    const first = container.firstElementChild;
    console.log(first?.textContent); // 'Первый'

    // Реальный кейс: добавить класс первому элементу
    first?.classList.add('is-first');
        `
    },

    {
        highlight: ".lastElementChild",
        content: "Возвращает последний дочерний HTML-элемент или null.",
        code: `
    const container = document.createElement('div');
    container.innerHTML = '<p>Первый</p><p>Второй</p>';

    const last = container.lastElementChild;
    console.log(last?.textContent); // 'Второй'

    // Реальный кейс: выделить последний добавленный элемент
    last?.classList.add('is-last');
        `
    },

    {
        highlight: ".nextElementSibling",
        content: "Возвращает следующий соседний HTML-элемент или null.",
        code: `
    const wrap = document.createElement('div');
    wrap.innerHTML = '<span id="a">A</span><span id="b">B</span><span id="c">C</span>';

    const a = wrap.querySelector('#a');
    const next = a?.nextElementSibling;
    console.log(next?.id); // 'b'

    // Реальный кейс: перейти к следующему шагу в wizard
    next?.classList.add('step--active');
        `
    },

    {
        highlight: ".previousElementSibling",
        content: "Возвращает предыдущий соседний HTML-элемент или null.",
        code: `
    const wrap = document.createElement('div');
    wrap.innerHTML = '<span id="a">A</span><span id="b">B</span><span id="c">C</span>';

    const c = wrap.querySelector('#c');
    const prev = c?.previousElementSibling;
    console.log(prev?.id); // 'b'

    // Реальный кейс: вернуться к прошлому шагу
    prev?.classList.add('step--active');
        `
    },

    {
        highlight: ".attributes",
        content: "Возвращает коллекцию всех атрибутов элемента.",
        code: `
    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', 'Введите имя');
    inputField.setAttribute('data-track', 'name-input');

    console.log(inputField.attributes.length); // 3

    const typeAttribute = inputField.attributes.getNamedItem('type');
    console.log(typeAttribute?.value); // 'text'

    // Реальный кейс: вывести все атрибуты элемента
    Array.from(inputField.attributes).forEach((attr) => {
      console.log(attr.name + ': ' + attr.value);
    });
        `
    },

    {
        highlight: ".clientWidth",
        content: "Внутренняя ширина элемента: content + padding, без border, margin и вертикальной полосы прокрутки.",
        code: `
    const box = document.createElement('div');
    box.style.width = '200px';
    box.style.padding = '20px';
    box.style.boxSizing = 'content-box';
    document.body.appendChild(box);

    console.log(box.clientWidth); // примерно 240 (зависит от браузера/стилей)

    // Реальный кейс: адаптация компонента по ширине контейнера
    if (box.clientWidth < 400) {
      box.classList.add('layout-mobile');
    }
        `
    },

    {
        highlight: ".clientHeight",
        content: "Внутренняя высота элемента: content + padding, без border, margin и горизонтальной полосы прокрутки.",
        code: `
    const panel = document.createElement('div');
    panel.style.height = '220px';
    panel.style.padding = '20px';
    panel.style.overflow = 'auto';
    panel.innerHTML = '<div style="height: 1200px"></div>';
    document.body.appendChild(panel);

    console.log(panel.clientHeight); // зависит от стилей и box-model

    // Реальный кейс: вычислить доступное место для списка
    const list = document.createElement('ul');
    list.style.maxHeight = panel.clientHeight - 40 + 'px';
        `
    },

    {
        highlight: ".scrollHeight",
        content: "Полная высота прокручиваемого содержимого элемента.",
        isTop: true,
        code: `
    const box = document.createElement('div');
    box.style.height = '100px';
    box.style.overflow = 'auto';
    box.innerHTML = '<p>Строка 1</p><p>Строка 2</p><p>Строка 3</p><p>Строка 4</p><p>Строка 5</p>';
    document.body.appendChild(box);

    console.log(box.clientHeight); // видимая высота
    console.log(box.scrollHeight); // полная высота контента

    // Реальный кейс: scrollTop может быть дробным, поэтому нужен небольшой допуск
    const isAtBottom = box.scrollTop + box.clientHeight >= box.scrollHeight - 1;
    console.log(isAtBottom);
        `
    },

    {
        highlight: ".offsetWidth",
        content: "Ширина элемента с учетом padding и border.",
        code: `
    const card = document.createElement('div');
    card.style.width = '200px';
    card.style.padding = '20px';
    card.style.border = '2px solid #000';
    document.body.appendChild(card);

    console.log(card.clientWidth); // без border
    console.log(card.offsetWidth); // с border

    // Реальный кейс: вычисление позиции popover относительно ширины блока
    const popoverX = card.offsetWidth - 12;
    console.log(popoverX);
        `
    },

    {
        highlight: ".offsetTop",
        content: "Расстояние от внешней границы элемента (с margin) до padding edge его offsetParent.",
        code: `
    const section = document.createElement('section');
    section.style.marginTop = '300px';
    section.textContent = 'Секция';
    document.body.appendChild(section);

    console.log(section.offsetTop); // примерно 300+ (зависит от верстки)

    // offsetTop относится к offsetParent, а не обязательно ко всему документу
    const documentTop = section.getBoundingClientRect().top + window.scrollY;

    // Реальный кейс: скролл к блоку с небольшим отступом
    window.scrollTo({
      top: documentTop - 16,
      behavior: 'smooth'
    });
        `
    },

    {
        highlight: ".scrollTop",
        content: "Текущая позиция вертикального скролла внутри элемента.",
        isTop: true,
        code: `
    const panel = document.createElement('div');
    panel.style.height = '120px';
    panel.style.overflow = 'auto';
    panel.innerHTML = '<div style="height: 1000px"></div>';
    document.body.appendChild(panel);

    // Прокрутить программно
    panel.scrollTop = 200;
    console.log(panel.scrollTop); // 200

    // Реальный кейс: показать кнопку "Наверх"
    panel.addEventListener('scroll', () => {
      const showToTop = panel.scrollTop > 150;
      console.log('Показывать кнопку вверх:', showToTop);
    });
        `
    }
];


export const Property = () => {

    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <Text>
                <S.List>
                    {propertys.map((item, index) => (
                        <S.Item key={index}>
                            <S.HighlightedText
                                $isTop={item.isTop}
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
