# LCEL & chain

## ✨ 什么是 LCEL？

[LCEL（LangChain Expression Language）](https://python.langchain.com/docs/concepts/lcel/)是 LangChain v0.3 版本引入的链式编排新范式。  
**它让你可以像搭积木一样组合、串联、并行各种 Runnables，极大提升了链式开发的灵活性和可读性。**

## 🚀 LCEL 的优势

- **优化的并行执行**：可以用 `RunnableParallel` 并发运行多个子链，显著降低延迟。
- **原生异步支持**：所有链都可以异步运行，适合高并发场景。
- **简化流式处理**：支持流式输出，提升响应速度和用户体验。
- **标准化 API**：所有链都是 `Runnable`，用法统一。
- **便捷调用转换**：定义好一条链后，可以根据不同情况调用`invoke`、`stream`等API实现不同的效果
- **自动追踪**：每一步都自动记录到 LangSmith，方便调试和监控。
- **可部署**：LCEL 链可直接用 LangServe 部署上线。

> **重点**：LCEL 让链式开发更快、更强、更易维护。
>
> LCEL 适合简单链路（如 prompt + llm + parser），复杂流程（如分支、循环、多智能体）建议用 LangGraph。

## 🧩 LCEL 的核心组件

### 1. RunnableSequence（顺序链）

依次串联多个 Runnables，前一个的输出作为下一个的输入。

```python
from langchain_core.runnables import RunnableSequence

chain = RunnableSequence([runnable1, runnable2])
final_output = chain.invoke(some_input)
```

**等价于：**

```python
output1 = runnable1.invoke(some_input)
final_output = runnable2.invoke(output1)
```

### 2. RunnableParallel（并行链）

并发运行多个 Runnables，输入相同，输出以字典形式返回。

```python
from langchain_core.runnables import RunnableParallel

chain = RunnableParallel({
    "key1": runnable1,
    "key2": runnable2,
})
final_output = chain.invoke(some_input)
# final_output: {"key1": ..., "key2": ...}
```

## 🪄 LCEL 的简洁语法

### 1. `|` 操作符（管道符）

可以用 `|` 快速串联两个 Runnables，自动构建 `RunnableSequence`。

```python
chain = runnable1 | runnable2
```

**等价于：**

```python
chain = RunnableSequence([runnable1, runnable2])
```

> **重点**：`|` 操作符让链式调用更直观，推荐使用！

### 2. `.pipe` 方法

如果不喜欢操作符重载，可以用 `.pipe` 方法。

```python
chain = runnable1.pipe(runnable2)
```

### 3. 自动类型转换（Coercion）

- **字典**：自动转为 `RunnableParallel`

```python
mapping = {
    "key1": runnable1,
    "key2": runnable2,
}

chain = mapping | runnable3

# 等价于
# RunnableSequence([RunnableParallel(mapping), runnable3])
```

- **函数**：自动转为 `RunnableLambda`

```python
def my_func(x):
    return x + 1

chain = my_func | runnable1

# 等价于
# RunnableSequence([RunnableLambda(some_func), runnable1])
```

> **注意**：  
>
> - 字典和函数本身不是 Runnable，不能直接 `.invoke()`，必须放在链中使用。

## Runable interface（可运行接口）

许多 LangChain 组件 都实现了 Runnable 协议，包括聊天模型、LLMs、输出解析器、检索器、提示模板等等。

这是⼀个标准接 ⼝，可以轻松定义⾃定义链，并以标准⽅式调⽤它们。 标准接⼝包括：

- `stream`: 返回响应的数据块
- `invoke`: 对输⼊调⽤链
- `batch`: 对输⼊列表调⽤链

还有相应的异步⽅法，应该与 asyncio ⼀起使⽤ await 语法以实现并发：

- `astream` : 异步返回响应的数据块
- `ainvoke` : 异步对输⼊调⽤链
- `abatc`h : 异步对输⼊列表调⽤链
- `astream_log` : 异步返回中间步骤，以及最终响应
- `astream_events` : beta 流式传输链中发⽣的事件（在 langchain-core 0.1.14 中引 ⼊）
