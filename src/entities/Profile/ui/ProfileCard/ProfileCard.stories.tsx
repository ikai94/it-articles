import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import avatar from 'shared/assets/tests/storybook.jpg';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        first: 'admin',
        lastname: 'admin',
        age: 22,
        username: 'admin',
        country: Country.Russia,
        city: 'Krasnodar',
        currency: Currency.RUB,
        avatar,
    },
};
Primary.decorators = [StoreDecorator({})];

export const isLoading = Template.bind({});
isLoading.args = {
    isLoading: true,
};

export const withError = Template.bind({});
withError.args = {
    error: 'true',
};
