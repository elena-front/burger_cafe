# Техническая спецификация demo backend

Версия: 1.0  
Дата: 2026-10-07

## 1. Контекст и границы

Существующий React frontend обращается к внешнему Stellar Burgers API. Цель — предоставить локальную, минимальную и совместимую реализацию для разработки и демонстрации.

В scope входят каталог, пользователи, токены, профиль, восстановление пароля, заказы и live-ленты. Вне scope: база данных, email, OAuth, роли, платёжная система, загрузка изображений, административный API, production hardening и горизонтальное масштабирование.

Источники контракта в текущем коде:

- HTTP-вызовы: `src/services/actions/index.ts`;
- refresh-логика и базовый URL: `src/utils/index.ts`;
- WebSocket-подключения: `src/pages/feed.tsx`, `src/pages/order-history-page.tsx`;
- модели: `src/types/index.ts`;
- demo ingredients: `cypress/fixtures/ingredients.json`.

## 2. Запуск и конфигурация

Значения по умолчанию:

| Переменная | Значение | Назначение |
|---|---|---|
| `PORT` | `3000` | HTTP и WebSocket port |
| `CORS_ORIGIN` | `http://localhost:8080` | Разрешённый frontend origin |
| `JWT_SECRET` | dev-only значение | Подпись access token |
| `ACCESS_TOKEN_TTL` | `15m` | Срок access token |
| `RESET_CODE` | `000000` | Фиксированный demo-код восстановления |
| frontend `API_BASE_URL` | `http://localhost:3000/api` | HTTP base URL |
| frontend `WS_BASE_URL` | `ws://localhost:3000` | WebSocket base URL |

`JWT_SECRET` не коммитится. Для локального режима разрешён явно помеченный insecure fallback; при `NODE_ENV=production` отсутствие секрета должно останавливать запуск.

## 3. Общие правила HTTP

- Все endpoint начинаются с `/api`.
- Request/response body — JSON UTF-8.
- Успешный доменный ответ содержит `success: true`.
- Ошибка содержит `success: false` и `message: string`.
- Неизвестные поля request body отклоняются.
- Email нормализуется через `trim().toLowerCase()`.
- Пустые строки после `trim()` невалидны.
- Access token передаётся как `Authorization: Bearer <jwt>`.
- В auth responses поле `accessToken` возвращается уже с префиксом `Bearer `, потому что текущий frontend удаляет его при записи в localStorage.
- Даты сериализуются в ISO 8601 UTC.
- Неизвестный route возвращает 404 JSON, не HTML.

Статусы:

- `200` — успешное чтение/изменение;
- `201` — регистрация и создание заказа;
- `400` — синтаксически корректный, но невалидный запрос;
- `401` — отсутствующая, истёкшая или невалидная авторизация;
- `404` — сущность или route не найден;
- `409` — конфликт уникальности email;
- `500` — непредвиденная ошибка без утечки stack trace.

Особое требование совместимости: истёкший JWT возвращает HTTP 401 с `message: "jwt expired"`. Именно по этой строке `requestWithRefresh` запускает refresh.

## 4. Модели

### Ingredient

```ts
type Ingredient = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};
```

### User

```ts
type User = { email: string; name: string };
```

Пароль и password hash никогда не возвращаются клиенту.

### Order

```ts
type Order = {
  _id: string;
  ingredients: string[]; // ID, включая булку дважды
  status: 'created' | 'pending' | 'done' | 'canceled';
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};
```

Внутри server order также хранит `ownerId`, но поле не выдаётся в feed. Номер заказа — уникальное возрастающее целое. Имя формируется детерминированно из булки и первой начинки; точная формулировка не является API-инвариантом.

### Feed

```ts
type Feed = {
  success: true;
  orders: Order[];
  total: number;
  totalToday: number;
};
```

Заказы сортируются по `createdAt` по убыванию. `total` — текущее число всех заказов, включая seed. `totalToday` — число заказов, созданных с 00:00 UTC текущего дня.

## 5. HTTP API

Полная машиночитаемая схема: `docs/backend/openapi.yaml`.

| Метод | Path | Auth | Назначение |
|---|---|---|---|
| GET | `/api/health` | нет | Проверка готовности процесса |
| GET | `/api/ingredients` | нет | Каталог ингредиентов |
| POST | `/api/auth/register` | нет | Регистрация и выдача пары токенов |
| POST | `/api/auth/login` | нет | Вход и выдача пары токенов |
| POST | `/api/auth/token` | refresh body | Ротация пары токенов |
| POST | `/api/auth/logout` | refresh body | Отзыв refresh session |
| GET | `/api/auth/user` | access | Текущий профиль |
| PATCH | `/api/auth/user` | access | Изменение профиля/пароля |
| POST | `/api/password-reset` | нет | Создание demo reset challenge |
| POST | `/api/password-reset/reset` | reset code | Новый пароль |
| POST | `/api/orders` | access | Создание заказа |
| GET | `/api/orders/:number` | нет | Заказ по номеру |

