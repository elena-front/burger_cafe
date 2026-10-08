# План реализации minimal backend

Статус: этапы 1–6 реализованы; автоматические проверки приёмки пройдены.  
Дата фиксации: 2026-10-07  
Связанные документы: [техническая спецификация](./SPECIFICATION.md), [OpenAPI](./openapi.yaml), [AsyncAPI](./asyncapi.yaml)

## 1. Результат

В репозитории должен появиться локальный Node.js backend, который полностью заменяет используемый frontend-сервис `norma.nomoreparties.space`:

- отдаёт каталог ингредиентов;
- поддерживает регистрацию, вход, обновление access token, выход и профиль;
- создаёт и возвращает заказы;
- публикует общую и пользовательскую ленты заказов по WebSocket;
- поддерживает демонстрационный сценарий восстановления пароля;
- запускается вместе с существующим frontend без внешней БД и внешних API.

Backend не предназначен для production: все изменяемые данные хранятся в памяти и сбрасываются при рестарте.

## 2. Принятые решения

| Область       | Решение                                                                      |
| ------------- | ---------------------------------------------------------------------------- |
| Runtime       | Node.js 20 LTS или новее                                                     |
| Язык          | TypeScript, отдельный `server/tsconfig.json`                                 |
| HTTP          | Express                                                                      |
| WebSocket     | `ws` на том же HTTP-сервере                                                  |
| Валидация     | Zod                                                                          |
| Пароли        | `bcryptjs`                                                                   |
| Access token  | JWT, 15 минут                                                                |
| Refresh token | случайный непрозрачный токен, серверная сессия в памяти, ротация при refresh |
| Хранилище     | in-memory repositories + JSON/TS seed-файлы                                  |
| Тесты         | Jest + Supertest, WebSocket smoke test                                       |
| Документация  | OpenAPI 3.1 для HTTP, AsyncAPI 2.6 для WebSocket                             |

Причина отдельного каталога `server/`, но общего корневого `package.json`: проект остаётся одним npm workspace без второго lock-файла. Серверные зависимости и команды добавляются в существующий package manifest.

## 3. Этапы

### Этап 0. Зафиксировать baseline

- Запустить существующие unit- и Cypress-тесты, записать известные сбои.
- Проверить production build frontend.
- Не исправлять несвязанные frontend-дефекты в рамках backend-задачи.

Результат: понятна исходная работоспособность до изменений.

### Этап 1. Каркас сервера

- Добавить зависимости `express`, `cors`, `ws`, `zod`, `jsonwebtoken`, `bcryptjs` и необходимые type-пакеты.
- Добавить `tsx` для dev-запуска.
- Создать `server/src/app.ts`, `server/src/server.ts`, конфигурацию и единый error middleware.
- Добавить `GET /api/health`.
- Добавить graceful shutdown HTTP/WS-сервера.

Результат: сервер стартует на `http://localhost:3000`, возвращает health response и корректно завершается.

### Этап 2. Данные и доменная логика

- Перенести каталог из `cypress/fixtures/ingredients.json` в server seed без изменения `_id` и URL картинок.
- Добавить минимум 12 seed-заказов: статусы `done` и `pending`, несколько заказов demo-пользователя, даты текущего и предыдущего дня.
- Добавить пользователя `demo@burger.local` / `demo12345`.
- Реализовать in-memory repositories для пользователей, сессий и заказов.
- Реализовать вычисление `total` и `totalToday` из текущего набора заказов.

Результат: после каждого запуска доступен повторяемый демонстрационный набор.

### Этап 3. HTTP API

Реализовать и покрыть интеграционными тестами:

1. `GET /api/ingredients`;
2. `POST /api/auth/register`;
3. `POST /api/auth/login`;
4. `POST /api/auth/token`;
5. `POST /api/auth/logout`;
6. `GET /api/auth/user`;
7. `PATCH /api/auth/user`;
8. `POST /api/password-reset`;
9. `POST /api/password-reset/reset`;
10. `POST /api/orders`;
11. `GET /api/orders/:number`.

Проверить единый JSON-формат ошибок и точный текст `jwt expired`, на который опирается frontend.

