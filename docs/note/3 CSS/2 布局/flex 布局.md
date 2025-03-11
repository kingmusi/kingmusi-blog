# flex布局

## 容器属性

1. `flex-direction`：决定主轴的方向

   > - `row`（默认值）：主轴为水平方向，起点在左端。
   > - `row-reverse`：主轴为水平方向，起点在右端。
   > - `column`：主轴为垂直方向，起点在上沿。
   > - `column-reverse`：主轴为垂直方向，起点在下沿。

2. `flex-wrap`：如果一条轴线排不下，如何换行

   > - `nowrap`（默认）：不换行。
   > - `wrap`：换行，第一行在上方。
   > - `wrap-reverse`：换行，第一行在下方。

3. `flex-flow`：是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`

4. `justify-content`：定义了项目在主轴上的对齐方式

   > - `flex-start`（默认值）：左对齐
   > - `flex-end`：右对齐
   > - `center`： 居中
   > - `space-between`：两端对齐，项目之间的间隔都相等。
   > - `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
   > - `space-evenly`：每个项目之间有间距，距离父边框也有间距，且这些间距大小一样

5. `align-items`：定义项目在交叉轴上如何对齐。

   > - `flex-start`：交叉轴的起点对齐。
   > - `flex-end`：交叉轴的终点对齐。
   > - `center`：交叉轴的中点对齐。
   > - `baseline`: 项目的第一行文字的基线对齐。
   > - `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

6. `align-content`：定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

## 项目属性

1. `order`：定义项目的排列顺序。数值越小，排列越靠前，默认为0。

2. `flex-grow`：定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

   - 如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

3. `flex-shrink`：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

   - 如果一个项目的`flex-shrink`属性为0，其他项目都为1，则空间不足时，前者不缩小。

4. `flex-basis`：定义了在分配多余空间之前，项目占据的主轴空间（main size）。

5. `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

   ```css
   .item { flex: none | auto | [ <'flex-grow'> (<'flex-shrink'> <'flex-basis'>) ] }
   ```

   > - `none`：`1 1 auto`
   > - `auto`：`0 0 auto`

6. `align-self`：允许单个项目有与其他项目不一样的对齐方式

    ```css
     auto | flex-start | flex-end | center | baseline | stretch
    ```