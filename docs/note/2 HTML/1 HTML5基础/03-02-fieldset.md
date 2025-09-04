# fieldset

## `<fieldset>`

`<fieldset>`标签是一个块级容器标签，表示控件的集合，用于将一组相关控件组合成一组

浏览器会用一个方框框柱控件

:::demo

```html
<form>
  <fieldset>
    <p>年龄：<input type="text" name="age"></p>
    <p>性别：<input type="text" name="gender"></p>
  </fieldset>
  <button>提交</button>
</form>
```

:::

属性：

| 属性     | 值      | 说明                                                   |
| -------- | ------- | ------------------------------------------------------ |
| disabled | boolean | 设置为真，会使得包含的控件都不可用，变成灰色状态       |
| form     | string  | 指定控件组所属的`<form>`，它的值等于`<form>`的`id`属性 |
| name     | string  | 控件组名称                                             |

## `<legend>`

`<legend>`标签用来设置`<fieldset>`控件组的标题

:::demo

```html
<fieldset>
  <legend>学生情况登记</legend>
  <p>年龄：<input type="text" name="age"></p>
  <p>性别：<input type="text" name="gender"></p>
</fieldset>
```

:::