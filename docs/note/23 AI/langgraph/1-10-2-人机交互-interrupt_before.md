# 人机交互-interrupt_before

## 流程

```mermaid
graph TD

A1[节点 1] -->|人工审核断点| B1((⛔ 停止))
B1 --> C1[检查点<br>状态: foo<br>下一个: 节点 2]
C1 --> D1[人工审核]

D1 --> E1[人工编辑 更新状态]
E1 --> F1[分叉检查点<br>状态: bar<br>下一个: 节点 2]

F1 --> G1[节点 2]
```



```python
graph = builder.compile(
  checkpointer=MemorySaver(),
  # 自定义在执行 step2 之前，中断
  interrupt_before=["step2"]
)
```

## interrupt_before

```mermaid
---
config:
  flowchart:
    curve: linear
---
graph TD;
        __start__([<p>__start__</p>]):::first
        step1(step1)
        step2(step2<hr/><small><em>__interrupt = before</em></small>)
        step3(step3)
        __end__([<p>__end__</p>]):::last
        __start__ --> step1;
        step1 --> step2;
        step2 --> step3;
        step3 --> __end__;
        classDef default fill:#f2f0ff,line-height:1.2
        classDef first fill-opacity:0
        classDef last fill:#bfb6fc
```



```python
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START
from langgraph.checkpoint.memory import MemorySaver

class State(TypedDict):
  input: str

def step1(state: State):
  print("step1")
  pass

def step2(state: State):
  print("step2")
  pass

def step3(state: State):
  print("step3")
  pass

builder = StateGraph(State).add_sequence([step1, step2, step3]).add_edge(START, "step1")

graph = builder.compile(
  checkpointer=MemorySaver(),
  # 自定义在执行 step2 之前，中断
  interrupt_before=["step2"]
)

thread = {"configurable": {"thread_id": "1"}}
```

执行断点前的部分

```python
for event in graph.stream({ "input": "hello" }, thread, stream_mode="values"):
  print(event)
```

```
{'input': 'hello'}
step1
```

执行到中断，可以用户自定义根据状态

```python
print(graph.get_state(thread).values) # 可以获取到中断前的状态
graph.update_state(thread, { "input": "world" }) # 可以更新状态
print(graph.get_state(thread).values)
```

```
{'input': 'hello'}
{'input': 'world'}
```

继续往下执行

```python
for event in graph.stream(None, thread, stream_mode="values"):
  print(event)
```

```
step2
step3
```

