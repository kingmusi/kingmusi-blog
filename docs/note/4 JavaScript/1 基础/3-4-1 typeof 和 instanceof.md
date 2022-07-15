# typeof 和 instanceof

## typeof

1. 返回值含义
   - **undefined** ：值未定义
   - **boolean**：布尔值
   - **string**：字符串
   - **number**：数值
   - **object**：对象或null
   - **function**：函数
   - **symbol**：符号
   - **bigint**：大数

## instanceof

用于检测**引用值**的`实例`

- 如果用 **instanceof** 检测原始值，始终返回 **false**
- 如果用 **instanceof** 检测引用值和 **Object** 构造函数，始终返回 **true**

> 实现 
>
> ```js
> function myinstanceof(left, right){// left: 左边，right：右边
> 	const origin = right.prototype;
> 	let proto = left.__proto__;
> 	while(proto !== null){
> 		if(proto === origin) return true;
> 		proto = proto.__proto__;
> 	}
>     return false;
> }
> ```

