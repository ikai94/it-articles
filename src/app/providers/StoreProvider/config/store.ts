import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { counterReducers } from 'entities/Counter';
import { userReducers } from 'entities/User';
import { StateSchema } from './StateSchema';

// Создание хранилища Redux, создание отдельной функции позволяет перееиспользовать для сторибука или джеста
export function createReduxStore(initialState?: StateSchema) {
    // создание отдельной переменной для вынесения редьюсеров
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducers,
        user: userReducers,
    };

    return configureStore<StateSchema>({
        // добавление редьюсеров в сторе
        reducer: rootReducers,
        // отключение девтулзов для продакшена
        devTools: __IS_DEV__,
        // подготовка необходимых данных для тестов и сторибука (задаем первоначальные состояния). Принимаем их аргументом
        preloadedState: initialState,
    });
}
