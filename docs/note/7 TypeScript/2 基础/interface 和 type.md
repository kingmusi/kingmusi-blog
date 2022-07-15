# interface 和 type

## type（类型别名）

- 类型别名用来给一个类型起个新名字

```typescript
type Message = string | string[]
```

## interface（接口）

- 对一个对象的抽象

```typescript
interface Person {
    name: string;
    age: number;
}
// 对象只能有如上键，且对应类型的值
const tom: Person = {
    name: 'Tom',
    age: 25
};
```

- 定义可选 | 只读属性
  - 可选：`?`
  - 只读：`readonly`

```typescript
interface Person {
  readonly name: string;
  age?: number;
}
```

- 索引签名：用于未来添加未知值

```typescript
interface Person {
  readonly name: string;
  age?: number;
  [key: string]: any;
}
```

## interface 与 type 的区别

1. 两者都可以用来描述对象或函数的类型，但是语法不同

```typescript
// interface
interface Point {
  x: number;
  y: number;
}

interface SetPoint {
  (x: number, y: number): void;
}
```

```typescript
// type
type Point = {
  x: number;
  y: number;
};

type SetPoint = (x: number, y: number) => void;
```

2. 类型别名还可以用于其他类型，但接口不行
3. 接口可以定义多次,类型别名不可以
   - 接口可以定义多次，会被自动合并为单个接口

```typescript
interface Point { x: number; }
interface Point { y: number; }
const point: Point = { x: 1, y: 2 };
```

4. 扩展
   - 接口的扩展就是继承，通过 `extends` 来实现
   - 类型别名的扩展就是交叉类型，通过 `&` 来实现

```typescript
interface PointX {
    x: number
}

interface Point extends PointX {
    y: number
}
```

```typescript
type PointX = {
    x: number
}

type Point = PointX & {
    y: number
}
```

