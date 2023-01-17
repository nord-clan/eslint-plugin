export = {
  extends: ['./configs/base'],
  rules: {
    '@nord-clan/class-element-sorting': 'error',
    '@nord-clan/alias-import-paths': [
      'error',
      { paths: [{ allowSameFolder: true, rootDir: '', prefix: '' }] },
    ],
    '@nord-clan/feature-slice-isolation': [
      'error',
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
      },
    ],
  },
};
