import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { counterReducers } from 'entities/Counter';
import { userReducers } from 'entities/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './reducerManager';

// Создание хранилища Redux, создание отдельной функции позволяет перееиспользовать для сторибука или джеста
export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    // создание отдельной переменной для вынесения редьюсеров
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        // в корневом редюсере отсавлять только те, которые являются обязательные, чанки и асинхронные не добавляь
        counter: counterReducers,
        user: userReducers,
    };

    // инициализация редьюс менеджера
    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore<StateSchema>({
        // добавление редьюсеров в сторе
        reducer: reducerManager.reduce,
        // отключение девтулзов для продакшена
        devTools: __IS_DEV__,
        // подготовка необходимых данных для тестов и сторибука (задаем первоначальные состояния). Принимаем их аргументом
        preloadedState: initialState,
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
