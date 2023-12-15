import { FeatureFlags } from '@/shared/types/featureFlags';

/**
 * отсутствие экспорта позволяет не затереть случайно значение в этой константе. Изменить можно только через сетер setFeatureFlags
 */
let featureFlags: FeatureFlags;

/**
 * флаг для отрисовки компонентов (не реактивный). Значение указывается в базе данных, и отрисовывает определенным пользователям
 * @param newFeatureFlags
 */
export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

/**
 * получение флага
 * @param flag - передаем значение по ключу
 */
export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags[flag];
}
