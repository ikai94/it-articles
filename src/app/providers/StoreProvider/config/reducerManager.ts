import {
    AnyAction, ReducersMapObject, combineReducers, Reducer,
} from '@reduxjs/toolkit';
import {
    MountedReducers, ReducerManager, StateSchema, StateSchemaKey,
} from './StateSchema';

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
    // принятие начальных рельюсеров
    const reducers = { ...initialReducers };

    // создание корневого редьюсера
    let combinedReducer = combineReducers(reducers);

    // хранит в себе название редьюсеров которые хотим удалить.
    let keysToRemove: Array<StateSchemaKey> = [];

    // объект с монтированными уже редьюсерами
    const mountedReducers: MountedReducers = {};

    return {
        getReducerMap: () => reducers,
        getMountedReducers: () => mountedReducers,
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }

            return combinedReducer(state, action);
        },

        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;
            // по ключу изменяем название на true
            mountedReducers[key] = true;
            combinedReducer = combineReducers(reducers);
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];
            mountedReducers[key] = false;
            keysToRemove.push(key);

            combinedReducer = combineReducers(reducers);
        },
    };
}
