import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCardRedesigned } from './ProfileCardRedesigned';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/storybook.jpg';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
    title: 'entities/Profile/ProfileCardRedesigned',
    component: ProfileCardRedesigned,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCardRedesigned>;

const Template: ComponentStory<typeof ProfileCardRedesigned> = (args) => (
    <ProfileCardRedesigned {...args} />
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
Normal.decorators = [NewDesignDecorator];
