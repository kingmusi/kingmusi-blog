## CSS-in-JS

## 安装

```bash
npm i @emotion/react @emotion/styled --save
```

> **vscode** 中式模板字符串中的 **css** 高亮，并有提示，可以安装插件 `vscode-styled-component`

## 使用

```js
import styled from '@emotion/styled'

const Title = styled.h1`
	font-size: 20px;
	...
`
```

```html
<Title />
```