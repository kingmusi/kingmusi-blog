# 持久上下文token优化

## 问题

持久化最常见的用例之一是利用它来跟踪对话历史记录。这非常有用——它让对话的延续变得轻松。

然而，随着对话越来越长，这些对话历史记录会不断累积，占用**越来越多**的上下文窗口。这通常是不可取的，因为这会导致对大语言模型（LLM）的**调用成本更高**、**时间更长**，还可能**引发错误**。

为了防止这种情况发生，需要妥善管理对话历史记录。

## 策略一：过滤消息

防止对话历史记录膨胀的最直接方法是在消息传递给大语言模型（LLM）之前对消息列表进行过滤，只**保留最新的n条消息**

下面定义了一个非常简单的 `filter_messages` 函数并使用了它

```python
from langchain_core.messages import HumanMessage
from my_openai.deepseekv3 import get_deepseek_v3_client
from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.checkpoint.memory import MemorySaver

# 持久化
memory = MemorySaver()
config = {"configurable": {"thread_id": "1" } }

builder = StateGraph(MessagesState)

llm = get_deepseek_v3_client()

# 过滤消息，只保留最新的n条消息
def filter_messages(messages: list):
  # 下面 -1 换成 -n
  return messages[-1:]

def chatbot(state: MessagesState):
  # llm 调用只保留最新的 n 条消息
  messages = filter_messages(state["messages"])
  return {
    "messages": [llm.invoke(messages)]
  }

builder.add_node("chatbot", chatbot)
builder.add_edge(START, "chatbot")
builder.add_edge("chatbot", END)

graph = builder.compile(checkpointer=memory)
```

## 策略二：历史会话总结成摘要

生成对话历史摘要：

- 检查对话是否过长（可以通过检查消息数量或消息长度来完成）

- 如果过长，则创建摘要（这需要一个提示词）

- 然后删除除最后 N 条消息之外的所有消息

```python
from typing import Literal
from langchain_core.messages import HumanMessage
from my_openai.deepseekv3 import get_deepseek_v3_client
from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import RemoveMessage, SystemMessage

# 持久化
memory = MemorySaver()
config = {"configurable": {"thread_id": "1" } }

# 创建一个带有【总结】的状态
class State(MessagesState):
  summary: str

builder = StateGraph(State)

llm = get_deepseek_v3_client()

# 聊天函数
def chatbot(state: State):
  summary = state.get("summary", "")
  if summary:
    # 如果存在总结，则使用总结作为系统消息，并带上未删除的会话
    messages = [SystemMessage(content=f"以下是以前对话的总结：{summary}")] + state["messages"]
  else:
    # 如果不存在总结，则只使用当前会话
    messages = state["messages"]
  return {
    "messages": [llm.invoke(messages)]
  }

# 判断是否需要总结，总消息超过n条，则需要总结
def should_continue(state: State) -> Literal["summarize_conversation", END]:
  if len(state["messages"]) > 6:
    return "summarize_conversation"
  return END

# 生成的总结函数
def summarize_conversation(state: State):
  summary = state.get("summary", "")
  if summary:
    summary_message = (
      f"以下是以前对话的总结：{summary}\n"
      "请根据总结和当前对话，生成新的总结。"
    )
  else:
    summary_message = "请根据当前对话，生成总结。"
  
  messages = state["messages"] + [HumanMessage(content=summary_message)]
  # 生成总结
  response = llm.invoke(messages)
  # 删除除最后 2 条消息之外的所有消息
  delete_messages = [RemoveMessage(id=m.id) for m in state["messages"][:-2]]
  # 返回总结和删除的消息
  return {
    "summary": response.content,
    "messages": delete_messages
  }

builder.add_node("chatbot", chatbot)
builder.add_node(summarize_conversation)

builder.add_edge(START, "chatbot")
builder.add_conditional_edges("chatbot", should_continue)
builder.add_edge("summarize_conversation", END)

graph = builder.compile(checkpointer=memory)
```

## 策略三：向量搜索，召回相关记忆

```python
from langgraph.store.memory import InMemoryStore
from langchain_huggingface import HuggingFaceEmbeddings
from langgraph.graph import StateGraph, START, END, MessagesState
from langchain_core.messages import SystemMessage, HumanMessage
from my_openai.deepseekv3 import get_deepseek_v3_client
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.runnables import RunnableConfig
from langgraph.store.base import BaseStore
import uuid

llm = get_deepseek_v3_client()

store = InMemoryStore(
    index={
        "embed": HuggingFaceEmbeddings(model_name="thenlper/gte-large-zh"),
        # 使用向量数据库的维度
        "dims": 1024,
    }
)
namespace = ("chat-list")

def chat(state: MessagesState, config: RunnableConfig, *, store: BaseStore):
  user_message = state["messages"][-1]
  # 只获取相关的 n 条消息记录
  memory = store.search(namespace, query=user_message.content, limit=2)
  
  system_prompt = "\n\n".join(f"\nai: {item.value['ai']}\nhuman:{item.value['human']}" for item in memory)
  system_message = SystemMessage(content=f"以下是相关的历史会话记录：{system_prompt}")
  print(system_message.content)
  res = llm.invoke([system_message, user_message])

  store.put(namespace, str(uuid.uuid4()), { "ai": res.content, "human": user_message.content })
  
  return { "messages": [res] }

builder = StateGraph(MessagesState).add_node(chat).add_edge(START, "chat").add_edge("chat", END)
graph = builder.compile(checkpointer=MemorySaver(), store=store)
```

