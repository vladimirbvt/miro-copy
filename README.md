# React + TypeScript + Vite

Архитектура FSD адаптирована под нужды и размер проекта, убраны некоторые слои.

Для того чтобы работал code splitting в react-router с помощью lazy loading был изменен контракт public api папки features,
чтобы можно было из фич напрямую экспортировать страницы, а не только из index.ts

Работа с переменными окружения настроена через конфиг для их строгой типизации


### API

Для работы с api используется openapi схема и генерация на ее основе моковое api с msw и клиента для tanstack-query.

Для этого используем эти зависимости (уже есть в package.json):
```bash
npm i -D openapi-typescript msw openapi-msw
npm i openapi-fetch openapi-react-query @tanstack/react-query 
```

openapi-fetch и openapi-react-query предоставляет обертку над fetch и tanstack-query, в которую можно через дженерик
вставить сгенерированные типы и получаем в итоге полностью типизированный запрос.

Генерация типов для api запускается с помощью команды
```bash
npm run api
```

Есть другие подходы для этого, например Orval, официальный генератор openapi, но они генерируют рантайм код.
openapi-typescript же генерит только типы, которые не попадают в бандл.

##### Использование сгенерированных типов:
- entrypoint для сгенерированных типов в `@/shared/api/schema/index.ts`.
- [instance.ts](@/shared/api/instance.ts) в `@/shared/api/instance.ts` подключаем 
сгенерированные типы в клиент.

**Регистрируем воркер для работы моковой api**

```bash
npx msw init public --save
```

### Styles and ui
Tailwindcss
Shadcn/ui
