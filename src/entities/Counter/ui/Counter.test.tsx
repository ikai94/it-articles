import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
    test('test render', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } },
        });
        expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    });

    test('increment', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } },
        });
        // проверка нажатия на кнопку
        userEvent.click(screen.getByTestId('increment-btn'));
        // результат передачи данных на поле вывода
        expect(screen.getByTestId('value-title')).toHaveTextContent('11');
    });

    test('decrement', () => {
        componentRender(<Counter />, {
            initialState: { counter: { value: 10 } },
        });
        // проверка нажатия на кнопку
        userEvent.click(screen.getByTestId('decrement-btn'));
        // результат передачи данных на поле вывода
        expect(screen.getByTestId('value-title')).toHaveTextContent('9');
    });
});
