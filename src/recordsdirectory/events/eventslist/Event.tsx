import React, {useState, useRef, useEffect} from "react";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import {NoteBlock, NotesTitle, Text} from "../../RecordsDirectory_Style";
import {S} from "../Event_Styles";

type EventItem = {
    highlight: string;
    content: string;
    code: string;
    isTop?: boolean;
};

export const eventItems: EventItem[] = [
    {
        highlight: "click",
        content: "Срабатывает при клике по элементу (мышь, тач, клавиатурная активация кнопок/ссылок).",
        isTop: true,
        code: `
    // 1) Базовый click
    const button = document.querySelector('#saveBtn');
    button.addEventListener('click', () => {
      console.log('Сохраняем данные...');
    });

    // 2) Делегирование кликов на список
    const list = document.querySelector('.todo-list');
    list.addEventListener('click', (event) => {
      const removeBtn = event.target.closest('[data-action="remove"]');
      if (!removeBtn) return;
      removeBtn.closest('li')?.remove();
    });

    // 3) Реальный кейс: переключатель темы
    const themeBtn = document.querySelector('#themeBtn');
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
    });
        `
    },
    {
        highlight: "input",
        content: "Срабатывает при каждом изменении значения input/textarea/select.",
        isTop: true,
        code: `
    const searchInput = document.querySelector('#search');
    const result = document.querySelector('#result');

    // 1) Получаем value в реальном времени
    searchInput.addEventListener('input', (event) => {
      const value = event.target.value.trim();
      result.textContent = value ? 'Ищем: ' + value : 'Введите запрос';
    });

    // 2) Ограничение длины
    searchInput.addEventListener('input', (event) => {
      if (event.target.value.length > 30) {
        event.target.value = event.target.value.slice(0, 30);
      }
    });

    // 3) Реальный кейс: debounced поиск
    let timerId = null;
    searchInput.addEventListener('input', (event) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        const q = event.target.value.trim();
        console.log('Запрос на сервер:', q);
      }, 300);
    });
        `
    },
    {
        highlight: "change",
        content: "Срабатывает при подтвержденном изменении значения (после потери фокуса или выбора).",
        isTop: true,
        code: `
    const countrySelect = document.querySelector('#country');
    const agreeCheckbox = document.querySelector('#agree');

    // 1) select change
    countrySelect.addEventListener('change', (event) => {
      console.log('Выбрана страна:', event.target.value);
    });

    // 2) checkbox change
    agreeCheckbox.addEventListener('change', (event) => {
      console.log('Согласие:', event.target.checked);
    });

    // 3) Реальный кейс: показать дополнительные поля
    const companyBlock = document.querySelector('#companyBlock');
    const typeSelect = document.querySelector('#accountType');
    typeSelect.addEventListener('change', (event) => {
      companyBlock.hidden = event.target.value !== 'business';
    });
        `
    },
    {
        highlight: "submit",
        content: "Срабатывает при отправке формы.",
        isTop: true,
        code: `
    const form = document.querySelector('#signupForm');

    form.addEventListener('submit', (event) => {
      // 1) Блокируем стандартную отправку и перезагрузку страницы
      event.preventDefault();

      // 2) Собираем данные нативно
      const data = new FormData(form);
      const payload = Object.fromEntries(data.entries());
      console.log(payload);

      // 3) Реальный кейс: отправка через fetch
      // fetch('/api/signup', { method: 'POST', body: JSON.stringify(payload) })
    });
        `
    },
    {
        highlight: "keydown",
        content: "Срабатывает в момент нажатия клавиши.",
        isTop: true,
        code: `
    const input = document.querySelector('#message');

    input.addEventListener('keydown', (event) => {
      // Enter отправляет сообщение, Shift+Enter переносит строку
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        console.log('Отправляем сообщение:', input.value);
      }
    });

    // Глобальный хоткей Ctrl/Cmd + K
    document.addEventListener('keydown', (event) => {
      const isHotkey = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k';
      if (isHotkey) {
        event.preventDefault();
        console.log('Открываем поиск');
      }
    });
        `
    },
    {
        highlight: "keyup",
        content: "Срабатывает при отпускании клавиши.",
        code: `
    const password = document.querySelector('#password');
    const meter = document.querySelector('#strength');

    // Реальный кейс: live-индикатор силы пароля
    password.addEventListener('keyup', (event) => {
      const value = event.target.value;
      const score = value.length >= 8 ? 'strong' : 'weak';
      meter.textContent = score;
    });
        `
    },
    {
        highlight: "focus",
        content: "Срабатывает, когда элемент получает фокус.",
        isTop: true,
        code: `
    const emailInput = document.querySelector('#email');
    const hint = document.querySelector('#emailHint');

    emailInput.addEventListener('focus', () => {
      hint.hidden = false;
      hint.textContent = 'Введите рабочий email';
    });

    // Реальный кейс: подсветить активное поле
    emailInput.addEventListener('focus', () => {
      emailInput.classList.add('is-focused');
    });
        `
    },
    {
        highlight: "blur",
        content: "Срабатывает, когда элемент теряет фокус.",
        code: `
    const emailInput = document.querySelector('#email');
    const error = document.querySelector('#emailError');

    emailInput.addEventListener('blur', () => {
      const value = emailInput.value.trim();
      const isValid = value.includes('@') && value.includes('.');
      error.hidden = isValid;
      if (!isValid) error.textContent = 'Некорректный email';
      emailInput.classList.remove('is-focused');
    });
        `
    },
    {
        highlight: "DOMContentLoaded",
        content: "Срабатывает, когда HTML загружен и разобран (без ожидания картинок).",
        isTop: true,
        code: `
    document.addEventListener('DOMContentLoaded', () => {
      // 1) Безопасно брать DOM-элементы
      const app = document.querySelector('#app');
      app.textContent = 'Приложение инициализировано';

      // 2) Реальный кейс: инициализация UI
      initTabs();
      initModals();
      initTheme();
    });

    function initTabs() {}
    function initModals() {}
    function initTheme() {}
        `
    },
    {
        highlight: "load",
        content: "Срабатывает, когда ресурс полностью загружен (window, img, script).",
        code: `
    // 1) Полная загрузка страницы
    window.addEventListener('load', () => {
      console.log('Страница полностью загружена');
    });

    // 2) Загрузка картинки
    const img = document.querySelector('#heroImage');
    img.addEventListener('load', () => {
      console.log('Картинка загружена');
    });

    // 3) Реальный кейс: прятать skeleton после загрузки изображения
    const skeleton = document.querySelector('#heroSkeleton');
    img.addEventListener('load', () => {
      skeleton.hidden = true;
    });
        `
    },
    {
        highlight: "scroll",
        content: "Срабатывает при прокрутке окна или прокручиваемого контейнера.",
        isTop: true,
        code: `
    const toTopBtn = document.querySelector('#toTop');

    // 1) Скролл окна
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      toTopBtn.hidden = y < 300;
    });

    // 2) Скролл контейнера
    const panel = document.querySelector('#chatPanel');
    panel.addEventListener('scroll', () => {
      const isBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight;
      console.log('Снизу?', isBottom);
    });

    // 3) Реальный кейс: ленивый догруз контента
    panel.addEventListener('scroll', () => {
      if (panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 40) {
        console.log('Догружаем сообщения...');
      }
    });
        `
    },
    {
        highlight: "resize",
        content: "Срабатывает при изменении размера окна браузера.",
        code: `
    let resizeTimer = null;

    // Реальный кейс: перестроить layout после завершения resize
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        document.body.classList.toggle('is-mobile', isMobile);
      }, 150);
    });
        `
    },
    {
        highlight: "mouseenter",
        content: "Срабатывает, когда курсор входит в элемент (без всплытия как у mouseover).",
        code: `
    const card = document.querySelector('.product-card');

    card.addEventListener('mouseenter', () => {
      card.classList.add('card--hover');
    });

    // Реальный кейс: показать быстрые действия
    const quickActions = card.querySelector('.quick-actions');
    card.addEventListener('mouseenter', () => {
      quickActions.hidden = false;
    });
        `
    },
    {
        highlight: "mouseleave",
        content: "Срабатывает, когда курсор покидает элемент.",
        code: `
    const card = document.querySelector('.product-card');
    const quickActions = card.querySelector('.quick-actions');

    card.addEventListener('mouseleave', () => {
      card.classList.remove('card--hover');
      quickActions.hidden = true;
    });
        `
    },
    {
        highlight: "contextmenu",
        content: "Срабатывает при вызове контекстного меню (обычно правый клик).",
        code: `
    const list = document.querySelector('#files');
    const menu = document.querySelector('#customMenu');

    list.addEventListener('contextmenu', (event) => {
      event.preventDefault(); // убираем системное меню

      menu.style.left = event.clientX + 'px';
      menu.style.top = event.clientY + 'px';
      menu.hidden = false;
    });
        `
    },
    {
        highlight: "event.target",
        content: "Элемент, на котором событие фактически произошло.",
        isTop: true,
        code: `
    const menu = document.querySelector('#menu');

    // Делегирование: один обработчик на весь список
    menu.addEventListener('click', (event) => {
      const item = event.target.closest('[data-item-id]');
      if (!item) return;
      console.log('Нажали пункт:', item.dataset.itemId);
    });

    // target часто используют вместе с closest()
        `
    },
    {
        highlight: "event.currentTarget",
        content: "Элемент, на котором висит текущий обработчик.",
        isTop: true,
        code: `
    const card = document.querySelector('.card');
    const button = card.querySelector('button');

    card.addEventListener('click', (event) => {
      console.log('target:', event.target); // может быть button
      console.log('currentTarget:', event.currentTarget); // всегда card
    });

    button.click(); // target = button, currentTarget = card
        `
    },
    {
        highlight: "event.preventDefault()",
        content: "Отменяет стандартное действие браузера для события.",
        isTop: true,
        code: `
    // 1) Отмена перехода по ссылке
    const link = document.querySelector('a[data-track]');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('Открываем свой роутер вместо перехода');
    });

    // 2) Отмена submit формы
    const form = document.querySelector('#login');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('Валидируем и отправляем через fetch');
    });
        `
    },
    {
        highlight: "event.stopPropagation()",
        content: "Останавливает всплытие события к родителям.",
        isTop: true,
        code: `
    const modal = document.querySelector('#modal');
    const content = modal.querySelector('.modal__content');

    // Клик по фону закрывает модалку
    modal.addEventListener('click', () => {
      modal.hidden = true;
    });

    // Клик внутри контента не должен закрывать модалку
    content.addEventListener('click', (event) => {
      event.stopPropagation();
    });
        `
    },
    {
        highlight: "event.key",
        content: "Название нажатой клавиши (Enter, Escape, ArrowUp и т.д.).",
        code: `
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        console.log('Закрыть модалку');
      }

      if (event.key === 'ArrowDown') {
        console.log('Перейти к следующему пункту');
      }
    });
        `
    }
];

export const EventList = () => {
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (selectedCode && codeRef.current) {
            hljs.highlightBlock(codeRef.current);
        }
    }, [selectedCode]);

    return (
        <NoteBlock>
            <NotesTitle>Native Events</NotesTitle>
            <Text>
                <S.List>
                    {eventItems.map((item, index) => (
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
