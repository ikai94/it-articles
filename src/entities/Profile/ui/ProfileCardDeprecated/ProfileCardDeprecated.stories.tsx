import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCardDeprecated } from './ProfileCardDeprecated';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';

export default {
    title: 'entities/Profile/ProfileCardDeprecated',
    component: ProfileCardDeprecated,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCardDeprecated>;

const Template: ComponentStory<typeof ProfileCardDeprecated> = (args) => (
    <ProfileCardDeprecated {...args} />
);

const normalArg = {
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

export const Normal = Template.bind({});
Normal.args = normalArg;
