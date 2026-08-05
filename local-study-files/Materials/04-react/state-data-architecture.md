# State, data layer и архитектурный минимум React

**Приоритет:** P1  
**Основа:** Notion-страницы о reducer/Redux/todolists, материалы о загрузке данных, mini-CRM и требования вакансий  
**Исправление:** старый Redux через `createStore` не переносится как рекомендуемый production-подход; актуальный путь — Redux Toolkit, когда Redux вообще нужен.

## 1. Сначала классифицировать state

| Вид | Примеры | Где обычно хранить |
|---|---|---|
| Local UI state | открыта modal, выбран tab, draft input | ближайший компонент |
| Shared client state | сложный wizard, общие настройки UI | lifted state, reducer/context, иногда store |
| URL state | page, filter, sort, selected route | router/search params |
| Server state | users, leads, permissions, cache | query/router data layer |
| Form state | values, touched, errors, submit state | компонент или form library |
| Derived state | filtered list, total, full name | вычислить из источника во время render |
| Persistent client state | theme, небольшой draft | storage + явная sync policy |

Первая архитектурная ошибка — положить всё в один global store.

## 2. Один source of truth

Не дублировать одни и те же данные:

```tsx
// Плохо: filteredUsers может рассинхронизироваться с users/query.
const [users, setUsers] = useState<User[]>([]);
const [query, setQuery] = useState('');
const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

// Лучше:
const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(query.toLowerCase()),
);
```

Memoization нужна только при реальной дорогой операции/стабильной reference requirement, а не чтобы «разрешить» derived value.

## 3. Reducer — явные переходы

Reducer полезен, когда события важнее отдельных setters.

```ts
type LeadFilters = {
  query: string;
  status: 'all' | 'new' | 'inProgress' | 'done';
};

type Action =
  | { type: 'queryChanged'; query: string }
  | { type: 'statusChanged'; status: LeadFilters['status'] }
  | { type: 'reset' };

const initialFilters: LeadFilters = {
  query: '',
  status: 'all',
};

function filtersReducer(
  state: LeadFilters,
  action: Action,
): LeadFilters {
  switch (action.type) {
    case 'queryChanged':
      return { ...state, query: action.query };
    case 'statusChanged':
      return { ...state, status: action.status };
    case 'reset':
      return initialFilters;
  }
}
```

Action называет событие (`queryChanged`), а не технический setter (`setQuery`). Side effects остаются снаружи.

## 4. Когда достаточно Context

Reducer + Context подходит для scoped client state, когда:

- consumers находятся в одном subtree;
- updates не слишком частые;
- нужны понятные actions;
- не нужны сложные DevTools/middleware/cache.

Не делать один `AppContext` с пользователем, списками, modal, forms, theme и API cache.

## 5. Когда нужен Redux

Сначала должны появиться реальные признаки:

- state нужен многим удалённым features;
- переходы сложные и их трудно трассировать;
- нужен централизованный predictable flow;
- полезны DevTools, middleware, normalized data;
- команда уже стандартизировала Redux.

Если Redux выбран, современный default — Redux Toolkit:

- `configureStore`;
- `createSlice`;
- typed hooks;
- selectors;
- RTK Query для server state, если он подходит архитектуре.

Не учить production Redux на основе ручного `createStore`, switch boilerplate и копирования старых tutorials. Концепцию reducer/actions понимать нужно, реализацию строить через RTK.

