import React from 'react';
import {
    Link,
    Marker,
    NoteBlock,
    NoteLi,
    NoteUl,
    ParagraphTitle,
    Text,
    TextP,
    TypeTitle
} from "../RecordsDirectory_Style";
import {Property} from "./propertyslist/Property";
import {HighlightedCodeBlock} from "../regex/regexComponents/HighlightedCodeBlock";

export const Propertys = () => {
    return (
        <>
            <TypeTitle>Properties (Свойства)</TypeTitle>
            <Property/>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Конспект: Как Работать Со Свойствами Без Хаоса</ParagraphTitle>
                    <TextP>
                        Свойства в JS условно делятся на 3 группы: <Marker>данные</Marker> (value, checked, files),
                        <Marker> структуру DOM</Marker> (children, parentNode) и <Marker>метрики интерфейса</Marker>
                        (clientWidth, scrollHeight, offsetTop).
                    </TextP>
                    <NoteUl>
                        <NoteLi>Если выводишь пользовательский текст, используй <Marker>textContent</Marker>.</NoteLi>
                        <NoteLi>Если нужно состояние формы — читай <Marker>value / checked / selectedIndex / files</Marker>.</NoteLi>
                        <NoteLi>Для layout-задач заранее определи, нужна видимая или полная высота (clientHeight vs scrollHeight).</NoteLi>
                        <NoteLi>Data-атрибуты (`dataset`) удобны для делегирования и связывания DOM с данными.</NoteLi>
                    </NoteUl>
                </Text>
            </NoteBlock>

            <NoteBlock>
                <Text>
                    <ParagraphTitle>Практический Шаблон: Карточка + Форма + Layout</ParagraphTitle>
                    <HighlightedCodeBlock>
                        {
                            `
const card = document.querySelector('[data-user-id="42"]');
const form = document.querySelector('#profileForm');
const saveButton = form.querySelector('button[type="submit"]');
const fileInput = form.querySelector('input[type="file"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nameInput = form.querySelector('input[name="name"]');
  const isValid = nameInput.value.trim().length >= 2;
  if (!isValid) return;

  saveButton.disabled = true;
  saveButton.textContent = 'Saving...';

  const payload = new FormData(form);
  // Именованный file input уже попадает в FormData(form).
  // Добавляем вручную только input без name.
  if (!fileInput.name && fileInput.files?.length) {
    payload.append('avatar', fileInput.files[0]);
  }

  try {
    // await fetch('/api/profile', { method: 'POST', body: payload });
    card.dataset.userName = nameInput.value.trim();
    card.querySelector('.user-name').textContent = nameInput.value.trim();
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = 'Save';
  }
});

// Layout-логика
const panel = document.querySelector('#activityPanel');
const isOverflowing = panel.scrollHeight > panel.clientHeight;
panel.classList.toggle('has-shadow', isOverflowing);
                            `
                        }
                    </HighlightedCodeBlock>
                    <TextP>
                        Материалы:
                        {" "}
                        <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement">MDN HTMLElement</Link>
                        {" · "}
                        <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement">MDN HTMLInputElement</Link>
                    </TextP>
                </Text>
            </NoteBlock>
        </>
    );
};
