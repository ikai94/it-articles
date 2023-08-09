import type { ComponentMeta, Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { PageError } from './PageError';

const meta: Meta<typeof PageError> = {
    title: 'widgets/PageError',
    // добавление компонента в сторибук
    component: PageError,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PageError>;

export default meta;
type Story = StoryObj<typeof PageError>;

// создание каждой темы в сайтбаре
export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    // Добавление декоратора с темой
    decorators: [ThemeDecorator(Theme.DARK)],
};
