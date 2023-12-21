import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/deprecated/Button';
import {
    getCounterValue,
    useCounterValue,
} from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions, useCounterActions } from '../model/slice/counterSlice';

export const Counter = () => {
    // диспатчим новые состояние
    const dispatch = useDispatch();
    // используем необходимый нам селектор для получения состояний.
    const counterValue = useCounterValue();
    const { t } = useTranslation();
    const { increment, decrement, add } = useCounterActions();
    const handleInc = () => {
        increment();
    };

    const handleDec = () => {
        decrement();
    };

    const handleIncFive = () => {
        add(5);
    };

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button onClick={handleInc} data-testid="increment-btn">
                {t('increment')}
            </Button>
            <Button onClick={handleDec} data-testid="decrement-btn">
                {t('decrement')}
            </Button>
            <Button onClick={handleIncFive}>{t('addFive')}</Button>
        </div>
    );
};
