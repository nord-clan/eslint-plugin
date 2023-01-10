export = {
  extends: ['./configs/base'],
  rules: {
    '@nord-clan/class-element-sorting': 'error',
    '@nord-clan/feature-slice-isolation': [
      'error',
      { allowSameFolder: true, rootDir: '', prefix: '' },
    ],
    '@nord-clan/alias-import-paths': [
      'error',
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
  },
};
