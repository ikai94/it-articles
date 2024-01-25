import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from '../../../Button/Button';
import { Dropdown } from './Dropdown';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'shared/Popups/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
        {
            content: 'third',
        },
    ],
};

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = {
    trigger: <Button>Open</Button>,
    items: [
        {
            content: 'first',
        },
        {
            content: 'second',
        },
        {
            content: 'third',
        },
    ],
};
NormalRedesigned.decorators = [NewDesignDecorator];
