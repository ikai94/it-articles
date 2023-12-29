import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FiltersContainer } from './FiltersContainer';

export default {
    title: 'shared/FiltersContainer',
    component: FiltersContainer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof FiltersContainer>;

const Template: ComponentStory<typeof FiltersContainer> = (args) => (
    <FiltersContainer {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
