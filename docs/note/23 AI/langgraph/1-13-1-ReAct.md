# ReAct

## 基础

构建一个最基础的聊天应用

```python
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage

model = ChatOpenAI(model="gpt-4o", temperature=0)

graph = create_react_agent(model, tools=[])

for chunk in graph.stream({"messages": HumanMessage(content="你好")}, stream_mode="messages"):
    print(chunk[0].content, end="", flush=True)
```

## 添加工具

```python
from typing import Literal
from langchain_core.tools import tool

@tool
def get_weather(city: Literal["北京", "广东"]):
    """查询城市天气情况"""
    if city == "北京":
        return "今天多云"
    elif city == "广东":
        return "今天下雨"
    else:
        raise AssertionError("未知城市")
        
graph = create_react_agent(model, tools=[get_weather])
```

## 线程级别内存

```python
from langgraph.checkpoint.memory import MemorySaver

memory = MemorySaver()
graph = create_react_agent(model, tools=[], checkpointer=memory)

config = {"configurable": {"thread_id": "1"}}
for chunk in graph.stream({"messages": HumanMessage(content="你好")}, config=config stream_mode="messages"):
    print(chunk[0].content, end="", flush=True)
```

## 系统提示（SystemPrompt）

```python
prompt = '家乡是广东，目前在北京工作'

graph = create_react_agent(model, tools=[], prompt=prompt)
```

## 人机交互

```python
graph = create_react_agent(model, tools=[get_weather], interrupt_before=["tools"])
```

## 结构化输出

```python
class ResponseFormat(BaseModel):
    """以这种格式回复用户。"""
    my_special_output: str


graph = create_react_agent(
    model,
    tools=tools,
    # 使用`response_format`参数指定结构化输出的模式
    response_format=ResponseFormat
)
```

> 需要模型支持

## 向量数据库

```python
import uuid
from typing import Optional, Annotated
from langchain.embeddings import init_embeddings
from langgraph.store.memory import InMemoryStore
from langgraph.prebuilt import InjectedStore
from langgraph.store.base import BaseStore
from langchain_core.messages import SystemMessage

embeddings = init_embeddings("openai:text-embedding-3-small")
store = InMemoryStore(
    index={
        "embed": embeddings,
        "dims": 1536,
    }
)

# 存储一些记忆
store.put(("user_123", "memories"), "1", {"text": "我喜欢吃泡芙"})
store.put(("user_123", "memories"), "2", {"text": "我喜欢跑步"})
store.put(("user_123", "memories"), "4", {"text": "我家乡在广东"})
store.put(("user_123", "memories"), "5", {"text": "我目前在北京工作"})
store.put(("user_123", "memories"), "6", {"text": "我的职业是程序员"})

# 结合ReAct使用

# 1. 搜索数据库，生成相关系统提示词
def prepare_messages(state, *, store: BaseStore):
    items = store.search(
        ("user_123", "memories"), query=state["messages"][-1].content, limit=2
    )
    memories = "\n".join(item.value["text"] for item in items)
    memories = f"## 以下是一些有关用户的记忆\n{memories}" if memories else ""
    return [SystemMessage(content=memories)] + state["messages"]
  
# 定义一个查找数据库的工具
def upsert_memory(
    content: str,
    *,
    memory_id: Optional[uuid.UUID] = None,
    store: Annotated[BaseStore, InjectedStore],
):
    """向数据库中添加用户信息"""
    mem_id = memory_id or uuid.uuid4()
    store.put(
        ("user_123", "memories"),
        key=str(mem_id),
        value={"text": content},
    )
    return f"存储用户信息：{mem_id}"
  
agent = create_react_agent(
    model,
    tools=[upsert_memory],
    prompt=prepare_messages,
    store=store,
)
```

## 管理历史对话

定义 `pre_model_hook` 函数，在调用`model`前进行一次管理

```python
from langchain_core.messages.utils import (
    trim_messages, 
    count_tokens_approximately
)
from langgraph.prebuilt import create_react_agent

# 此函数将在每次调用LLM之前被调用
def pre_model_hook(state):
    trimmed_messages = trim_messages(
        state["messages"],
        strategy="last",
        token_counter=count_tokens_approximately,
        max_tokens=384,
        start_on="human",
        end_on=("human", "tool"),
    )
    # 您可以将更新后的消息返回到`llm_input_messages`或`messages`键下（见下方注释）
    return {"llm_input_messages": trimmed_messages}

checkpointer = InMemorySaver()
agent = create_react_agent(
    model,
    tools,
    pre_model_hook=pre_model_hook,
    checkpointer=checkpointer,
)
```

> - 若要在图状态中**保持原始消息历史记录不变**，并将更新后的历史记录仅作为输入传递给LLM，请在`llm_input_messages`键下返回更新后的消息
> - 若要在图状态中**用更新后的历史记录覆盖原始消息历史记录**，请在`messages`键下返回更新后的消息