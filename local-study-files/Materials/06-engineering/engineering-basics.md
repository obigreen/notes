# Engineering basics: Git, тесты, tooling и delivery

**Приоритет:** P1 параллельно JS/TS/React  
**Основа:** Notion tests/homeworks, Preax self-rating, market/vacancy screenshots, Telegram DevTools/performance links.

## 1. Git — не набор команд, а модель истории

Нужно уверенно понимать:

- working tree;
- staging area;
- commit;
- branch;
- local/remote;
- fetch/pull/push;
- merge/rebase;
- conflict;
- revert.

Минимальный рабочий цикл:

```bash
git status
git switch -c feature/lead-filters
git add src/features/lead-filters
git commit -m "Add lead status filter"
git push -u origin feature/lead-filters
```

Коммит:

- имеет одну объяснимую цель;
- не включает случайные build/secrets/editor files;
- проходит tests/lint;
- message говорит о результате, а не «fix».

## 2. Merge conflict

Conflict — Git не может автоматически совместить две версии, а не «репозиторий сломан».

Алгоритм:

1. понять обе стороны и желаемый конечный код;
2. удалить conflict markers;
3. запустить typecheck/tests;
4. проверить diff;
5. завершить merge/rebase;
6. не выбирать blindly “ours/theirs”.

Полезная практика — создать два branches, изменить одну строку по-разному и разрешить конфликт вручную.

`revert` создаёт новый commit, отменяющий изменения. Это безопаснее для общей опубликованной истории, чем переписывать её без согласования.

## 3. Чтение чужого кода

Не начинать с каждой строки.

1. Запустить проект и зафиксировать видимое поведение.
2. Найти entry point/router.
3. Проследить один пользовательский сценарий.
4. Найти state owner и API boundary.
5. Поставить breakpoint/log.
6. Сформулировать hypothesis.
7. Изменить минимум и проверить.

DevTools — часть программирования, а не финальная «полировка».

## 4. Что тестировать

Тест даёт уверенность в observable behavior.

### Unit

Чистая функция/reducer/validation:

```ts
it('keeps only active users', () => {
  const result = filterActiveUsers([
    { id: '1', isActive: true },
    { id: '2', isActive: false },
  ]);

  expect(result).toEqual([{ id: '1', isActive: true }]);
});
```

### Component/integration

Пользователь взаимодействует с UI:

```tsx
// @testing-library/user-event v14+
it('shows a required email error', async () => {
  const user = userEvent.setup();
  render(<RegistrationForm />);

  await user.click(screen.getByRole('button', { name: /создать/i }));

  expect(
    screen.getByText(/укажите email/i),
  ).toBeInTheDocument();
});
```

В текущем notes-app lockfile стоит `@testing-library/user-event` 13.5.0: там используется прямой `userEvent.click(...)`, без `setup()`. Переход на современный API — отдельное обновление dependencies, а не незаметная замена примера в старом проекте.

### End-to-end

Критичный flow в реальном browser: login → list → edit/save.

Не тестировать implementation detail вроде имени внутренней state variable. Testing Library рекомендует queries, близкие к пользователю, начиная с role/name и label.

Опоры: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) и [query priority](https://testing-library.com/docs/queries/about/#priority).

## 5. Что должно быть в минимальном наборе тестов проекта

- pure transforms/validation;
- reducer transitions;
- loading/error/empty/success;
- form submit и server error;
- keyboard interaction/focus для modal;
- race condition «последний запрос остаётся в UI»;
- route/search params;
- один E2E happy path.

Snapshot большого component tree не заменяет assertions о поведении.

## 6. TDD

Red → Green → Refactor полезен, когда поведение можно сформулировать до реализации.

Не нужно превращать каждый CSS tweak в строгий TDD. Ценность:

- заранее определить контракт;
- увидеть failing test;
- написать минимум;
- улучшить структуру, сохраняя поведение.

Notion-страница с Jest сохраняется как концепция, но конкретный runner выбирается по текущему project stack. В новом Vite-проекте часто естественен Vitest; в существующем CRA-приложении уже встроена Jest-based test setup.

## 7. Tooling

Для нового учебного client React-проекта:

- актуальный framework либо Vite, если нужен простой client build;
- TypeScript strict;
- ESLint;
- formatter;
- test runner;
- Testing Library;
- lockfile;
- env schema/documentation;
- production build command.

Текущий notes-app остаётся на React 18/CRA 5 и TypeScript 4.9.5 из lockfile; это legacy baseline конкретного проекта, не template для нового.

Нельзя переносить старые команды из Notion без проверки:

- package мог уже включить types;
- CLI мог измениться;
- Create React App deprecated;
- bundler config зависит от версии.

## 8. Package/dependency hygiene

Перед установкой:

1. какую проблему решает package;
2. нельзя ли закрыть Web Platform/маленькой функцией;
3. release/maintenance/type support;
4. bundle/runtime cost;
5. security/license;
6. как удалить, если решение не подойдёт.

После:

- lockfile в Git;
- import только нужного;
- analyzer при тяжёлом package;
- обновления отдельными понятными changes.

## 9. CI/CD минимум

Понятия:

```text
commit/pull request
  → install from lockfile
  → typecheck
  → lint
  → tests
  → production build
  → deploy
  → smoke check/monitor
```

CI — автоматическая проверка изменений. CD может означать continuous delivery или deployment в зависимости от процесса.

Для учебного проекта достаточно одного workflow, который:

- использует поддерживаемую Node version;
- делает deterministic install;
- запускает typecheck/test/build;
- не печатает secrets;
- падает при ошибке.

Не нужно изучать сложную инфраструктуру до того, как локально есть рабочие scripts.

## 10. API contract

Если пока не складывается сама связь frontend, HTTP и server, сначала пройти
[`REST API глазами frontend-разработчика`](../02-javascript/rest-api-for-frontend.md).

Frontend должен уметь читать:

- method/path;
- path/query parameters;
- request headers/body;
- success/error schemas;
- auth requirements;
- pagination;
- OpenAPI/Swagger.

Postman полезен, чтобы отделить:

- API не работает;
- frontend сформировал неверный запрос;
- auth/session не настроена;
- response shape не совпадает.

Но Postman не является frontend продукта.

## 11. Code quality и архитектура

Вместо абстрактного «чистого кода» проверять:

- у функции/компонента одна понятная ответственность;
- имена выражают domain;
- side effect находится на boundary;
- duplicate rule вынесен, а не просто похожие три строки;
- error state не скрыт;
- public API модуля узкий;
- trade-off записан;
- изменение можно протестировать.

Не вводить premature layers/design patterns до реальной боли.

## 12. Monitoring

Frontend production минимум:

- error reporting с source maps;
- network/API errors;
- ключевые performance metrics;
- важные product events без персональных secrets;
- release/version marker;
- воспроизводимый user context в рамках privacy policy.

Console log не является production monitoring.

## Что уметь сказать на собеседовании

> Я тестирую поведение на уровне, где тест даёт уверенность: pure logic unit, пользовательский component flow, критичный E2E. Не привязываю все тесты к внутренней структуре компонента.

> Conflict я разрешаю по желаемому конечному поведению и после этого запускаю typecheck/tests; не выбираю сторону автоматически.

> CI для frontend проверяет reproducible install, types, lint, tests и production build. Deploy/monitoring — следующий слой.

## Практический критерий

Для одного React + TypeScript feature:

1. отдельная branch;
2. три небольших commits;
3. unit test;
4. component test через role/label;
5. искусственный merge conflict;
6. CI typecheck/test/build;
7. PR-style описание: задача, решение, trade-offs, как проверить.
