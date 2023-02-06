import base from './configs/base';
import recommended from './configs/recommended';
import aliasImportPaths from './rules/alias-import-paths';
import featureSliceIsolation from './rules/feature-slice-isolation';

const configuration = {
  rules: {
    [aliasImportPaths.name]: aliasImportPaths.value,
    [featureSliceIsolation.name]: featureSliceIsolation.value,
  },
  configs: {
    base,
    recommended,
  },
};

export = configuration;
