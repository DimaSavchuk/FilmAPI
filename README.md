![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

# FilmAPI

Серверне апі для зберігання інформації про фільми, із можливістю реєстрації та авторизації. / Server app for storing information about films, with the possibility of registration and authorisation.

## Встановлення та запуск / Get it up and running
* Переконайся, що на комп'ютері встановлена LTS-версія Node.js та MongoDB. / Make sure you have the LTS version of Node.js and MongoDB installed on your computer.
* Встановіть базові залежності проекту командою ```npm install``` / Install the basic project dependencies with the command ```npm install```
* Створіть базу даних MongoDB та налаштуйте налаштуйте її. / Create a MongoDB database and configure it.
* Створіть файл ```env.``` у папці config та налаштуйте його / Create the ```env.``` file in the config folder and configure it: 
```    
Приклад налаштування / Example of setting up

PORT=
DB_URL=
USER=
```
* Запустіть локальний сервер за допомогою команди ``` npm start``` / Start the local server using the command ```npm start```
* Перевірити роботу запитів ви можете за допомогою `Postman`, для перевірки запитів / You can check the operation of requests using `Postman`, to check requests
