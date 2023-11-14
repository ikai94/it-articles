import { Story } from '@storybook/react';
import { Suspense } from 'react';
// это декоратор роль которого возвращать сториc обвернутый в роутер дом для отображения в сторибук
export const SuspenseDecorator = (StoryComponent: Story) => (
    <Suspense>
        <StoryComponent />
    </Suspense>
);
