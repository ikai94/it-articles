import webpack from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

// Этот конфиг был создан для storybook
// делаем деструктуризацию конфига webpack и достаем от туда поле объекта config
export default ({ config }: {config: webpack.Configuration}) => {
    // указываем путь до папки src в котором лежит storybook (делаем два выхода из директории)
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    // запушиваем в конфиг через resolve путь к папке src
    config.resolve?.modules?.push(paths.src);
    // запушиваем расширения типов в конфиг через resolve
    config.resolve?.extensions?.push('.ts', '.tsx');
    // запушиваем loader который мы создали как отдельную функцию, и передаем аргументов значение true, так как это config

    if (config.module?.rules !== undefined) {
        // Правило для svg
        // eslint-disable-next-line no-param-reassign
        config.module.rules = config.module.rules.map((rule: any) => {
            if (/svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i };
            }
            return rule;
        });
    }

    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config.module?.rules?.push(buildCssLoader(true));
    // возвращаем этот же самый конфиг уже измененный
    return config;
};