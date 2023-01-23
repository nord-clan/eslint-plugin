import { createRule, getParsedPath } from '../utils';

interface IOptions {
  layers: Record<number, string>;
  allowedFolders?: string[];
  isAllowedSameLayer?: boolean;
}

type MessageIds = 'default';

const NAME = 'feature-slice-isolation';

// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
const value = createRule<[IOptions], MessageIds>({
  create(context, [options]) {
    //* ├── app         # Инициализирующая логика приложения
    //* ├── processes   # (Опц.) Процессы приложения, протекающие над страницами
    //* ├── pages       # Страницы приложения
    //* ├── widgets     # Самостоятельные и полноценные блоки для страниц
    //* ├── features    # (Опц.) Обрабатываемые пользовательские сценарии
    //* ├── entities    # (Опц.) Бизнес-сущности, которыми оперирует предметная область
    //* ├── shared      # Переиспользуемые модули, без привязки к бизнес-логике

    const { layers, allowedFolders = [], isAllowedSameLayer = true } = options;

    const entries = Object.entries(layers);
    for (let [key, value] of entries) {
      layers[key as unknown as number] = value;
    }

    return {
      ImportDeclaration: node => {
        const { dir } = getParsedPath(context);

        const folderLayer = [...entries.values()].find(f => dir.includes(f[1]))?.[0];
        const importLayer = [...entries.values()].find(f => node.source.value.includes(f[1]))?.[0];

        if (!folderLayer || !importLayer) return;
        if (
          allowedFolders.find(
            f =>
              f === layers[importLayer as unknown as number] ||
              f === layers[folderLayer as unknown as number],
          )
        )
          return;

        if (
          !!importLayer && isAllowedSameLayer
            ? importLayer < folderLayer
            : importLayer <= folderLayer
        ) {
          context.report({
            node,
            messageId: 'default',
          });
        }
      },
    };
  },
  defaultOptions: [
    {
      layers: {
        1: 'app',
        2: 'processes',
        3: 'pages',
        4: 'widgets',
        5: 'features',
        6: 'entities',
        7: 'shared',
      },
      allowedFolders: [],
      isAllowedSameLayer: true,
    },
  ],
  meta: {
    docs: {
      description:
        'Each layer is located only at the topmost level, and cannot occur again at another nesting level.',
      recommended: false,
    },
    fixable: 'code',
    messages: {
      default:
        'Each layer is located only at the topmost level, and cannot occur again at another nesting level.',
    },
    schema: [
      {
        layers: {
          0: 'none',
          1: 'app',
          2: 'processes',
          3: 'pages',
          4: 'widgets',
          5: 'features',
          6: 'entities',
          7: 'shared',
        },
        allowedFolders: [],
        isAllowedSameLayer: true,
      },
    ],
    type: 'layout',
  },
  name: NAME,
});

export default {
  name: NAME,
  value,
};
