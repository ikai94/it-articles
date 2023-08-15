import { Story } from '@storybook/react';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

// декоратор темы который возвращает jsx разметку
// здесь мы делаем механизм замыканий, которая из функции будет возвращать функцию, в данном случаи сам декоратор

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    </ThemeProvider>

);
