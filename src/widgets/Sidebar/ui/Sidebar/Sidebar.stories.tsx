import type { ComponentMeta, Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
    title: 'widgets/Sidebar',
    // добавление компонента в сторибук
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

// создание каждой темы в сайтбаре
export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    // Добавление декоратора с темой
    decorators: [ThemeDecorator(Theme.DARK)],
};
