import { createSelector } from '@reduxjs/toolkit';
import { getCounter } from '../getCounter/getCounter';
import { CounterSchema } from '../../types/counterSchema';

// это реселект, он использует состояния селекторов и мемоизирует их (можно прочитать в реселект документации). Здесь один селектор getCoounter и состояние взято только его, но можно добавлять еще и брать состояние других селекторов и работать с ними
export const getCounterValue = createSelector(
    getCounter,
    (counter: CounterSchema) => counter.value,
);
