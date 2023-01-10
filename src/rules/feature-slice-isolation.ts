import { getByValue, createRule, getParsedPath } from '../utils';

interface IOptions {
  layers: Map<number, string>;
}

type MessageIds = 'default';

const NAME = 'feature-slice-isolation';

const value = createRule<[IOptions], MessageIds>({
  create(context, [options]) {
    //* ├── app         # Инициализирующая логика приложения
    //* ├── processes   # (Опц.) Процессы приложения, протекающие над страницами
    //* ├── pages       # Страницы приложения
    //* ├── widgets     # Самостоятельные и полноценные блоки для страниц
    //* ├── features    # (Опц.) Обрабатываемые пользовательские сценарии
    //* ├── entities    # (Опц.) Бизнес-сущности, которыми оперирует предметная область
    //* ├── shared      # Переиспользуемые модули, без привязки к бизнес-логике

    for (let [key, value] of (context.options[0]?.layers ?? [])?.entries()) {
      options.layers.set(key, value);
    }

    return {
      ImportDeclaration: node => {
        const { dir } = getParsedPath(context);
        const { layers } = options;

        const folderLayer =
          getByValue(
            layers,
            [...layers.values()].find(f => dir.includes(f)),
          ) ?? 0;

        const importLayer =
          getByValue(
            layers,
            [...layers.values()].find(f => node.source.value.includes(f)),
          ) ?? 0;

        if (importLayer && importLayer >= folderLayer) {
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
      layers: new Map([
        [0, 'none'],
        [1, 'app'],
        [2, 'processes'],
        [3, 'pages'],
        [4, 'widgets'],
        [5, 'features'],
        [6, 'entities'],
        [7, 'shared'],
      ]),
    },
  ],
  meta: {
    docs: {
      description:
        'Each layer is located only at the topmost level, and cannot occur again at another nesting level.',
      recommended: false,
      requiresTypeChecking: true,
    },
    fixable: 'code',
    messages: {
      default:
        'Each layer is located only at the topmost level, and cannot occur again at another nesting level.',
    },
    schema: [],
    type: 'layout',
  },
  name: NAME,
});

// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
export default {
  name: NAME,
  value,
};
