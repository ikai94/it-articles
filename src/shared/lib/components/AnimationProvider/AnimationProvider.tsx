// для коректной работы необходимо из библиотек вывести типы
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}

// создаем контекст
const AnimationContext = createContext<AnimationContextPayload>({});

// подгрузка асинхронных библиотек, Lazy/ просто импорт используется внутри функции или где угодно, для подтягивания какого то модуля, пакета или json файла
// зависят друг от друга
const getAsyncAnimationModules = async () => {
    return Promise.all([
        import('@react-spring/web'),
        import('@use-gesture/react'),
    ]);
};

// хук для контекста Required<AnimationContextPayload> - указываем что он вернет все поля в обязательном случаи, дабы не указывать проверку на undefined
export const useAnimationLibs = () => {
    return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const SpringRef = useRef<SpringType>();
    const GestureRef = useRef<GestureType>();
    const [isLoaded, setIsLoaded] = useState(false);

    // сохранение библиотек в ref
    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring;
            GestureRef.current = Gesture;
            // сообщаем что библиотеки подкючились успешно
            setIsLoaded(true);
        });
    }, []);

    const value = useMemo(
        () => ({
            Gesture: GestureRef.current,
            Spring: SpringRef.current,
            isLoaded,
        }),
        [isLoaded],
    );

    return (
        // передаем библиотеки которые получили в ref
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
};
