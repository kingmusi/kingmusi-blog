# input

## 简介

`<input>`标签是一个行内元素，用来接收用户的输入

它是一个单独使用的标签，没有结束标志



共同属性

| 属性      | 值      | 说明                                                         |
| --------- | ------- | ------------------------------------------------------------ |
| autofocus | boolean | 是否在页面加载时自动获得焦点                                 |
| disabled  | boolean | 是否禁用该控件。一旦设置，该控件将变灰，用户可以看到，但是无法操作 |
| form      | string  | 关联表单的`id`属性。<br />设置了该属性后，控件可以放置在页面的任何位置，否则只能放在`<form>`内部 |
| list      | string  | 关联的`<datalist>`的`id`属性                                 |
| name      | string  | 控件的名称，主要用于向服务器提交数据时，控件键值对的键名     |
| readonly  | string  | 是否为只读                                                   |
| required  | string  | 是否为必填                                                   |
| type      | string  | 控件类型                                                     |
| value     | string  | 控件的值                                                     |

## text

`type="text"`是普通的文本输入框，用来输入单行文本

:::demo

```html
<input type="text" minlength="4" maxlength="8" size="10">
```

:::

| 属性        | 值      | 说明                                                         |
| ----------- | ------- | ------------------------------------------------------------ |
| maxlength   | number  | 可以输入的最大字符数，值为一个非负整数                       |
| minlength   | number  | 可以输入的最小字符数，值为一个非负整数，且必须小于`maxlength` |
| pattern     | string  | 用户输入必须匹配的正则表达式<br />比如要求用户输入4个～8个英文字符，可以写成`pattern="[a-z]{4,8}"` |
| placeholder | string  | 输入字段为空时，用于提示的示例值                             |
| size        | number  | 表示输入框的显示长度有多少个字符宽，它的值是一个正整数       |
| spellcheck  | boolean | 是否对用户输入启用拼写检查                                   |

## search

基本等同于`type="text"`

某些浏览器会在输入的时候，在输入框的尾部显示一个删除按钮，点击就会删除所有输入，让用户从头开始输入

:::demo

```html
<input type="search" minlength="4" maxlength="8" size="10">
```

:::

## submit

`type="submit"`是表单的提交按钮。用户点击这个按钮，就会把表单提交给服务器

:::demo

```html
<input type="submit" value="提交">
```

:::

配套属性有以下这些，均用来覆盖 `<form>` 的相应设置

| 属性           | 说明                                         |
| -------------- | -------------------------------------------- |
| formaction     | 提交表单数据的服务器 URL                     |
| formenctype    | 表单数据的编码类型                           |
| formmethod     | 提交表单使用的 HTTP 方法                     |
| formnovalidate | 表示数据提交给服务器之前，是否要忽略表单验证 |
| formtarget     | 收到服务器返回的数据后，在哪一个窗口显示     |

## image

`type="image"`表示将一个图像文件作为提交按钮，行为和用法与`type="submit"`完全一致

:::demo

```html
<input type="image" alt="登陆" src="/logo.svg">
```

:::

##  checkbox

`type="checkbox"`是复选框，允许选择或取消选择该选项

`checked`属性表示默认选中

:::demo

```html
<fieldset>
  <legend>你的兴趣</legend>
  <div>
    <input type="checkbox" id="coding" name="interest" value="coding">
    <label for="coding">编码</label>
  </div>
  <div>
    <input type="checkbox" id="music" name="interest" value="music">
    <label for="music">音乐</label>
  </div>
</fieldset>
```

:::

## radio

`type="radio"`是单选框，表示一组选择之中，只能选中一项。单选框通常为一个小圆圈，选中时会被填充或突出显示

`checked`属性表示默认选中

:::demo

```html
<fieldset>
  <legend>性别</legend>
  <div>
    <input type="radio" id="male" name="gender" value="male" checked>
    <label for="male">男</label>
  </div>
  <div>
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">女</label>
  </div>
</fieldset>
```

:::

## eamil

`type="email"`是一个只能输入电子邮箱的文本输入框

表单提交之前，浏览器会自动验证是否符合电子邮箱的格式，如果不符合就会显示提示，无法提交到服务器

:::demo

```html
<input type="email" pattern=".+@qq.com" size="30" required>
```

:::

## password

`ype="password"`是一个密码输入框。用户的输入会被遮挡，字符通常显示星号（`*`）或点（`·`）

:::demo

```html
<input type="password" value="" required>
```

:::

## file

`type="file"`是一个文件选择框，允许用户选择一个或多个文件，常用于文件上传功能

:::demo

```html
<input type="file"
       accept="image/png, image/jpeg">
```

:::

| 属性     | 值                                                           | 说明                             |
| -------- | ------------------------------------------------------------ | -------------------------------- |
| accept   | MIME 类型 (如：`image/jpeg`)<br />后缀名（如：`.doc`）<br />某一类文件（如：`audio/*`、`image/*`） | 允许选择的文件类型，使用逗号分隔 |
| capture  | `user`（面向用户的摄像头或麦克风）<br />`environment`（外接的摄像头或麦克风） | 用于捕获图像或视频数据的源       |
| multiple | boolean                                                      | 是否允许用户选择多个文件         |

## hidden

