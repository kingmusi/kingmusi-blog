# touch 事件

## 事件类型

`touchstart`：手指点击元素的那一刹那触发

`touchmove`：手指在点击元素后移动时触发（无论是否在元素上移动）

`touchend`：手指在点击元素后离开时触发（无论是否在元素上移动）

## 事件对象

**1. e.target**：触发的元素

**2. e.changedTouches**：手指变化情况，是一个伪数组，记载多个手指变化的情况

- **clientX**：变化时，手指在可视区域的 **x** 
- **clientY**：变化时，手指在可视区域的 **y**
- **pageX**：变化时，手指在整个区域（包括滚动条）的 **x**  
- **pageY**：变化时，手指在整个区域（包括滚动条）的 **y**  

## click 在 ios 上有 300ms 延迟，原因及如何解决？ 

1. 粗暴型，`禁用缩放`

   ```html
   <meta name="viewport" content="width=device-width, user-scalable=no"> 
   ```

2. 利用`FastClick`，其原理是

   - 检测到**touchend**事件后，立刻出发模拟**click**事件，并且把浏览器**300**毫秒之后真正出发的事件给阻断掉 

   - 下载 `fastclick.js`, 并引入

     ```js
     <script type='application/javascript' src='./fastclick.js'></script>
     ```

   - **npm** 引入

     ```js
     import FastClick from 'fastclick'
     
     if ('addEventListener' in document) {
         document.addEventListener('DOMContentLoaded',  function() {
             FastClick.attach(document.body);
         }, false);
     }
     ```