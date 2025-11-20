# React + TypeScript + Vite

Архитектура FSD адаптирована под нужды и размер проекта, убраны некоторые слои.

Для того чтобы работал code splitting в react-router с помощью lazy loading был изменен контракт public api папки features,
чтобы можно было из фич напрямую экспортировать страницы, а не только из index.ts

