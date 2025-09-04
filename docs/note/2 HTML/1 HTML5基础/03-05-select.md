# select

## `<select>`、`<option>`

`<select>`标签用于生成一个下拉菜单

| 属性     | 值      | 说明                                                         |
| -------- | ------- | ------------------------------------------------------------ |
| disabled | boolean | 是否禁用当前控件                                             |
| multiple | boolean | 是否可以选择多个菜单项                                       |
| size     | number  | 设置了`multiple`属性时，页面显示时一次可见的行数，其他行需要滚动查看 |

`<option>`表示一个菜单项

| 属性     | 值      | 说明                                                   |
| -------- | ------- | ------------------------------------------------------ |
| disabled | boolean | 是否禁用当前控件                                       |
| label    | string  | 该项的说明。如果省略，则等于该项的文本内容             |
| selected | boolean | 是否为默认选中项                                       |
| value    | string  | 该项提交到服务器的值。如果省略，则等于该项的文本内容。 |

#### 单选

:::demo

```html
<select>
  <option value="">--请选择一项--</option>
  <option value="dog">狗</option>
  <option value="cat">猫</option>
  <option value="others">其他</option>
</select>
```

:::

#### 多选

:::demo

```html
<select multiple size="2">
  <option value="first">First Value</option>
  <option value="second" selected>Second Value</option>
  <option value="third">Third Value</option>
</select>
```

:::

## `<option>`、`<optgroup>`

`<optgroup>`表示菜单项的分组

:::demo

```html
<label>宠物：
  <select name="pets" multiple size="4">
    <optgroup label="四条腿的宠物">
      <option value="dog">狗</option>
      <option value="cat">猫</option>
    </optgroup>
    <optgroup label="鸟类">
      <option value="parrot">鹦鹉</option>
      <option value="thrush">画眉</option>
    </optgroup>
  </select>
</label>
```

:::