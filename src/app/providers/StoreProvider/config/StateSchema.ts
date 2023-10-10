import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { loginSchema } from 'features/AuthByUsername';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { UISchema } from 'features/UI';

export interface StateSchema {
   counter: CounterSchema;
   user: UserSchema;
   ui: UISchema;

   // Асинхронные редюсеры
   loginForm?: loginSchema;
   profile?: ProfileSchema;
   articleDetails?: ArticleDetailsSchema;
   addCommentForm?: AddCommentFormSchema;
   articlesPage?: ArticlesPageSchema;
   articleDetailsPage?: ArticleDetailsPageSchema;
}

// достаем ключи при помощи keyof, помогает при автокомплиде и просто типизирован
export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

// для типизации мэнэджера
export interface ReducerManager {
   getReducerMap: () => ReducersMapObject<StateSchema>;
   reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
   add: (key: StateSchemaKey, reducer: Reducer) => void;
   remove: (key: StateSchemaKey) => void;
   // true - вмонтирован, false - демонтирован
   getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
   reducerManager: ReducerManager,
}

export interface ThunkExtraArg {
   api: AxiosInstance;
}

export interface ThunkConfig<T> {
   rejectValue: T;
   extra: ThunkExtraArg;
   state: StateSchema;
}
