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

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214234543.png)

#### 圆

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214234628.png)

#### 椭圆

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214234654.png)

#### 直线

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214234722.png)

#### 文本

![](https://cdn.jsdelivr.net/gh/kingmusi/blogImages/img/20201214234831.png)

## 与Canvas的区别

1. **svg** 绘制出来的每⼀个图形的元素都是独⽴的 **DOM** 节点，能够⽅便的绑定事件或⽤来 改。 **canvas**输出的是⼀整幅画布

2. **svg** 输出的图形是⽮量图形，后期可以修改参数来⾃由放⼤缩⼩，不会失真和锯⻮。⽽ **canvas** 输出标量画布，就像⼀张图⽚⼀样，放⼤会失真或者锯⻮