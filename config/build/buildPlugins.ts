import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins(
    {
        paths, isDev, apiURL, project,
    }: BuildOptions,
): webpack.WebpackPluginInstance[] {
    const isProd = !isDev;
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        /**
         * Прокидываются глобальные переменные в проект
         */
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiURL),
            __PROJECT__: JSON.stringify(project),
        }),
        // кольцевая зависимость
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
        // проверка на ошибки после сборки
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
    ];

    // при продакшен сборки этих плагинов не будет, сделано для того, чтоб не запускались эти плагины при тестах
    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
        /**
         * Плагин для подгрузки изменений без перезагрузки страницы
         */
        plugins.push(new webpack.HotModuleReplacementPlugin());
        // plugins.push(new BundleAnalyzerPlugin({
        //     openAnalyzer: false,
        // }));
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
        /**
         * патерн для перемещения переводов (откуда и куда)
         */
        plugins.push(
            new CopyPlugin({
                patterns: [
                    { from: paths.locales, to: paths.buildLocales },
                ],
            }),
        );
    }

    return plugins;
}
