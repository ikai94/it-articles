import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localestorage';

// установка ахиоса
export const $api = axios.create({
    // базовый адрес
    baseURL: __API__,
    // заголовок для получения данных авторизованных пользователей
    headers: {
        // получение по ключу в локалсторедж. Если авторизованы, то данные есть, а если нет, то undefined
        authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    },
});
