import {
    CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducers } from '@/entities/Counter';
import { userReducers } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { uiReducers } from '@/features/UI';
import { rtkApi } from '@/shared/api/rtkApi';
import { StateSchema, ThunkExtraArg } from './StateSchema';
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
        ui: uiReducers,
        // добавляем rtkapi
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    // инициализация редьюс менеджера
    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        // добавление редьюсеров в сторе
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        // отключение девтулзов для продакшена
        devTools: __IS_DEV__,
        // подготовка необходимых данных для тестов и сторибука (задаем первоначальные состояния). Принимаем их аргументом
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: extraArg,
            },
        }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

// получение типа диспатча (выделяется в квадратные скобки)
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
