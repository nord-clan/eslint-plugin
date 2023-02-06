<h1>Eslint-плагин замены и проверки путей импортов согласно FSD-методологии.</h1>

`@nord-clan/eslint-plugin`

<a href="http://harbor.nordclan:4873/-/web/detail/@nord-clan/eslint-plugin">Package source</a>

## Подключение плагина

Измените ваш файл `.eslintrc`, чтобы загрузить плагин и включить правила, которые вы хотите использовать.

```json
{
  "plugins": ["@nord-clan"],
  "extends": ["plugin:@nord-clan"],
  "rules": {
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
        "allowedFolders": [],
        "isAllowedSameLayer": true
      }
    ]
  }
}
```

### Пример

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

> первоначальный import
> ![image](https://user-images.githubusercontent.com/102309602/212839829-f26ef6f3-dbf9-4b2a-a6b6-092066f8b1e0.png)

> после форматиравания eslint --fix <br /> ![image](https://user-images.githubusercontent.com/102309602/212839994-8a432b85-5591-404d-877d-af060b16301e.png)

<br />
Утилиты для разработки
<details>
  <summary><a href="https://www.npmjs.com/package/pnpm">pnpm</a></summary>

On macOS, Linux, or Windows Subsystem for Linux:

```shell
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

On Windows (using PowerShell):

```shell
iwr https://get.pnpm.io/install.ps1 -useb | iex
```

На Alpine Linux

```shell
wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm
```

Using npm:

```shell
npx pnpm add -g pnpm
```

(По желанию) pnpm использует форматы npm конфигурации. Следовательно, вы должны задавать конфигурации так же, как и для npm:

```shell
pnpm config set store-dir /path/to/.pnpm-store
```

</details>

<details>
  <summary><a href="https://turbo.build/repo">turbo</a></summary>

Установка через npm

```shell
npm install turbo --global
```

</details>

<details>
  <summary><a href="https://github.com/nvm-sh/nvm">nvm</a></summary>

Установка Linux

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Установка Windows

```shell
https://github.com/coreybutler/nvm-windows/releases
```

После установки nvm

```shell
nvm use
```

</details>
