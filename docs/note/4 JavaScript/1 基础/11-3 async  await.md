# async / await

## async

- 表示其是一个**异步函数**
- 返回一个 `Promise ` 对象
  1. **return**相当于 **Promise.resolve**
  2. 无 **return** 则 **Promise.resolve** 一个 **undefined**）
  3. 报错相当于 **Promise.reject**

```javascript
async function fn(){
	return 'fn';
}
fn().then(data => {
	console.log(data); // fn
})
```

## await

- 必须在 **async**里
- 用于等待一个异步方法的完成
- 后接表达式，如果是普通数据，则返回普通数据。如果是 **promise**，则返回 **resolve** 的数据
- 当执行中遇到 **await**，则这个 **async** 函数暂停执行，跳出函数，执行函数外的代码，同时异步执行 **await**后面的表达式

```javascript
async function fn(){
    console.log(1);
    const a = await 2;
    console.log(a);
}

fn();
console.log(3);
// 1 3 2
```

## 以下情况可以被 **catch** 捕获到

```js
async function fun() {
	throw 1
}
fun().catch(err => console.log(err)) // 1
```

```js
async function fun() {
	await (() => {throw 2})()
}
fun().catch(err => console.log(err)) // 2
```

```js
async function fun() {
	await Promise.reject(3)
}
fun().catch(err => console.log(err)) // 3
```

## 异步函数中的 **for**

- 没有平行执行，第一个 **await** 执行完，才执行第二个 **await**

```js
function delay() {
	return new Promise(resolve => setTimeout(resolve, 1000))
}

async function run() {
	const time = Date.now()
	for (let i = 0; i < 3; i++) {
		await delay()
	}
	console.log(Date.now() - time) // 3019
}
run()
```

- 利用平行执行，且 **await** 还是顺序性的

```js
function delay(index) {
	return new Promise(resolve => setTimeout(() => resolve(index), 1000))
}

async function run() {
	const date = Date.now()

	const arr = new Array(3).fill(1).map((item, index) => delay(index))
	for (const item of arr) {
		const index = await item
		console.log(index) // 0 1 2
	}

	console.log(Date.now() - date) // 1010
}
run()
```

