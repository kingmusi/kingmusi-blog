# Dialog

> 以下是自己常用的，详细请看
>
> [官方文档](https://www.electronjs.org/docs/api/dialog)

****

## 引入包

**主进程**

```js
const { dialog } = require('electron')
```

**渲染进程**

```js
const { dialog } = require('electron').remote
```

## 选择文件 —— showOpenDialog

- 参数：`options: Object`
  1. `title: string`: 标题
  2. `properties: string[] `：特性值
     - `openFile`：可打开文件
     - `multiSelections`：可多选
  3. `filters: {name: string, extensions: string[]}[]`：显示给用户的文件
     - `name`：文件类型名
     - `extensions`：后缀名，**不带点（.）**
- 返回：`Promise`
  1. 成功返回`{ filePaths: string[] }`
  2. 失败返回 `undefined`

```js
dialog.showOpenDialog({
  	title: '选择导入的 Markdown 文件',
  	properties: ['openFile', 'multiSelections'],
  	filters: [
    	{name: 'Markdown files', extensions: ['md']}
  	]
}).then( ({ filePaths }) => { /* ... */ })
```

## 保存文件 —— showSaveDialog

- 参数：`options: Object`
  1. `title: string`: 标题
  2. `defaultPath: string`：默认打开文件夹路径
- 返回：`Promise`
  1. 成功返回`{ filePath: string }`
  2. 失败返回 `undefined`

```js
dialog.showOpenDialog({
  	title: '请选择要保存的文件夹',
    defaultPath: __dirname
}).then( ({ filePath }) => { /* ... */ })
```

## 消息框 —— showMessageBox

- 参数：`options: Object`
  1. `type: string` ： `"none"`, `"info"`, `"error"`, `"question"` 或者 `"warning"`
  2. `title: string`：标题
  3. `message: string` ：内容