import type { ComponentMeta, Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import MainPage from './MainPage';

const meta: Meta<typeof MainPage> = {
    title: 'pages/MainPage',
    // добавление компонента в сторибук
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof MainPage>;

// создание каждой темы
export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    // Добавление декоратора с темой
    decorators: [ThemeDecorator(Theme.DARK)],
};
