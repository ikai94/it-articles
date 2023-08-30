import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { profileReducers } from 'entities/Profile';
import { loginReducers } from 'features/AuthByUsername/model/slice/loginSlice';

const defaultAsuncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
    loginForm: loginReducers,
    profile: profileReducers,
};

// декоратор stor для reduxtoolkit
// здесь мы делаем механизм замыканий, которая из функции будет возвращать функцию, в данном случаи сам декоратор
// используем DeepPartial в качестве типа, для того чтоб извлекать только необходимые поля, а не все.
export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsuncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
);
