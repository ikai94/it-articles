import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/UserRoleConsts';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

// проходимся по массиву и проверяем есть ли "ADMIN", если есть возвращает true
export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.ADMIN)),
);
export const isUserManager = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(UserRole.MANAGER)),
);
