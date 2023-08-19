import { configureStore } from '@reduxjs/toolkit';
import { counterReducers } from 'entities/Counter';
import { StateSchema } from './StateSchema';

// Создание хранилища Redux, создание отдельной функции позволяет перееиспользовать для сторибука или джеста
export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        // добавление редьюсеров в сторе
        reducer: {
            counter: counterReducers,
        },
        // отключение девтулзов для продакшена
        devTools: __IS_DEV__,
        // подготовка необходимых данных для тестов и сторибука (задаем первоначальные состояния). Принимаем их аргументом
        preloadedState: initialState,
    });
}
