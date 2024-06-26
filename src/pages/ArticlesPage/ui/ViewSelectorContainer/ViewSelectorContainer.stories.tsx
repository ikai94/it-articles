import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ViewSelectorContainer } from './ViewSelectorContainer';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'pages/ArticlePage/ViewSelectorContainer',
    component: ViewSelectorContainer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ViewSelectorContainer>;

const Template: ComponentStory<typeof ViewSelectorContainer> = (args) => (
    <ViewSelectorContainer {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
