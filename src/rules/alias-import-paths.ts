import { createRule, isParentFolder, isSameFolder, getAbsolutePath } from '../utils';

interface IOptions {
  allowSameFolder?: boolean;
  rootDir: string;
  prefix: string;
  ignoredFolders: string[];
}

type MessageIds = 'default';

const NAME = 'alias-import-paths';

// @ts-check
/** @type {import('eslint').Rule.RuleModule} */
const value = createRule<[IOptions], MessageIds>({
  create(context, [options]) {
    const { allowSameFolder, rootDir, prefix, ignoredFolders } = options;

    return {
      ImportDeclaration: node => {
        const path = node.source.value;

        if (ignoredFolders?.length) {
          const folderPath = getAbsolutePath(context, path, rootDir, prefix);
          if (ignoredFolders.find(f => folderPath.includes(f))) return;
        }

        if (isParentFolder(context, path, rootDir)) {
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

        if (isSameFolder(path) && !allowSameFolder) {
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
      allowSameFolder: false,
      rootDir: '',
      prefix: '',
      ignoredFolders: [],
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
        allowSameFolder: true,
        rootDir: '',
        prefix: '',
        ignoreFolders: [],
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