### Правила auth

- Register: `name` 1–80 символов, валидный email, password 8–128 символов.
- Login с неверной парой возвращает 401 `email or password are incorrect`.
- Email уникален без учёта регистра.
- Refresh token одноразовый: успешный refresh отзывает старый и выдаёт новый.
- Logout идемпотентен: известный или уже отозванный token даёт успешный ответ; отсутствие/пустое значение — 400.
- PATCH требует хотя бы одно из `name`, `email`, `password`; изменение email соблюдает уникальность.

### Правила demo password reset

- Для защиты от перечисления пользователей `/password-reset` всегда возвращает одинаковый 200 response.
- Если email существует, до перезапуска сервера ему разрешён reset с кодом из `RESET_CODE` (по умолчанию `000000`).
- Код одноразовый. После успешной смены пароля все refresh sessions пользователя отзываются.
- Email не отправляется; код описан в README и может быть залогирован только в development.

### Правила заказов

- Body: `{ "ingredients": ["id1", "id2", "id1"] }`.
- Нужно минимум три позиции: первая и последняя — один и тот же ingredient типа `bun`; между ними минимум одна позиция типа `main` или `sauce`.
- Каждый ID должен существовать, иначе 400.
- Повторения разрешены.
- Новый заказ получает `pending`; demo timer может перевести его в `done`, обновив `updatedAt` и отправив новый WS snapshot.
- `GET /orders/:number` возвращает `{ success: true, orders: [order] }`; неизвестный номер — 404.

## 6. WebSocket API

Полная схема сообщений: `docs/backend/asyncapi.yaml`.

### Public feed

`ws://localhost:3000/orders/all`

- Авторизация не требуется.
- Сразу после соединения server отправляет `Feed` со всеми заказами.
- При создании/изменении заказа отправляется новый полный snapshot.

### Private feed

`ws://localhost:3000/orders?token=<jwt>`

- В query передаётся JWT без `Bearer `.
- Snapshot содержит только заказы текущего пользователя.
- `total` и `totalToday` остаются глобальными для совместимости с общей моделью frontend.
- При невалидном/отсутствующем токене server сначала отправляет:

```json
{ "success": false, "message": "Invalid or missing token" }
```

затем закрывает соединение с code `1008`.

Server не требует входящих application messages. Ping/pong можно использовать только для очистки мёртвых соединений.

## 7. Demo-данные

- Все 15 ингредиентов берутся из `cypress/fixtures/ingredients.json`, чтобы существующие ID и тестовые селекторы не изменились.
- Пользователь: `demo@burger.local`, имя `Demo User`, пароль `demo12345`.
- Не менее 12 заказов, из них:
  - минимум 6 со статусом `done`;
  - минимум 2 со статусом `pending`;
  - минимум 4 принадлежат demo-пользователю;
  - минимум 3 созданы «сегодня» в UTC для ненулевого `totalToday`.
- Seed ID и номера фиксированы; относительные даты вычисляются при старте.
- Начальное значение следующего номера равно `max(seed.number) + 1`.

## 8. Нефункциональные требования

- Сервер стартует не дольше 2 секунд без сетевых обращений.
- JSON body limit: 64 KiB.
- CORS разрешает только настроенный origin; методы `GET,POST,PATCH,OPTIONS`; заголовки `Content-Type,Authorization`.
- Логи не содержат password, JWT, refresh/reset token.
- Unhandled exception/rejection логируется и приводит к контролируемому завершению процесса.
- Ответы не раскрывают stack trace.
- Все таймеры и WS connections закрываются на shutdown, чтобы Jest не зависал.
- Код разделяет route/controller, domain service и in-memory repository настолько, чтобы хранилище можно было заменить без изменения API.

## 9. Критерии приёмки

Backend считается готовым, если:

1. `npm run dev:server` поднимает HTTP/WS на port 3000.
2. `GET /api/ingredients` возвращает 15 ожидаемых ингредиентов.
3. Demo-пользователь может войти; access token открывает `/api/auth/user`.
4. Истёкший access token вызывает автоматический refresh существующего frontend.
5. Пользователь может зарегистрироваться, изменить профиль, выйти и снова войти.
6. Reset flow работает с документированным demo-кодом.
7. Валидный burger создаёт заказ, невалидный отклоняется предсказуемой 400 ошибкой.
8. Новый заказ доступен по номеру и появляется в public/private WebSocket feed без reload.
9. Private feed не раскрывает чужие заказы.
10. Frontend build, его unit tests и server tests проходят.
11. Полный локальный smoke flow не обращается к `norma.nomoreparties.space`.
12. README содержит команды, переменные окружения, demo credentials и ограничение in-memory режима.

## 10. Решения, оставленные на будущее

- PostgreSQL/SQLite и миграции.
- Настоящая доставка email и случайные reset tokens.
- Refresh token cookie вместо localStorage/body.
- Rate limiting, security headers, аудит и метрики.
- Локальное хранение изображений.
- Пагинация feed и долговременная история заказов.

