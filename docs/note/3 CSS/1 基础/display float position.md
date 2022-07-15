# display-float-position

## display

1. `none`：设置元素不可⻅
2. `block`：转换成块状元素。
3. `inline`：转换成⾏内元素。 
4. `inline-block`：象⾏内元素⼀样显示，但其内容象块类型元素⼀样显示。 
5.  `table`：此元素会作为块级表格来显示 
6.  `flex`：弹性布局
7.  `grid`：网格布局
7. `inherit`：规定应该从⽗元素继承 **display** 属性的值

## position

1. `static`：默认值。没有定位，元素出现在正常的流中 

2. `relative`：⽣成相对定位的元素，相对于其正常位置进⾏定位 

3. `absolute`：⽣成绝对定位的元素，相对于 **static** 定位以外的第⼀个⽗元素进⾏定位 

4. `fixed`：⽣成绝对定位的元素，相对于浏览器窗⼝进⾏定位

5. `sticky`：粘性定位，该定位基于用户滚动的位置。

	- 未超出目标区域，行为像 **position: relative**
	- 超出目标区域，行为像 **position: fixed**

6. `inherit`：规定从⽗元素继承 **position** 属性的值

## 三者关系

1. 如果 **display** 取值为 **none**，那么 **position**和 **float**都不起作⽤

2. **display** 非 **none**，且如果 **position** 取值为 **absolute** 或者 **fixed**，框就是绝对定位的， **float** 的计算值为 **none**， **display** 根据下⾯的表格进⾏调整。 

3. **display** 非 **none**， **position** 不是绝对定位，且如果 **float** 不是 **none**，框是浮动的， **display** 根据下表进⾏调整 

4. 如果元素是根元素， **display** 根据下表进⾏调整 

5. 其他情况下 **display** 的值为指定值 

| 指定值                                                       | 计算值 |
| ------------------------------------------------------------ | ------ |
| inline-table                                                 | table  |
| inline, table-row-group, table-column, table-column-group, table-header-group, table-footer-group, table-row, table-cell, table-caption, inline-block | block  |
| other                                                        | 不变   |