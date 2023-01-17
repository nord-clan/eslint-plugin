# @nord-clan/eslint-plugin

## Enabling the plugin

Modify your `.eslintrc` file to load the plugin and enable the rules you want to use.

```json
{
  "plugins": ["@nord-clan"],
  "extends": ["plugin:@nord-clan"],
  "rules": {
    "@nord-clan/class-element-sorting": "error",
    "@nord-clan/alias-import-paths": [
      "error",
      { "paths": [{ "allowSameFolder": true, "rootDir": "", "prefix": "" }] }
    ],
    "@nord-clan/feature-slice-isolation": [
      "error",
      {
        "layers": {
          "1": "app",
          "2": "processes",
          "3": "pages",
          "4": "widgets",
          "5": "features",
          "6": "entities",
          "7": "shared"
        },
        "allowedFolders": []
      }
    ]
  }
}
```

### Example for

```ts
'@nord-clan/alias-import-paths': [
  'error',
  {
    paths: [
      {
        ignoredFolders: [],
        allowSameFolder: true,
        rootDir: 'src/components',
        prefix: '#/ui-kit'
      }
    ]
  }
],
```

> reference import
> ![image](https://user-images.githubusercontent.com/102309602/212839829-f26ef6f3-dbf9-4b2a-a6b6-092066f8b1e0.png)

> eslint auto fixed into <br />
> ![image](https://user-images.githubusercontent.com/102309602/212839994-8a432b85-5591-404d-877d-af060b16301e.png)
