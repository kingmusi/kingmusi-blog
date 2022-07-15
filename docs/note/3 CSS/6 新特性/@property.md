 # @property

@property CSS at-rule 是 CSS Houdini API 的一部分, 它允许开发者显式地定义他们的 css`自定义属性, 允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承

## 语法

#### 属性

- `@property --property-name` 中的 `--property-name` 就是自定义属性的名称，定义后可在 CSS 中通过 `var(--property-name)` 进行引用
- syntax：该自定义属性的语法规则，也可以理解为表示定义的自定义属性的类型
- inherits：是否允许继承
- initial-value：初始值

`@property` 规则中的 syntax 和 inherits 描述符是必需的

#### 支持的 syntax 语法类型

`syntax` 支持的语法类型非常丰富

- length
- number
- percentage
- length-percentage
- color
- image
- url
- integer
- angle
- time
- resolution
- transform-list
- transform-function
- custom-ident (a custom identifier string)

syntax 中的 `+`、`#`、`|` 符号

- `syntax: '<color#>'` ：接受逗号分隔的颜色值列表
- `syntax: '<length+>'` ：接受以空格分隔的长度值列表
- `syntax: '<length | length+>'`：接受单个长度或者以空格分隔的长度值列表

## 示例

正常定义一个 CSS 自定义变量

```css
:root {
  --whiteColor: #fff;
}

p {
  color: (--whiteColor);
}
```

用 `@property` 规则定义一个 CSS 自定义变量

```css
@property --property-name {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}

p {
  color: var(--property-name);
}
```

还可以在 javascript 内定义

```js
CSS.registerProperty({
  name: "--property-name",
  syntax: "<color>",
  inherits: false,
  initialValue: "#c0ffee"
});
```

## 用于渐变过渡

以前渐变是没有过渡效果的，只有两帧之间的切换

```css
:root {
  --colorA: #fff;
  --colorB: #000;
}

div {
  background: linear-gradient(45deg, var(--colorA), var(--colorB));
  transition: 1s background;

  &:hover {
    --colorA: yellowgreen;
    --colorB: deeppink;
  }
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202205041826844.gif)

使用 `@property`

```css
@property --houdini-colorA {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}

@property --houdini-colorB {
  syntax: '<color>';
  inherits: false;
  initial-value: #000;
}

.property {
  background: linear-gradient(45deg, var(--houdini-colorA), var(--houdini-colorB));
  transition: 1s --houdini-colorA, 1s --houdini-colorB;

  &:hover {
    --houdini-colorA: yellowgreen;
    --houdini-colorB: deeppink;
  }
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202205041828245.gif)

## 饼图动画

传统写法

```css
.normal {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(yellowgreen, yellowgreen 25%, transparent 25%, transparent 100%);
  transition: background 300ms;

  &:hover {
    background: conic-gradient(yellowgreen, yellowgreen 60%, transparent 60.1%, transparent 100%);
  }
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202205041837355.gif)

使用 `@property`

```css
@property --per {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 25%;
}

div {
  background: conic-gradient(yellowgreen, yellowgreen var(--per), transparent var(--per), transparent 100%);
  transition: --per 300ms linear;

  &:hover {
    --per: 60%;
  }
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202205041840548.gif)



## 长度变化

```css
@property --offset {
  syntax: '<length>';
  inherits: false;
  initial-value: 0;
}

div {
  text-underline-offset: var(--offset, 1px);
  text-decoration: underline;
  transition: --offset 400ms, text-decoration-color 400ms;

  &:hover {
    --offset: 10px;
    color: orange;
    text-decoration-color: orange;
  }
}
```

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/202205041843963.gif)
