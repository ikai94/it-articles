import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Suspense } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    // пропс отвечают за видимость модального окна
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = (props: LoginModalProps) => {
    const {
        className,
        isOpen,
        onClose,
    } = props;

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            {/* используем suspense для отображения лоадера в случаи долгой загруки */}
            <Suspense fallback={<Loader />}>
                {/* передаем непосредственно асинхронный компонент */}
                <LoginFormAsync />
            </Suspense>
        </Modal>
    );
};
