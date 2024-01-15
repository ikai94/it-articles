import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import cls from './Code.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../Icon';
import CopyIconNew from '../../../assets/icons/copy.svg';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    // копирование текста
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                // тег pre сохраняет все отступы в коде
                <pre
                    className={classNames(cls.CodeRedesigned, {}, [className])}
                >
                    {/* code специальный тег для работы с кодом */}
                    <Icon
                        clickable
                        onClick={onCopy}
                        className={cls.copyBtn}
                        Svg={CopyIconNew}
                    />
                    <code>{text}</code>
                </pre>
            }
            off={
                // тег pre сохраняет все отступы в коде
                <pre className={classNames(cls.Code, {}, [className])}>
                    {/* code специальный тег для работы с кодом */}
                    <Button
                        onClick={onCopy}
                        className={cls.copyBtn}
                        theme={ButtonTheme.CLEAR}
                    >
                        <CopyIcon className={cls.copyIcon} />
                    </Button>
                    <code>{text}</code>
                </pre>
            }
        />
    );
});
