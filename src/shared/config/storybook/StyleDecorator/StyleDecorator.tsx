// eslint-disable-next-line kai-plugin/layer-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';

// это декоратор роль которого возвращать стори, согласно документации
export const StyleDecorator = (story: () => Story) => story();
