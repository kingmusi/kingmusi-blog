# css3动画

## @keyframes 和 animation

1. ·@keyframes·

```css
@keyframes animationname {
    keyframes-selector {'css-styles'}
}  
```

2. ·animation·

| 名称 | 完成时间   | 速度曲线    | 延迟       | 播放次数             | 是否逆向 | 是否运动 | 完成后状态                 |
| ---- | ---------- | ----------- | ---------- | -------------------- | -------- | -------- | -------------------------- |
|      | 秒（s）    | linear      | 秒（s）    | n                    | normal   | running  | none                       |
|      | 毫秒（ms） | ease        | 毫秒（ms） | infinite<br />无限次 | reverse  | paused   | forwards<br />保持最后一帧 |
|      |            | ease-in     |            |                      |          |          |                            |
|      |            | ease-out    |            |                      |          |          |                            |
|      |            | ease-in-out |            |                      |          |          |                            |

## transform

| 位移               | 缩放           | 旋转            | 倾斜                      |
| ------------------ | -------------- | --------------- | ------------------------- |
| translate(*x*,*y*) | scale(*x*,*y*) | rotate(*angle*) | skew(*x-angle*,*y-angle*) |

## transition

| css属性名称          | 完成时间   | 速度曲线    | 延迟       |
| -------------------- | ---------- | ----------- | ---------- |
| none                 | 秒（s）    | linear      | 秒（s）    |
| all                  | 毫秒（ms） | ease        | 毫秒（ms） |
| property：用逗号隔开 |            | ease-in     |            |
|                      |            | ease-out    |            |
|                      |            | ease-in-out |            |

## transition 和 animation 的区别

1. 触发
   - `transition`：需要改变一个属性才能触发
   - `animation`：任何情况下都能触发
2. 帧数
   - `transition`：**2** 帧（`from`、`to`）
   - `animation`：可以一帧一帧的