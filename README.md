# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


ПОСТАНОВКА ЗАДАЧИ
Известная компания, занимающаяся прокатом велосипедов в крупных городах России, испытывает проблемы с частой кражей их имущества (велосипедов). Как возможное решение проблемы, компания хочет вести учёт этих случаев и отслеживать прогресс. Их собственные разработчики уже подготовили серверную часть приложения, вам же требуется реализовать клиентскую часть.

Клиентская часть предназначена как для сотрудников компании, так и для обычных пользователей. Обычному пользователю доступна только ограниченная часть функционала: главная страница и страница с возможностью сообщить о новом случае кражи.

ОПИСАНИЕ API
I. СУЩНОСТИ
Сущность «Ответственный сотрудник»
Название поля	Тип	Значение по умолчанию	Описание
email	string		
E-mail адрес сотрудника

*Обязательное и уникальное поле

firstName	string		Имя сотрудника
lastName	string		Фамилия сотрудника
password	string		
Пароль 

*Обязательное поле

clientId	string		
clientId, уникальный для каждого студента

*Обязательное поле

approved	boolean	
true для первого пользователя, созданного с конкретным clientId. Для всех последующих — false.

Статус сотрудника: одобрен/не одобрен
Сущность «Сообщение о краже»
Название поля	Тип	Значение по умолчанию	Описание
status	string	"new" при создании нового сообщения	
Статус сообщения
Возможные значения:

new
in_progress
done
*Обязательное поле

licenseNumber	string		
Номер лицензии

*Обязательное поле

type
string		
Тип велосипеда
Возможные значения:

general
sport
*Обязательное поле

ownerFullName	string		
ФИО пользователя (арендатора велосипеда)

*Обязательное поле

clientId
string		
clientId, уникальный для каждого студента

*Обязательное поле

createdAt
date
Текущая дата при создании сообщения	
Дата создания сообщения

*Обязательное поле

updatedAt	date	Текущая дата при обновлении сообщения	Дата последнего обновления сообщения
color	string		Цвет велосипеда
date	date		Дата кражи
officer	string		
Ответственный сотрудник

Валидным значением может быть только действующий id ответственного сотрудника из базы

description	string		Дополнительный комментарий
resolution	string		Завершающий комментарий
II. ЗАПРОСЫ
Все запросы работают с форматом JSON, поэтому не забывайте указывать заголовок Content-type: application/json.

POST /api/auth/sign_up	Запрос для создания новой учетной записи в системе.
POST /api/auth/sign_in	Запрос для авторизации существующего пользователя.
В ответе на этот запрос в поле token вы получите токен, который вам нужно использовать для запросов, доступных только авторизованным пользователям. Токен будет действителен в течение 7 дней с даты отправки запроса.

Подсказка: рекомендуется сохранять этот токен в local storage, чтобы не проходить авторизацию постоянно. Токен необходимо передавать в каждом запросе, доступном только авторизованным пользователям в следующем заголовке: Authorization: Bearer <token>.
GET /api/auth/	Запрос для проверки действительности токена. В данном запросе не нужно указывать никакие данные, кроме токена в заголовке Authorization.
POST /api/public/report	Запрос для создания нового сообщения о краже. Этот запрос доступен без авторизации. Его нужно отправлять, когда сообщение о краже создаёт неавторизованный пользователь.
Важно! Во всех следующих запросах clientId указывать НЕ НУЖНО. Они доступны только авторизованным пользователям. ClientId будет автоматически браться из токена ↓
POST /api/cases	Запрос для создания нового сообщения о краже
PUT /api/cases/:id	
Запрос для редактирования сообщения о краже, где :id — идентификатор редактируемого сообщения

Примечание: запись вида :id означает, что запрос имеет динамическую часть, в данном случае id. Двоеточие при запросе опускается, оно нужно только для обозначения динамической части запроса.
DELETE /api/cases/:id	Запрос на удаление сообщения о краже
GET /api/cases	Запрос на получение всех сообщений о краже
GET /api/cases/:id	Запрос на получение информации по конкретному сообщению о краже
POST /api/officers	Запрос для создания нового сотрудника
PUT /api/officers/:id	Запрос на редактирование сотрудника по id (можно использовать, например, для функции «одобрить»)
DELETE /api/officers/:id	Запрос на удаление сотрудника
GET /api/officers	Запрос для получения списка всех сотрудников
GET /api/officers/:id	Запрос для получения информации по конкретному сотруднику
⚡ Полная документация к API бэкенд-части находится по ссылке: https://documenter.getpostman.com/view/18055274/UVRAH6XZ.
ФУНКЦИОНАЛЬНЫЕ ТРЕБОВАНИЯ
ГЛАВНАЯ СТРАНИЦА

Главная страница должна содержать текстовое описание сервиса, возможно, картинки на ваш выбор. Данная страница доступна всем пользователям без авторизации.

ФОРМА АВТОРИЗАЦИИ

Форму авторизации можете расположить на главной странице, в шапке сайта или на отдельной странице — на ваше усмотрение. У авторизованных пользователей должна быть возможность выйти из учетной записи.

СООБЩИТЬ О КРАЖЕ

«Сообщить о краже» должна содержать форму для отправки информации об украденном велосипеде. Форма должна содержать следующие поля:

