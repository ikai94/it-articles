export interface User {
    id: string;
    username: string;
    avatar?: string
}

// интерфейс для стейта юзер
export interface UserSchema {
  authData?: User;
  _inited: boolean;
}
