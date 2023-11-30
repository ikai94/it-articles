import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { ProfileCard } from './ProfileCard';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

export default {
    title: 'entities/Profile/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.Russia,
        lastname: 'admin',
        first: 'asd',
        city: 'asf',
        currency: Currency.USD,
        avatar,
    },
};
Normal.decorators = [
    StoreDecorator({}),
];

export const isLoading = Template.bind({});
isLoading.args = {
    isLoading: true,
};

export const withError = Template.bind({});
withError.args = {
    error: 'true',
};
