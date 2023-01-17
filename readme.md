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
      [{ "allowSameFolder": true, "rootDir": "", "prefix": "" }]
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
