# backdrop-filter

## 毛玻璃效果

通过 filter 实现

:::demo

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
	width: 100%;
  height: 30em;
  background: url(/logo.svg);
  
  .box {
		width: 30%;
    line-height: 10em;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    text-align: center;
    color: #000;
    backdrop-filter: blur(10px);
  }
}
```

```html
<div class="container">
  <div class="box">欢迎来到木厶笔记存放站</div>
</div>
```

:::

#### 问题：当父子元素都使用 `backdrop-filter` 时，子元素的会不生效

问题效果：

:::dom

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
	width: 37em;
  height: 30em;
  background: url(/logo.svg);
  
  .box-parent {
    position: relative;
		width: 30%;
    line-height: 10em;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    text-align: center;
    color: #000;
    backdrop-filter: blur(10px);
    
    .box-child {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 1em;
      padding: 1em;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border-radius: 8px;
    }
  }
}
```

```html
<div class="container">
  <div class="box-parent">
  	<span>欢迎来到木厶笔记存放站</span>
    <div class="box-child">测试</div>
  </div>
</div>
```

:::

解决方案：

在子级使用 `backdrop-filter` 时，把 `backdrop-filter` 加到伪元素上，并设置`z-index: -1`

:::demo

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
	width: 37em;
  height: 30em;
  background: url(/logo.svg);
  
  .box-parent {
    position: relative;
		width: 30%;
    line-height: 10em;
    text-align: center;
    color: #000;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    
    .box-child {
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 1em;
      padding: 1em;
      overflow: hidden;
      &::before {
        content: '';
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border-radius: 8px;
      }
    }
  }
}
```

```html
<div class="container">
  <div class="box-parent">
  	<span>欢迎来到木厶笔记存放站</span>
    <div class="box-child">测试</div>
  </div>
</div>
```

:::
