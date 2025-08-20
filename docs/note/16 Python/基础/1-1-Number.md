# 数据类型-Number

## int —— 整数

#### type

```python
type(1) # <class 'int'>
```

#### 整除运算

使用 `//`，得到的数据只保留整数部分

:::demo
```python
print(2 // 1) # 2
print(1 // 2) # 0
```
:::

## float——浮点数

#### type

```python
type(1.0) # <class 'float'>
```

#### 除法运算

使用 `/`，得到的数据一定是一个浮点数

:::demo
```python
print(2 / 1) # 2.0
print(1 / 2) # 0.5
```
:::

> 进制及进制转换
>
> 十进制
>
> 	- 转换为十进制：`int()`
>
> 二进制
>
> - 以 `0b` 开头的数字
> - 转换为二进制：`bin()`
>
> 八进制
>
> - 以 `0o` 开头的数字
> - 转换为八进制：`oct()`
>
> 十六进制
>
> - 以 `0x` 开头的数字
> - 转换为十六进制：`hex()`

## bool——布尔

#### type

```python
type(True) # <class 'bool'>
```

#### 其他类型转为布尔

使用 `bool()` 转换

以下会被转换为 `False`

- 数字 `0`
- 空字符串 `""`
- 空列表 `[]`
- 空字典 `{}`

> 大概规则：空的类型，和数字 0 会被转换为 `False`

## complex——复数

结尾为`j`的数字

```python
type(1j) # <class 'complex'>
```

