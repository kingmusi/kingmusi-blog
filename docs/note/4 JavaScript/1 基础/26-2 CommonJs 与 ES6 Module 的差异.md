# CommonJs 与 ES6 Module 的差异

## 同步与异步

#### CommonJs

主要用于**服务器**，不在乎加载的速度，所以 require 是**同步**引入的

#### ES6 Module

主要用于**浏览器**，需要在意速度与时间，所以是一个**异步**引入的过程

> 当 script 标签的 type 类型为 **module**，则浏览器会加载为 ES6 Module，有以下特性
>
> 加载特性
>
> 1. 异步加载，不会阻塞浏览器，等整个页面渲染完，再执行模块脚本
> 2. 如果有多个，则按出现的顺序依次执行
> 3. 可以加上 `async` 属性，则只要加载完成，渲染引擎就会中断渲染立即执行，多个时，也不会再顺序执行
>
> 使用特性
>
> 1. 变量仅在模块作用域中可用
> 2. 自动采用严格模式，不管有没有声明`use strict`
> 3. 模块之中，可以使用`import`命令和`export`命令
> 4. 模块之中，顶层的`this`关键字返回`undefined`，而不是指向`window`
> 5. 同一个模块如果加载多次，将只执行一次

## 静/动态加载

#### CommonJs

**动态**加载的，输出对象会在脚本执行时生成，所以可动态加载

```js
if (1 > 1) {
  const t = require(`./${'f'}${'oo'}`)
}
```

#### ES6 Module

- `import`：**静态**加载的，编译时就输出接口，有利于编译器静态分析，但会导致不能动态加载

```js
import foo from './foo.js' // ok

if (1 > 1) {
	import { foo } from `./${'f'}${'oo'}` // 报错
}
```

- `import()`：**动态**加载，在运行时加载，和 **require** 相似，但这个是**异步**加载的，返回的是 **promise**

```js
const a = 'lodash';
if (1 > 0) {
  import(`./xx/${a}.js`)
  	.then(module => /*...*/);
}
```

## 输出值

#### CommonJs

输出的是值的**浅拷贝**，即如果输出的值是**原始值**，则对模块内部的变化就影响不到这个值

```js
// lib.js
let counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  counter,
  incCounter,
};
```

```js
// main.js
const lib = require('./lib');

console.log(lib.counter); // 3
lib.incCounter();
console.log(lib.counter); // 3
```

但改成引用值（即输出的是一个地址），则可以得到内部的变化

```js
// lib.js
let counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
  	return counter;
  },
  incCounter,
};
```

```js
// main.js
const lib = require('./lib');

console.log(lib.counter); // 3
lib.incCounter();
console.log(lib.counter); // 4
```

#### ES6 Module

JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个**只读引用**。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值

```js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

## Node.js 模块加载方法

Node.js 可以支持这两种方案

#### CommonJs

1. 以`.cjs` 为后缀的文件总是以 CommonJS 模块加载
2. 当 `package.json` 里面的 `type` 字段设置为 `commonjs` 时，项目内所有 `.js` 为后缀的文件总是以 CommonJS 模块加载

#### ES6 Module

1. 以`.mjs` 为后缀的文件总是以 ES6 模块加载
2. 当 `package.json` 里面的 `type` 字段设置为 `module` 时，项目内所有 `.js` 为后缀的文件总是以 ES6 模块加载

> 从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持

## 循环加载

#### CommonJs

**一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出**

```js
// a.js
exports.done = false;
var b = require('./b.js');
console.log(`在 a.js 中，b.done = ${b.done}`);
exports.done = true;
console.log('a.js 执行完毕');
```

```js
// b.js
exports.done = false;
var a = require('./a.js');
console.log(`在 b.js 中，a.done = ${a.done}`);
exports.done = true;
console.log('b.js 执行完毕');
```

```js
// main.js
var a = require('./a.js');
var b = require('./b.js');
console.log(`在 main.js 之中, a.done = ${a.done}, b.done = ${b.done}`);
```

结果

```js
在 b.js 中，a.done = false
b.js 执行完毕
在 a.js 中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done = true, b.done = true
```

解释

- `a.js` 开始执行，第一行导出 `done = false`
- 第二行加载 `b.js`，这个时候 `a.js` 就“停止执行”了，他会等待 `b.js` 执行完成后，才会继续往下执行
- `b.js` 开始执行，第二行又加载了 `a.js`，即发生循环加载，系统会去`a.js`模块对应对象的`exports`属性取值，可是因为`a.js`还没有执行完，从`exports`属性只能取回已经执行的部分，而不是最后的值
- 最后按序执行，获得结果

> 根据 **“b.js 执行完毕”** 等语句只输出一遍可知，CommonJs 对已加载的，再次加载时，不会重新执行一遍文件，只会拿缓存中的值

#### ES6 Module

**不会关心是否发生了"循环加载"，只是生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值**

```js
// a.js
import { bar } from './b.js';
export function foo() {
  bar();  
  console.log('执行完毕');
}
foo();
```

```js
// b.js
import { foo } from './a.js';
export function bar() {  
  if (Math.random() > 0.5) {
    foo();
  }
}
```

结果

```
执行完毕
```


