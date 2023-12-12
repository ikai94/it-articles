import { Project } from 'ts-morph';
// работа с нодами
const project = new Project({});

// добавляем файлы с исходным кодом
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// получаем все файлы нашего проекта
const files = project.getSourceFiles();

// проверка на начальный текст строки, если есть то возвращает true
function isAbsolute(value: string) {
    const layers = [
        'app',
        'shared',
        'entities',
        'features',
        'widgets',
        'pages',
    ];
    return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
    // все ноды которые в нашем проекте
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();

        // проверка и изменение
        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

// сохранение
project.save();
