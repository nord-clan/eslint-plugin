import base from './configs/base';
import importDeclarationNewline from './rules/import-declaration-newline';
import noNoneRootImportPaths from './rules/no-none-root-import-paths';
import classElementSorting from './rules/class-element-sorting';

const configuration = {
  rules: {
    [importDeclarationNewline.name]: importDeclarationNewline.value,
    [noNoneRootImportPaths.name]: noNoneRootImportPaths.value,
    [classElementSorting.name]: classElementSorting.value,
  },
  configs: {
    base,
  },
};

export = configuration;
