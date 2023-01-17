import { createRule, isParentFolder, isSameFolder, getAbsolutePath } from '../utils';

interface IPathSettings {
  allowSameFolder?: boolean;
  rootDir: string;
  prefix: string;
  ignoredFolders: string[];
}

interface IOptions {
  paths: IPathSettings[];
}

type MessageIds = 'default';

const NAME = 'alias-import-paths';

// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
const value = createRule<[IOptions], MessageIds>({
  create(context, [options]) {
    const { paths } = options;

    return {
      ImportDeclaration: node => {
        const path = node.source.value;

        for (let i = 0; i < paths?.length; i += 1) {
          const {
            allowSameFolder = false,
            rootDir,
            prefix,
            ignoredFolders = [],
          } = paths.at(i) as IPathSettings;

          if (ignoredFolders?.length) {
            const folderPath = getAbsolutePath(context, path, rootDir, prefix);
            if (ignoredFolders.find(f => folderPath.includes(f))) {
              continue;
            }
          }

          if (isParentFolder(context, path, rootDir)) {
            fixPath(rootDir, prefix);
            break;
          }
          if (isSameFolder(path) && !allowSameFolder) {
            fixPath(rootDir, prefix);
            break;
          }
        }

        function fixPath(rootDir: string, prefix: string) {
          context.report({
            node,
            messageId: 'default',
            fix: fixer => {
              return fixer.replaceTextRange(
                [node.source.range[0] + 1, node.source.range[1] - 1],
                getAbsolutePath(context, path, rootDir, prefix),
              );
            },
          });
        }
      },
    };
  },
  defaultOptions: [
    {
      paths: [
        {
          allowSameFolder: false,
          rootDir: '',
          prefix: '',
          ignoredFolders: [],
        },
      ],
    },
  ],
  meta: {
    docs: {
      description: 'Import statements should have an absolute path.',
      recommended: false,
    },
    fixable: 'code',
    messages: {
      default: 'Import statements should have an absolute path.',
    },
    schema: [
      {
        paths: [
          {
            allowSameFolder: false,
            rootDir: '',
            prefix: '',
            ignoredFolders: [],
          },
        ],
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
