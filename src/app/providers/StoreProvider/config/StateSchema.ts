import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { loginSchema } from 'features/AuthByUsername';
import { NavigateOptions, To } from 'react-router-dom';
import { ArticleDetailsSchema } from 'entities/Article';

export interface StateSchema {
   counter: CounterSchema;
   user: UserSchema;

   // Асинхронные редюсеры
   loginForm?: loginSchema;
   profile?: ProfileSchema;
   articleDetails?: ArticleDetailsSchema;
}

// достаем ключи при помощи keyof, помогает при автокомплиде и просто типиизован
export type StateSchemaKey = keyof StateSchema;

// для типизации мэнэджера
export interface ReducerManager {
   getReducerMap: () => ReducersMapObject<StateSchema>;
   reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
   add: (key: StateSchemaKey, reducer: Reducer) => void;
   remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
   reducerManager: ReducerManager,
}

export interface ThunkExtraArg {
   api: AxiosInstance;
   navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
   rejectValue: T;
   extra: ThunkExtraArg;
   state: StateSchema;
}
