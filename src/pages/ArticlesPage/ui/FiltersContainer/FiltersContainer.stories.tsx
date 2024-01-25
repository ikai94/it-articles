import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FiltersContainer } from './FiltersContainer';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'pages/ArticlePage/FiltersContainer',
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
Normal.decorators = [StoreDecorator({}), NewDesignDecorator];