Номер лицензии (обязательное поле)
ФИО клиента (обязательное поле)
Тип велосипеда (выпадающий список с заранее определенными вариантами, обязательное поле)
Цвет велосипеда
Дата кражи
Дополнительная информация
Страница должна быть доступна всем пользователям без авторизации. Однако, если форму заполняет авторизованный сотрудник (например, если клиент сообщил о краже по телефону), ему доступно ещё одно дополнительное поле: ответственный сотрудник. Поле представляет собой выпадающий список с возможностью выбора из списка всех одобренных сотрудников, которые есть в базе.

СТРАНИЦА РЕГИСТРАЦИИ

На странице регистрации должна находиться форма регистрации со следующими полями:

E-mail (обязательное поле)
Пароль (обязательное поле)
Имя
Фамилия
Client ID (обязательное поле)
При отправке формы регистрации в базе данных создаётся новый сотрудник. Первый созданный сотрудник с конкретным client ID автоматически получит статус одобренного, остальных сотрудников нужно будет одобрить вручную.

СООБЩЕНИЯ О КРАЖАХ

Данная страница должна содержать список всех известных случаев краж (подсказка: это может быть таблица). Отображать служебные поля, например, clientId не нужно. Должна быть возможность удалить сообщение. При клике на одно сообщение из списка должна открываться его детальная страница.

ДЕТАЛЬНАЯ СТРАНИЦА СООБЩЕНИЯ О КРАЖЕ

Детальная страница сообщения должна содержать всю информацию о конкретном случае кражи с возможностью редактирования любого поля, кроме createdAt, updatedAt и clientId. Для полей, которые могут принимать значения из списка необходимо сделать поля соответствующих типов.

Помните, что в списке ответственных сотрудников должны отображаться только одобренные сотрудники.
Поле завершающего комментария (resolution) должно быть доступно только при выборе статуса «завершен», и в таком случае является обязательным. Т.е. нельзя изменить статус на «завершен», не заполнив поле resolution.

URL детальной страницы должен содержать id сообщения. Пример: localhost:3000/cases/12345 откроет страницу сообщения с id 12345.

ОТВЕТСТВЕННЫЕ СОТРУДНИКИ

Данная страница должна содержать список всех доступных сотрудников. Служебные поля (id, clientId, password) отображать не нужно. Должна быть возможность удалить сотрудника. При клике на одну запись из списка должна открываться детальная страница данного сотрудника.

ДЕТАЛЬНАЯ СТРАНИЦА СОТРУДНИКА

На этой странице должна содержаться детальная информация по сотруднику с возможностью редактирования. Нельзя редактировать поля email и clientId. Должна быть возможность одобрить сотрудника/снять одобрение (подсказка: для этого можно использовать тип поля checkbox).

URL детальной страницы должен содержать id сотрудника. Пример: localhost:3000/officers/12345 откроет страницу сотрудника с id 12345.

ТРЕБОВАНИЯ К ИНТЕРФЕЙСУ
В данном проекте нет готового макета и вам необходимо самостоятельно продумать пользовательский интерфейс. Все оформление: цветовая гамма, расположение элементов, шрифты — на ваше усмотрение. Оцениваться интерфейс будет по следующим критериям:

Читабельность: весь текст должен быть хорошо виден и читабелен. Размер шрифта — не менее 13 пикселей.
Доступность: все элементы должны быть доступны для взаимодействия. Не допускается перекрытие другими элементами, «уползание» за край экрана и т.д.
Понятность: пользователю должно быть однозначно понятно, за что отвечает тот или иной элемент интерфейса: кнопка, поле, выпадающий список и т.д.
Адаптивность: интерфейс должен отображаться корректно на любых размерах экрана.

ТРЕБОВАНИЯ К ВЕРСТКЕ
Соблюдайте семантическую вёрстку. На каждой странице должны присутствовать разделы <header>, <main> и <footer>, а также заголовок <h1>. Кнопки должны быть реализованы элементом <button>, элементы дропдауна — списком <select> и так далее.
Если какой-либо элемент доступен для взаимодействия (ссылка, кнопка), при наведении курсора должен появляться cursor: pointer. Внешний вид самого элемента тоже должен меняться при наведении курсора. Пример: нижнее подчеркивание текста у ссылки, другой цвет фона у кнопки и т.д.
Во всех формах сайта присутствуют обязательные поля, поэтому необходимо обязательно продумать валидацию форм. Если пользователь пытается отправить форму с незаполненными обязательными полями, он должен увидеть сообщение об ошибке.
ТРЕБОВАНИЯ К REACT
Интерфейс должен быть поделен на компоненты. Перед началом работы хорошенько обдумайте, какие компоненты вы будете использовать. Деление на компоненты должно быть логичным и оправданным.
В проекте будет использоваться довольно много данных, поэтому рекомендуется использовать более продвинутый инструмент хранения и изменения данных, чем обычный state, например useReducer или Redux.
При написании кода старайтесь следовать принципам KISS (Keep It Short and Simple — не усложняй) и DRY (Don’t Repeat Yourself — не повторяйся).
В остальном техническая сторона реализации проекта — полностью на ваше усмотрение. Можете использовать любые инструменты и дополнительные библиотеки, какие посчитаете нужными, но старайтесь следить за тем, чтобы их применение было оправдано и не усложняло код без необходимости.