`type="hidden"`是一个不显示在页面的控件，用户无法输入它的值，主要用来向服务器传递一些隐藏信息

比如，CSRF 攻击会伪造表单数据，那么使用这个控件，可以为每个表单生成一个独一无二的隐藏编号，防止伪造表单提交

```html
<input name="token" type="hidden" value="xm234jq">
```

## number

`type="number"`是一个数字输入框，只能输入数字

浏览器通常会在输入框的最右侧，显示一个可以点击的上下箭头，点击向上箭头，数字会递增，点击向下箭头，数字会递减

:::demo

```html
<input type="number" name="tentacles" min="1" max="10">
```

:::

| 属性        | 值     | 说明                                       |
| ----------- | ------ | ------------------------------------------ |
| max         | number | 允许输入的最大数值                         |
| min         | number | 允许输入的最小数值                         |
| placeholder | string | 输入字段为空时，用于提示的示例值           |
| step        | number | 点击向上和向下箭头时，数值每次递减的步长值 |

## range

`type="range"`是一个滑块，用户拖动滑块，选择给定范围之中的一个数值

:::demo

```html
<input type="range" name="volume" min="0" max="11">
```

:::

| 属性 | 值     | 说明                    |
| ---- | ------ | ----------------------- |
| max  | number | 允许的最大值，默认为100 |
| min  | number | 允许的最小值，默认为0   |
| step | number | 步长值，默认为1         |

## url

`type="url"`是一个只能输入网址的文本框

基本等同于`type="text"`，不过在提交表单之前，浏览器会自动检查网址格式是否正确，如果不正确，就会无法提交

> 与`<datalist>`标签搭配使用，可以形成下拉列表供用户选择。随着用户不断键入，会缩小显示范围，只显示匹配的备选项
>
> :::demo
>
> ```html
> <input name="myURL" type="url" list="defaultURLs">
> <datalist id="defaultURLs">
>   <option value="https://developer.mozilla.org/" label="MDN Web Docs">
>   <option value="http://www.google.com/" label="Google">
>   <option value="http://www.microsoft.com/" label="Microsoft">
>   <option value="https://www.mozilla.org/" label="Mozilla">
>   <option value="http://w3.org/" label="W3C">
> </datalist>
> ```
>
> ::

## tel

`type="tel"`是一个只能输入电话号码的输入框

由于全世界的电话号码格式都不相同，因此浏览器没有默认的验证模式，大多数时候需要自定义验证

:::demo

```html
<input type="tel" name="phone"
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       required>
```

:::

## color

`type="color"`是一个选择颜色的控件，它的值一律都是`#rrggbb`格式

:::demo

```html
<input type="color" name="background">
```

:::

## date

`type="date"`是一个只能输入日期的输入框，用户可以输入年月日，但是不能输入时分秒
输入格式是`YYYY-MM-DD`

:::demo

```html
<input type="date" name="start"">
```

:::

| 属性 | 值         | 说明                         |
| ---- | ---------- | ---------------------------- |
| max  | yyyy-MM-dd | 可以允许的最晚日期           |
| min  | yyyy-MM-dd | 可以允许的最早日期           |
| step | number     | 步长值，一个数字，以天为单位 |

## time

`type="time"`是一个只能输入时间的输入框，可以输入时分秒，不能输入年月日

日期格式是24小时制的`hh:mm`，如果包括秒数，格式则是`hh:mm:ss`。日期选择器的形式则随浏览器不同而不同

:::demo

```html
<input type="time" name="appt">
```

:::

| 属性 | 值               | 说明             |
| ---- | ---------------- | ---------------- |
| max  | hh:mm / hh:mm:ss | 允许的最晚时间   |
| min  | hh:mm / hh:mm:ss | 允许的最早时间   |
| step | number           | 步长值，单位为秒 |

## month

`type="month"`是一个只能输入年份和月份的输入框

格式为`YYYY-MM`

:::demo

```html
<input type="month" name="start">
```

:::

| 属性 | 值      | 说明             |
| ---- | ------- | ---------------- |
| max  | yyyy-MM | 允许的最晚时间   |
| min  | yyyy-MM | 允许的最早时间   |
| step | number  | 步长值，单位为月 |

## week

`type="week"`是一个输入一年中第几周的输入框

格式为`yyyy-Www`，比如`2018-W18`表示2018年第18周

:::demo

```html
<input type="week" name="start">
```

:::

| 属性 | 值       | 说明             |
| ---- | -------- | ---------------- |
| max  | yyyy-Www | 允许的最晚时间   |
| min  | yyyy-Www | 允许的最早时间   |
| step | number   | 步长值，单位为周 |

## datetime-local

`type="datetime-local"`是一个时间输入框，让用户输入年月日和时分

格式为`yyyy-MM-ddThh:mm`（注意，该控件不支持秒）

:::demo

```html
<input type="datetime-local"  value="2025-09-03T21:07">
```

:::

| 属性 | 值               | 说明                         |
| ---- | ---------------- | ---------------------------- |
| max  | yyyy-MM-ddThh:mm | 允许的最晚时间               |
| min  | yyyy-MM-ddThh:mm | 允许的最早时间               |
| step | number           | 步长值，单位为秒，默认值是60 |