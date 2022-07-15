# BFC

## 概念

块格式化上下文，是一个独立的渲染区域，规定了内部如何布局，并且这个区域的子元素不会影响到外面的元素

## 创建规则

1. 根元素 
2. 浮动元素（ **float** 不取值为 **none**）
3. 绝对定位元素（ **position** 取值为 **absolute** 或  **fixed**）
4. **display** 取值为 **inline-block** 、 **table-cell** 、 **table-caption** 、 **flex**、 **inline-flex** 之⼀的元素 
5. **overflow** 不取值为 **visible** 的元素

## 作用

1. 可以包含浮动元素，**BFC** 会被浮动元素撑开

2. 避免 **margin** 垂直重叠，正常文档流垂直方向的两个 **margin** 会重叠。怎么让其不重叠，让其中一个被bfc包裹

3. 不被浮动元素覆盖

   ```html
   <!-- 三栏布局 -->
   <div class="container">
       <div class="left"></div>
       <div class="right"></div>
       <div class="main"></div>
   </div>
   ```

   ```css
   .left, .right{
       float: left;
       width: 150px;
       height: 300px;
       background: red;
   }
   .right{
       float: right;
   }
   .main{
       height:300px;
       background: green; 
       overflow:hidden; /* bfc */
   }
   ```