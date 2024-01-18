import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { FeaturesFlagsDecorator } from '@/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';

export default {
    title: 'entities/Comments/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

const normalArg = {
    comment: {
        id: '1',
        text: 'hello',
        user: { id: '1', username: 'admin' },
    },
};

export const Normal = Template.bind({});
Normal.args = normalArg;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArg;
NormalRedesigned.decorators = [
    FeaturesFlagsDecorator({ isAppRedesigned: true }),
];

export const Loading = Template.bind({});
Loading.args = {
    ...normalArg,
    isLoading: true,
};
