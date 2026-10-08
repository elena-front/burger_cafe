# Burger Cafe

Frontend: https://elena-front.github.io/burger_cafe/

## Локальный backend

В репозитории зафиксирована спецификация минимального Node.js backend с demo-данными:

- [план реализации](./docs/backend/IMPLEMENTATION_PLAN.md);
- [техническая спецификация](./docs/backend/SPECIFICATION.md);
- [HTTP API (OpenAPI 3.1)](./docs/backend/openapi.yaml);
- [WebSocket API (AsyncAPI 2.6)](./docs/backend/asyncapi.yaml).

Исходники находятся в [`server`](./server). Сервер хранит изменяемые данные в памяти и сбрасывает их после перезапуска.

```bash
npm install
npm run dev:server
```

Во втором терминале запустите frontend:

```bash
npm run dev:client
```

Откройте `http://localhost:8080`. Frontend по умолчанию обращается к локальному backend. Если сервер работает на другом адресе, задайте `API_BASE_URL` и `WS_BASE_URL` перед запуском frontend; это переменные времени сборки. Например:

```bash
API_BASE_URL=http://localhost:3001/api WS_BASE_URL=ws://localhost:3001 npm run dev:client
```

По умолчанию HTTP API доступен на `http://localhost:3000/api`, а WebSocket-ленты — на `ws://localhost:3000/orders/all` и `ws://localhost:3000/orders?token=...`.

Demo-пользователь: `demo@burger.local` / `demo12345`. Код восстановления пароля: `000000`.

Проверки (для Cypress оба сервера должны работать):

```bash
npm run typecheck:server
npm run test:server
npm test -- --runInBand
npm run build
npm run test:e2e
```

Переменные окружения перечислены в [`.env.example`](./.env.example). Файл служит образцом: команды npm не загружают его автоматически. В production `JWT_SECRET` обязателен.
