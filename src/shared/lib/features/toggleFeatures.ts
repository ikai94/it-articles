import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from '../features/setGetFeatures';

/**
 * входные параметры для переключения действий
 */
interface ToggleFeaturesOptions<T> {
    name: keyof FeatureFlags;
    on: () => T;
    off: () => T;
}

/**
 * Работает как светофор (переключалка), если передает true, то выполняет on, если false, то off
 * @param off - значение переданное в качестве выполняемого: 1
 * @param on - значение переданное в качестве выполняемого: 2
 * @param name - название выбранного флага
 */
export function toggleFeatures<T>({
    off,
    on,
    name,
}: ToggleFeaturesOptions<T>): T {
    if (getFeatureFlag(name)) {
        return on();
    }
    return off();
}
