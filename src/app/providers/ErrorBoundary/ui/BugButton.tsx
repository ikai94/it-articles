import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';

interface BugButtonProps {
    className?: string;
}

// Компонент для тестирования ErrorBoundary

export const BugButton = ({ className }: BugButtonProps) => {
    const { t } = useTranslation();
    const [error, setError] = useState(false);

    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        <Button onClick={onThrow} className={classNames('', {}, [className])}>
            {t('throw error')}
        </Button>
    );
};
