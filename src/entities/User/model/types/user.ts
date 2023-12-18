import { UserRole } from '../consts/UserRoleConsts';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { JsonSettings } from '../../model/types/jsonSettings';

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
}

// интерфейс для стейта юзер
export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
