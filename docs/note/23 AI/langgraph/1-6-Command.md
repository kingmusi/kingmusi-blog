# Command

## 实现能力

1. 在一个节点中，控制**状态更新**和**接下来要转到哪个节点**
2. 导航到父图中的其他节点

## 基础

```python
def my_node(state: State) -> Command[Literal["my_other_node"]]:
    return Command(
        # 更新状态
        update={"foo": "bar"},
        # 导航到某个节点
        goto="my_other_node"
    )
```

> 在节点函数中使用 `Command`，必须添加返回类型注释，标注可能会导航到哪些节点。这对于图渲染是必要的

可以动态使用 `Command`

```python 
def my_node(state: State) -> Command[Literal["my_other_node"]]:
    if state["foo"] == "bar":
        return Command(update={"foo": "baz"}, goto="my_other_node")
```

## 导航到父图中的节点

**指定`graph=Command.PARENT`**

```python
def my_node(state: State) -> Command[Literal["my_other_node"]]:
    return Command(
        update={"foo": "bar"},
        goto="other_subgraph",
        graph=Command.PARENT
    )
```

> 将 `graph` 设置为 `Command.PARENT` 将导航到最近的父图。
