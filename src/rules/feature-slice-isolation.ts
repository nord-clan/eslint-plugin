import { createRule, isParentFolder, isSameFolder, getAbsolutePath, getParsedPath } from '../utils';

interface IOptions {
  layers: string[];
}

const NAME = 'feature-slice-isolation';

const value = createRule<IOptions[], string>({
  create(context) {
    const { layers } = {
      layers: context.options[0]?.layers || [],
    };

    return {
      ImportDeclaration: node => {
        const parsed = getParsedPath(context);
        console.log('>>>>>>>>>>>>>>', parsed);

        parsed.dir.split('/').forEach(directory => console.log('> > > > ', directory));
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