Результат: HTTP-контракт соответствует `openapi.yaml` и существующим типам в `src/types/index.ts`.

### Этап 4. WebSocket API

- Поднять `/orders/all` без авторизации.
- Поднять `/orders?token=<access-token>` с авторизацией.
- Сразу после подключения отправлять актуальный snapshot.
- После создания заказа отправлять новый snapshot всем публичным клиентам и владельцу заказа.
- При невалидном токене отправлять `{ "success": false, "message": "Invalid or missing token" }` и закрывать соединение.
- Очистить клиентов при disconnect/shutdown.

Результат: страницы `/feed` и `/profile/orders` работают без внешнего WebSocket.

### Этап 5. Подключение frontend

- Ввести `API_BASE_URL` и `WS_BASE_URL` через `EnvironmentPlugin` с локальными значениями по умолчанию.
- Заменить URL в `src/utils/index.ts`, `src/pages/feed.tsx` и `src/pages/order-history-page.tsx`.
- Добавить `.env.example`, не добавляя реальные секреты.
- Добавить команды `dev:server`, `dev:client`, `test:server`; при необходимости — `dev` через `concurrently`.
- Обновить README с demo credentials и командами запуска.

Результат: приложение локально использует новый backend, а адрес можно сменить без правки исходников.

### Этап 6. Проверка приёмки

- Unit/integration: auth, token rotation, validation, создание/получение заказа, фильтрация private feed.
- WebSocket smoke: public snapshot, private snapshot, broadcast нового заказа, ошибка токена.
- Frontend unit tests и production build.
- Cypress happy path без intercept для ingredients/auth/orders; существующие изолированные Cypress-тесты сохранить.
- Ручной smoke: регистрация → конструктор → заказ → общая лента → история → изменение профиля → logout/login.

Результат: выполнены критерии из раздела 9 спецификации.

## 4. Предлагаемая структура

```text
server/
  src/
    app.ts
    server.ts
    config.ts
    domain/
      types.ts
    data/
      ingredients.seed.ts
      orders.seed.ts
      users.seed.ts
    repositories/
      memory-store.ts
    middleware/
      auth.ts
      error-handler.ts
      validate.ts
    routes/
      auth.ts
      ingredients.ts
      orders.ts
      password-reset.ts
    services/
      auth-service.ts
      order-service.ts
    websocket/
      feed-server.ts
  tests/
  tsconfig.json
docs/backend/
  IMPLEMENTATION_PLAN.md
  SPECIFICATION.md
  openapi.yaml
  asyncapi.yaml
```

## 5. Порядок коммитов

1. `docs: add backend contracts and implementation plan`
2. `feat(server): add app skeleton and demo repositories`
3. `feat(server): implement auth and password reset API`
4. `feat(server): implement ingredients and orders API`
5. `feat(server): add public and private order feeds`
6. `feat(frontend): configure local API and websocket endpoints`
7. `test: cover backend contracts and local e2e flow`
8. `docs: document local full-stack startup`

## 6. Риски и ограничения

- Перезапуск удаляет зарегистрированных пользователей, сессии и созданные заказы — это осознанное свойство demo backend.
- URL картинок пока внешние; offline-режим потребует отдельной задачи на локальные ассеты.
- WebSocket middleware frontend сейчас не включает token refresh для private feed. Сервер сохраняет совместимый error message, но в этапе интеграции следует передать `true` второму вызову `socketMiddleware` либо явно подтвердить желаемое поведение.
- В `cypress/fixtures/orders.json` ингредиенты заказа представлены объектами, а приложение и feed ожидают массив ID. Backend использует массив ID как единый канонический формат согласно `src/types/index.ts`.
- `totalToday` зависит от серверной UTC-даты; это явно закреплено в спецификации.

## 7. Оценка

Ориентир для одного разработчика: 2–3 рабочих дня.

| Блок                 |     Оценка |
| -------------------- | ---------: |
| Каркас и данные      |    0.5 дня |
| HTTP API и auth      |   0.75 дня |
| WebSocket            |    0.5 дня |
| Интеграция frontend  |   0.25 дня |
| Тесты и документация | 0.5–1 день |
