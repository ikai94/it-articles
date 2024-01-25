import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';
import { Theme } from '@/shared/const/theme';
import avatar from '@/shared/assets/tests/storybook.jpg';

export default {
    title: 'widgets/ArticleAdditionalInfo',
    component: ArticleAdditionalInfo,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleAdditionalInfo>;

const Template: ComponentStory<typeof ArticleAdditionalInfo> = (args) => (
    <ArticleAdditionalInfo {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    author: {
        id: '2',
        features: { isAppRedesigned: true },
        avatar,
        username: 'admin',
        jsonSettings: {
            theme: Theme.LIGHT,
        },
    },
    views: 12222,
    createdAt: '12.12.2024',
};
