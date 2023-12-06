import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';

/**
 * NonNullable - указывает что редьюсер должен быть не нулевый!
 */
export type ReducerList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
}

interface DynamicModuleLoaderProps {
    reducers: ReducerList;
    // условие для удаления компонента
    removeAfterUnmount?: boolean;
    children: ReactNode;
}

// переиспользуемый компонент для асинхронных редьюсеров
export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const {
        children,
        reducers,
        removeAfterUnmount = true,
    } = props;

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    // добавляем асинхронный редьюсер менеджер в момомент монтирования компонента, а после этого очищаем когда он уже становится не нужен.
    useEffect(() => {
        // получаем редьюсеры
        const mountedReducers = store.reducerManager.getMountedReducers();
        // при помощи Object.entries проходим по массиву редьюсер и при помощи деструктуризации достаем из кортежа необходимые аргументы, их типизируем.
        Object.entries(reducers).forEach(([name, reducer]) => {
            // проверяем по ключу, вмонтирован редьюсер или нет
            const mounted = mountedReducers[name as StateSchemaKey];
            if (!mounted) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                // добавление рандомного экшена для ослеживания начала монтирования редьюсера
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    // добавление рандомного экшена для ослеживания конца монтирования редьюсера
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
    // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line
        <>
            {children}
        </>
    );
};
