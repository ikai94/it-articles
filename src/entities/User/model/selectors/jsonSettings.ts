import { buildSelector } from '@/shared/lib/store';
import { JsonSettings } from '../../model/types/jsonSettings';

/**
 * получение селектора JsonSettings
 */

const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
    (state) => state.user.authData?.jsonSettings ?? defaultJsonSettings,
);
