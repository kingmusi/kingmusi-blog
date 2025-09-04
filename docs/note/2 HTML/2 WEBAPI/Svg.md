# Svg

## 属性

| 属性名                | 说明             |
| --------------------- | ---------------- |
| **fill**              | 填充颜色         |
| **fill-opacity**      | 填充透明度       |
| **stroke**            | 边框颜色         |
| **stroke-width**      | 边框宽度         |
| **stroke-opacity**    | 边框透明度       |
| **stroke-dasharray**  | 创建虚线         |
| **stroke-dashoffset** | 相对于起始点的偏 |
| **stroke-linecap**    | 直线样式         |

## 基本元素举例

#### 矩形

:::demo

```html
<svg width="100" height="100">
	<rect x="0" y="0" width="100" height="100" fill="#f06" />
</svg>
```

:::

#### 圆

:::demo

```html
<svg width="100" height="100">
	<circle cx="50" cy="50" r="50" fill="#f06" />
</svg>
```

:::

#### 椭圆

:::demo

```html
<svg width="100" height="100">
	<ellipse cx="50" cy="50" rx="50" ry="30" fill="#f06" />
</svg>
```

:::

#### 直线

:::demo

```html
<svg width="100" height="100">
	<line x1="0" y1="100" x2="100" y2="0" stroke="#f06" />
</svg>
```

:::

#### 文本

:::demo

```html
<svg width="100" height="100">
    <text x="0" y="50" stroke="#f06">kingmusi</text>
</svg>
```

:::

## 与Canvas的区别

1. **svg** 绘制出来的每⼀个图形的元素都是独⽴的 **DOM** 节点，能够⽅便的绑定事件或⽤来 改。 **canvas**输出的是⼀整幅画布

2. **svg** 输出的图形是⽮量图形，后期可以修改参数来⾃由放⼤缩⼩，不会失真和锯⻮。⽽ **canvas** 输出标量画布，就像⼀张图⽚⼀样，放⼤会失真或者锯⻮