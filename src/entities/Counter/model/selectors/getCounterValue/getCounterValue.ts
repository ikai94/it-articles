import { buildSelector } from '@/shared/lib/store';

// это реселект, он использует состояния селекторов и мемоизирует их (можно прочитать в реселект документации). Здесь один селектор getCoounter и состояние взято только его, но можно добавлять еще и брать состояние других селекторов и работать с ними
export const [useCounterValue, getCounterValue] = buildSelector(
    (state) => state.counter.value,
);
