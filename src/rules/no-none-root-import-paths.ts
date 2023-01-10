import { createRule } from '../utils';
import path from 'path';

function isParentFolder(relativeFilePath: string, context: any, rootDir: string) {
  const absoluteRootPath = context.getCwd() + (rootDir !== '' ? path.sep + rootDir : '');
  const absoluteFilePath = path.join(path.dirname(context.getFilename()), relativeFilePath);

  return (
    relativeFilePath.startsWith('../') &&
    (rootDir === '' ||
      (absoluteFilePath.startsWith(absoluteRootPath) &&
        context.getFilename().startsWith(absoluteRootPath)))
  );
}

function isSameFolder(path: string) {
  return path.startsWith('./');
}

function getAbsolutePath(relativePath: string, context: any, rootDir: string, prefix: string) {
  return [
    prefix,
    ...path
      .relative(
        context.getCwd() + (rootDir !== '' ? path.sep + rootDir : ''),
        path.join(path.dirname(context.getFilename()), relativePath),
      )
      .split(path.sep),
  ]
    .filter(String)
    .join('/');
}

const message = 'import statements should have an absolute path';
const NAME = 'no-none-root-import-paths';

const value = createRule({
  create: function (context: any) {
    const { allowSameFolder, rootDir, prefix } = {
      allowSameFolder: context.options[0]?.allowSameFolder || false,
      rootDir: context.options[0]?.rootDir || '',
      prefix: context.options[0]?.prefix || '',
    };

    return {
      ImportDeclaration: function (node: any) {
        const path = node.source.value;
        console.log('path', path);

        if (isParentFolder(path, context, rootDir)) {
          context.report({
            node,
            message: message,
            fix: function (fixer: any) {
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
            message: message,
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
      description: 'Ensures multiple inline imports are broken into multiple lines.',
      recommended: false,
      requiresTypeChecking: true,
    },
    fixable: 'code',
    messages: {
      default: 'Each import should be on an individual line.',
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
