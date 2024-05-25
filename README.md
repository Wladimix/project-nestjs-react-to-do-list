<p align="center">
  <img src="https://github.com/devicons/devicon/blob/master/icons/nestjs/nestjs-original.svg" title="NESTJS" alt="NESTJS" width="100" height="100">
   &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="TYPESCRIPT" alt="TYPESCRIPT" width="100" height="100">
  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="REACT" alt="REACT" width="100" height="100">
</p>

# :notebook: Веб приложение Real Time To-Do-List

## Описание
Приложение представляет собой интерфейс реального времени, позволяющий пользователям управлять задачами. Пользователи имеют возможность:
- создавать задачи с заголовком, описанием и статусом;
- просматривать все задачи или фильтровать их по статусу;
- редактировать задачи, изменяя их заголовок, описание или статус, прикреплять изображение;
- удалять задачи.

## Стек технологий
<img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" title="REACT" alt="REACT" width="18" height="18"> Использовалась версия NodeJS: <b>20.13.1</b>
| Инструмент | Описание |
| :--- | :--- |
| ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) | Для создания серверной части использован фреймворк NestJS в сочетании с TypeScript. |
| ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) | Данные пользователей хранятся в объектно-реляционной системе управления базами данных Postgresql. |
| ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) | Взаимодействие с базой данных осуществляется объектно-реляционным отображением Prisma ORM. |
| ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101) | JavaScript-библиотека Socket.io позволяет реализовать интерфейс реального времени при работе с задачами. |
| ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) | Клиентская часть приложения написана на фреймворке для разработки пользовательских интерфейсов React также в связке с TypeScript. |
| ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) | Для стилизации компонентов на фронтенде использован CSS-фреймворк Bootstrap. |
## :arrow_forward: Запуск и настройка

### Сервер
Запустить сервер базы данных на порту, указанном в значении DATABASE_URL файла .env в папке /backend:
```
DATABASE_URL="postgresql://root:root@localhost:3002/to_do_list?schema=public"
```
<i>:exclamation: Если БД на хосте отсутствует, можно запустить Postgresql и Adminer в Docker-контейнерах, находясь в корне проекта:</i>
```
docker compose up -d
```
:arrow_up: <i>В этом случае для просмотра содержимого БД можно подключиться к Adminer по адресу http://localhost:3003.</i><br><br>
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
:bust_in_silhouette: После этого в базе данных появится пользователь с логином <b>user</b> и паролем <b>111</b>.<br>
Выполнив миграцию, можно запускать сервер:
```
npm start
```
В файле .env можно прописать другой порт.<br>
:grey_exclamation: Среди скриптов package.json присутствует общая команда для запуска миграции, сида и самого сервера:
```
npm run start:migrate-seed
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
Клиент запустится по адресу http://localhost:3004.<br>
Порт можно поменять в файле package.json.

### Запуск всего приложения в контейнерах
Файлы Dockerfile в корне проекта позволяют запустить весь проект в контейнерах.<br>
Сначала запустим контейнер с базой данных также на 3002 порту. Можно воспользоваться <i>docker compose</i>. А можно запустить БД командой <i>docker run</i>:
```
docker run -d -p 3002:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=to_do_list --name database_container postgres:14-alpine
```
Далее необходимо узнать адрес запущенного контейнера:
```
docker inspect database_container | grep Gateway
```
Полученное значение прописать в файле .env в папке /backend. Например:
```
DATABASE_URL="postgresql://root:root@172.17.0.1:3002/to_do_list?schema=public"
```
Далее из корня проекта билдим образ с серверной частью приложения:
```
docker build -f dockerfile.server -t to_do_server .
```
И с клиентской частью:
```
docker build -f dockerfile.react -t to_do_client .
```
Осталось запустить сервер и клиент:
```
docker run -p 3001:3001 -p 8001:8001 -d --name server_container to_do_server && docker run -p 3004:3004 -d --name client_container to_do_client
```
Заходим по адресу http://localhost:3004.
