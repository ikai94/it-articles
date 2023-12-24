import {
    ImgHTMLAttributes,
    memo,
    ReactElement,
    useLayoutEffect,
    useState,
} from 'react';

/**
 * компонент, который отвечает за картинку
 */
interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    /**
     * скелетон, который будет подгружаться во время загрузки картинки
     */
    fallback?: ReactElement;
    /**
     * ошибка
     */
    errorFallback?: ReactElement;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        fallback,
        errorFallback,
        ...otherProps
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    /**
     * useLayoutEffect - вызывается до того как компонент вмонтируется
     */
    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }

    return <img className={className} src={src} alt={alt} {...otherProps} />;
});
