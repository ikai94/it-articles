import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localestorage';

// установка ахиоса
export const $api = axios.create({
    // базовый адрес
    baseURL: __API__,
});

// отрабаывает перед запросом
$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    }
    return config;
});
