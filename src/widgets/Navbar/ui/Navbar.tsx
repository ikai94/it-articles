import { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { LoginModal } from 'features/AuthByUsername';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    // для всех функций которые передаются как пропсы, необходимо мемоизировать для сохранения первоначальных ссылок
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    // отвечает за отображение модального окна и вешается на кнопку
    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    // отвечает за выход из авторизации
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    // проверка авторизации пользователя с последующей перерисовкой
    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    className={cls.links}
                    onClick={onLogout}
                >
                    {t('Выйти')}
                </Button>

            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>
            <LoginModal
                isOpen={isAuthModal}
                onClose={onCloseModal}
            />
        </div>
    );
};
