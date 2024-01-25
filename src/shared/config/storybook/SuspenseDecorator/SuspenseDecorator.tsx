import { Story } from '@storybook/react';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n/i18n';
// это декоратор роль которого возвращать сториc обвернутый в роутер дом для отображения в сторибук
export const SuspenseDecorator = (StoryComponent: Story) => (
    <Suspense>
        <I18nextProvider i18n={i18n}>
            <StoryComponent />
        </I18nextProvider>
    </Suspense>
);
