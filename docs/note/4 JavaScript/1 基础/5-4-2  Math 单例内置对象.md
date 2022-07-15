# Math 单例内置对象

作为保存数学公式、信息和计算的对象

## Math 对象属性

| 属性        | 说明                |
| ----------- | ------------------- |
| Math.E      | 自然对数的基数 e    |
| Math.LN10   | 10 为底的自然对数   |
| Math.LN2    | 2 为底的自然对数    |
| Math.LOG2E  | 以 2 为底 e 的对数  |
| Math.LOG10E | 以 10 为底 e 的对数 |
| **Math.PI** | π 的值              |
| Math.SQRT2  | 2 的平方根          |

## 计算最大（小）值

**max()** 和 **min()** 确定一组数值中的最大值和最小值

- 接受多个参数

```js
const nums = [2, 5, 3]
console.log( Math.max(...nums) ) // 5
console.log( Math.min(...nums) ) // 2
```

## 舍入方法

**ceil()**、**floor()**、**round()** 可以把小数舍入为整数

| 方法         | 说明                   |
| ------------ | ---------------------- |
| Math.ceil()  | 向上舍入为最接近的整数 |
| Math.floor() | 向下舍入为最接近的整数 |
| Math.round() | 四舍五入               |

```js
console.log( Math.ceil(25.9) )  // 26
console.log( Math.round(25.9) ) // 26
console.log( Math.floor(25.9) ) // 25
```

## random()

- **Math.random()** 返回一个 `[0, 1)` 范围的随机数

> 范围随机数
>
> ```js
> /**
>  * 随机数
>  * @param min  最小范围
>  * @param max  最大范围
>  * @param num  小数的位数，不填默认整数
>  */
> function getRandomNumber (min, max, num) {
>   let random = (min + Math.round(Math.random() * (max - min)));
>   let randomNumber = num ? random.toFixed(num) : random
>   return randomNumber
> }
> ```

## 其他方法

| 方法         | 描述                                                         |
| :----------- | :----------------------------------------------------------- |
| **abs(x)**   | 返回数的绝对值。                                             |
| acos(x)      | 返回数的反余弦值。                                           |
| asin(x)      | 返回数的反正弦值。                                           |
| atan(x)      | 以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。     |
| atan2(y,x)   | 返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。 |
| **cbrt(x)**  | 返回 x 的立方根。                                            |
| cos(x)       | 返回数的余弦。                                               |
| exp(x)       | 返回 e 的指数。                                              |
| log(x)       | 返回数的自然对数（底为e）。                                  |
| **pow(x,y)** | 返回 x 的 y 次幂。                                           |
| sin(x)       | 返回数的正弦。                                               |
| **sign(x)**  | 判断是否是正数，正数返回 1，负数返回 -1，0 返回 0。          |
| **sqrt(x)**  | 返回数的平方根。                                             |
| tan(x))      | 返回角的正切。                                               |
| **trunc(x)** | 返回整数部分。                                               |

