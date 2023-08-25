import { DeepPartial } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

// декоратор stor для reduxtoolkit
// здесь мы делаем механизм замыканий, которая из функции будет возвращать функцию, в данном случаи сам декоратор
// используем DeepPartial в качестве типа, для того чтоб извлекать только необходимые поля, а не все.
export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: Story) => (
    <StoreProvider initialState={state}>
        <StoryComponent />
    </StoreProvider>

);
