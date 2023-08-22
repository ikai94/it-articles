export interface User {
    id: string;
    username: string;
}

// интерфейс для стейта юзер
export interface UserSchema {
  authData?: User;
}
