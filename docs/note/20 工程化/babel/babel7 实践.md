# babel7 实践

## 业务

```shell
npm i @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
npm i core-js@3
```

`.babelrc`

```js
{
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not dead'],
        },
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        regenerator: false,
      },
    ],
  ],
}
```

该方案会污染模块内全局，但会根据 `target` 来一定程度上减少 `polyfill`，进而减小体积

## 库

```shell
npm i @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
npm i @babel/runtime-corejs3
```

`.babelrc`

```js
{
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not dead'],
        },
        useBuiltIns: false,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
}
```

该方案不会污染全局，但是这个 `transform-runtime` 没法利用 `target` 因此使 `polyfill` 全量引入导致体积增大