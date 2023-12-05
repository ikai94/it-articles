// eslint-disable-next-line kai-plugin/layer-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

// это декоратор роль которого возвращать сториc обвернутый в роутер дом для отображения в сторибук
export const RouteDecorator = (StoryComponent: Story) => (
    <BrowserRouter>
        <StoryComponent />
    </BrowserRouter>
);
