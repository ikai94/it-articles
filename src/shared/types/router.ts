import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line kai-plugin/layer-imports
import { UserRole } from '@/entities/User';

// расширяем значение встроенной библиотеки пропсов
// если значение будет true, то будет доступно только авторизованным пользователям(Profile)
export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
}
