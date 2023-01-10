import { createRule, isParentFolder, isSameFolder, getAbsolutePath } from '../utils';

interface IOptions {
  allowSameFolder: boolean;
  rootDir: string;
  prefix: string;
}

const NAME = 'no-none-root-import-paths';

const value = createRule<IOptions[], string>({
  create(context) {
    const { allowSameFolder, rootDir, prefix } = {
      allowSameFolder: context.options[0]?.allowSameFolder || false,
      rootDir: context.options[0]?.rootDir || '',
      prefix: context.options[0]?.prefix || '',
    };

    console.log('>', allowSameFolder, rootDir, prefix);

    return {
      ImportDeclaration: function (node: any) {
        const path = node.source.value;
        console.log('path', path);

        if (isParentFolder(path, context, rootDir)) {
          context.report({
            node,
            messageId: 'default',
            fix: fixer => {
              return fixer.replaceTextRange(
                [node.source.range[0] + 1, node.source.range[1] - 1],
                getAbsolutePath(path, context, rootDir || '', prefix),
              );
            },
          });
        }

        if (isSameFolder(path) && !allowSameFolder) {
          context.report({
            node,
            messageId: 'default',
            fix: function (fixer: any) {
              return fixer.replaceTextRange(
                [node.source.range[0] + 1, node.source.range[1] - 1],
                getAbsolutePath(path, context, rootDir || '', prefix),
              );
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Import statements should have an absolute path.',
      recommended: false,
      requiresTypeChecking: true,
    },
    fixable: 'code',
    messages: {
      default: 'Import statements should have an absolute path.',
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
