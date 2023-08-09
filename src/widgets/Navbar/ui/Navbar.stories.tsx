import type { ComponentMeta, Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
    title: 'widgets/Navbar',
    // добавление компонента в сторибук
    component: Navbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;

// создание каждой темы в сайтбаре
export const Light: Story = {
    args: {},
};

export const Dark: Story = {
    args: {},
    // Добавление декоратора с темой
    decorators: [ThemeDecorator(Theme.DARK)],
};
