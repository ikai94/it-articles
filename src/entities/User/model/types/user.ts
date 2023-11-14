export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
}

// интерфейс для стейта юзер
export interface UserSchema {
  authData?: User;
  _inited: boolean;
}
