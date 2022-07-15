# class（类）

## 使用

```typescript
class Person {
    name: string;
    constructor(name: string) {
        this.name = name
    }
    printName(): string {
        return `hello, my name is ${this.name}`
    }
}
```

## 约束

- **public** 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
- **private** 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- **protected** 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

> 优化写法，下面结果一样
>
> ```typescript
> // typescript 4 前
> class Person {
>  public name: string = '';
>  constructor(name: string) {
>      this.name = name
>  }
> }
> ```
>
> ```typescript
> // typescript 4 后
> class Person {
>  constructor(public name: string) {}
> }
> ```

## implements（实现）

- 必须实现对应接口的方法

```typescript
interface ISay {
    say(something: string): string
}

class Person implements ISay {
    constructor(name: string) {
        this.name = name
    }
    say(something: string): string {
        return `${this.name} say：${something}`
    }
}
```

> 多个接口，可用 `,` 隔开