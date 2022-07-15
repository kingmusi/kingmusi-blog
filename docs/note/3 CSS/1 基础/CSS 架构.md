# CSS 架构

## BEM

- block：块
- element：元素
- modifier：修饰符

遵守以下命名规则

```css
.block{}  
.block__element{}  
.block--modifier{} 
```

```html
<div class="menu">
    <div class="menu__item menu__item--red"></div>
    <div class="menu__item menu__item--blue"></div>
    <div class="menu__item menu__item--green"></div>
</div>
```

## ITCSS

![](http://imgconvert.csdnimg.cn/aHR0cHM6Ly9hc3NldHMuaG9uZ2tpYXQuY29tL3VwbG9hZHMvaW52ZXJ0ZWQtdHJpYW5nbGUtY3NzLXdlYi1kZXZlbG9wbWVudC8wMS1pbnZlcnRlZC10cmlhbmdsZS1jc3MtaXRjc3MtZGlhZ3JhbS5qcGc?x-oss-process=image/format,png)

| Layer      | 作用                                           |
| ---------- | ---------------------------------------------- |
| Settings   | 项目使用的全局变量                             |
| Tools      | mixin，function                                |
| Generic    | CSS重置，最基本的设定 normalize.css            |
| Base       | 没有类的单个HTML元素选择器                     |
| Objects    | 通常遵循OOCSS方法的页面结构类                  |
| Components | 用于设置任何页面元素和所有页面元素样式的美学类 |
| Trumps     | important!                                     |

## SMACSS

| Layer  | 作用                                                         |
| ------ | ------------------------------------------------------------ |
| Base   | 没有类的单个HTML元素选择器                                   |
| Layout | 页面分成几个部分，各个部分的样式，如 header、main、footer    |
| Module | 可重用的模块部分                                             |
| State  | Layout 或 Module在特定状态下的表现。比如：是否激活、是否展开等 |
| Theme  | Layout或Module的多种外观                                     |

## ACSS

把单一样式命名，以形成高度可用的样式

```css
.fz-12 {
	font-size: 12px;
}
.fz-14 {
	font-size: 14px;
}
.fz-16 {
	font-size: 16px;
}
```

