import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticlePageGreeting } from './ArticlePageGreeting';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/ArticlePageGreeting',
    component: ArticlePageGreeting,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlePageGreeting>;

const Template: ComponentStory<typeof ArticlePageGreeting> = () => (
    <ArticlePageGreeting />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