Опора: [Redux Toolkit — Why Redux Toolkit is Redux Today](https://redux-toolkit.js.org/introduction/why-rtk-is-redux-today).

## 6. Server state — другая задача

Данные сервера:

- могут устареть;
- разделяются несколькими consumers;
- нуждаются в cache/dedupe/refetch;
- изменяются мутациями;
- требуют invalidation;
- могут быть stale, но пригодны для показа.

Поэтому «положим результат fetch в Redux/local state» часто создаёт самодельную query library.

TanStack Query/RTK Query уместны после понимания:

- query key;
- query function;
- staleTime;
- gc/cache lifetime;
- enabled/dependent queries;
- mutation;
- invalidation;
- optimistic update и rollback.

Подробная механика запроса: [`async-network-browser.md`](../02-javascript/async-network-browser.md).

## 7. Query key — контракт identity

```tsx
const usersQuery = useQuery({
  queryKey: ['users', { page, search, role }],
  queryFn: ({ signal }) =>
    getUsers({ page, search, role, signal }),
  staleTime: 30_000,
});
```

Key должен включать параметры, меняющие ответ, и быть стабильно сериализуемым по значению. Обычный объект вроде `{ page, search }` допустим: TanStack Query детерминированно хэширует serializable query keys. Опасны random/timestamp на каждый render, function/DOM/non-serializable values, неоднозначный `Date` без нормализованного представления и забытый tenant/user scope.

Опора: [TanStack Query — Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys).

Результат UI рассматривает как state machine:

```tsx
if (usersQuery.isPending) return <UsersSkeleton />;
if (usersQuery.isError && !usersQuery.data) {
  return <ErrorPanel error={usersQuery.error} />;
}

const users = usersQuery.data ?? [];

return (
  <>
    {usersQuery.isRefetchError && (
      <InlineError error={usersQuery.error} />
    )}
    {usersQuery.isFetching && <RefreshIndicator />}
    {users.length === 0
      ? <EmptyUsers />
      : <UsersTable users={users} />}
  </>
);
```

Background refetch не должен без необходимости стирать пригодные cached data полноразмерным spinner/error screen: ошибку обновления можно показать рядом с прежними данными.

## 8. Mutations

После mutation нужно выбрать:

- invalidate/refetch;
- напрямую обновить cache из server response;
- optimistic update + rollback;
- сочетание.

```tsx
const updateLead = useMutation({
  mutationFn: patchLead,
  onSuccess: (lead) => {
    queryClient.setQueryData(['lead', lead.id], lead);
    queryClient.invalidateQueries({ queryKey: ['leads'] });
  },
});
```

Оптимистическое обновление оправдано, если rollback и конфликт понятны. Для критичного необратимого действия лучше дождаться подтверждения.

## 9. Feature boundaries

Минимально понятная структура может выглядеть так:

```text
src/
  app/
    router/
    providers/
  features/
    lead-filters/
    edit-lead/
  entities/
    lead/
  pages/
    leads/
    lead-details/
  shared/
    api/
    ui/
    lib/
```

Это пример направления, не обязательная религия и не требование назвать всё по Feature-Sliced Design.

Хорошая boundary:

- владеет конкретной ответственностью;
- имеет узкий public API;
- не знает детали всех соседей;
- позволяет тестировать пользовательский сценарий;
- не превращает простую кнопку в семь слоёв файлов.

## 10. API layer

Один минимальный HTTP client отвечает за общие transport concerns:

- base URL;
- headers/credentials;
- `response.ok`;
- parsing;
- error shape;
- AbortSignal;
- auth refresh policy, если она есть.

Domain function отвечает за endpoint:

```ts
type GetLeadsParams = {
  page: number;
  search: string;
  signal?: AbortSignal;
};

async function getLeads(params: GetLeadsParams): Promise<LeadsPage> {
  const url = new URL('/api/leads', API_BASE_URL);
  url.searchParams.set('page', String(params.page));
  url.searchParams.set('search', params.search);

  const payload: unknown = await apiClient.getJson(url, {
    signal: params.signal,
  });

  return parseLeadsPage(payload);
}
```

`parseLeadsPage` — domain-specific runtime schema/type guard, который либо возвращает проверенный `LeadsPage`, либо бросает понятную ошибку контракта. Аннотация `Promise<LeadsPage>` сама не валидирует JSON.

Не делать один `api.js` на тысячи строк и не позволять компонентам вручную собирать одинаковые auth/error rules.

## 11. Auth на клиенте

Frontend state может знать:

- статус bootstrap;
- текущего пользователя;
- доступные capabilities/roles для UI;
- pending login/logout;
- redirect after auth.

Но скрытая кнопка не является authorization. Сервер проверяет права на каждый защищённый action.

Не копировать реальные tokens/IP/.env из архивных project notes. Для учебного проекта использовать placeholders и documented env names.

## 12. Mini-CRM как правильный проектный контекст

Не нужно сначала достраивать backend. Для frontend-версии достаточно готового API или mock:

- login/session bootstrap;
- leads table;
- search/filter/sort/page;
- create/edit form;
- lead details;
- loading/error/empty;
- optimistic status change только после базовой версии;
- URL state;
- доступные modal/drawer;
- tests;
- WebSocket — позже.

Такой проект одновременно тренирует JS/TS/React, API integration, состояние, формы, доступность и объяснение архитектуры.

## Что уметь сказать на собеседовании

> Я разделяю local UI, URL, form и server state. Derived value вычисляю из source of truth, а server cache не дублирую в component/global state без причины.

> Redux нужен не из-за размера приложения, а из-за характера shared client state и требований к flow/tooling. Если выбираю Redux сегодня, использую Redux Toolkit.

> Query library не отменяет HTTP-модель: я всё равно проектирую key, freshness, invalidation, errors и mutation consistency.

## Практический критерий

Для mini-CRM письменно классифицировать каждое значение:

- где живёт;
- кто владелец;
- что его меняет;
- нужно ли сохранять в URL/storage;
- является ли оно server state;
- как оно инвалидируется;
- какой пользовательский тест доказывает корректность.
