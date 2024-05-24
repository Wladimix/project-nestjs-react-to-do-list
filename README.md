<p align="center">
  <img src="https://github.com/devicons/devicon/blob/master/icons/nestjs/nestjs-original.svg" title="NESTJS" alt="NESTJS" width="200" height="200">
   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="TYPESCRIPT" alt="TYPESCRIPT" width="200" height="200">
  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="REACT" alt="REACT" width="200" height="200">
</p>

# Веб приложение Real Time To-Do-List
## Описание
Приложение представляет собой интерфейс реального времени, позволяющий пользователям управлять задачами. Пользователи имеют возможность:
- создавать задачи с заголовком, описанием и статусом;
- просматривать все задачи или фильтровать их по статусу;
- редактировать задачи, изменяя их заголовок, описание или статус;
- удалять задачи.
## Стек технологий
<b>Использовалась версия NodeJS: 20.13.1</b>
| Инструмент | Описание |
| :--- | :--- |
| ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) | Для создания серверной части использован фреймворк NestJS в сочетании с TypeScript. |
| ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) | Данные пользователей хранятся в объектно-реляционной системе управления базами данных Postgresql. |
| ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) | Взаимодействие с базой данных осуществляется объектно-реляционным отображением Prisma ORM. |
| ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) | JavaScript-библиотека Socket.io позволяет реализовать интерфейс реального времени при работе с задачами. |
| ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) | Клиентская часть приложения написана на фреймворке для разработки пользовательских интерфейсов React также в связке с TypeScript. |
| ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) | Для стилизации компонентов на фронтенде использован CSS-фреймворк Bootstrap. |
## Запуск и настройка
Полностью в контейнерах приложение запустить пока что не получилось (сложности с соединением внутри сети контейнеров). Поэтому я ограничился только разворачиванием БД в контейнере.
### Сервер
В корне проекта запустить контейнеры с Postgres и Adminer:
```
docker compose up -d
```
Для просмотра содержимого БД можно подключиться к Adminer по адресу http://localhost:3003.<br>
В папке /backend установить необходимые зависимости:
```
npm instal
```
Выполнить миграцию:
```
npm run migrate
```
Также можно заполнить БД фиктивными данными:
```
npm run seed
```
После этого в базе данных появится пользователь с логином <b>user</b> и паролем <b>111</b>.<br>
Выполнив миграцию, можно запускать сервер:
```
npm start
```
### Клиент
Для запуска клиентской части нужно перейти в папку /frontend, также установить зависимости:
```
npm instal
```
И запустить приложение:
```
npm start
```
Клиент запустится по адресу http://localhost:3004.
