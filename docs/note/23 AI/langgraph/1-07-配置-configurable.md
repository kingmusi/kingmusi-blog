# 配置

## 作用

在图执行过程中，有一个**部分数据**，在图执行的时候就可确定，**不需要作为状态进行跟踪和更新**
这部分数据可以放在 `configurable` 键中

## 基础例子

```python
from langgraph.graph.message import MessagesState
from langchain_core.messages import AIMessage, HumanMessage
from langgraph.graph import StateGraph, START
from langchain_openai import ChatOpenAI

# 两种模型
models = {
    "deepseek": ChatOpenAI(model_name="deepseek-chat", openai_api_base="https://api.deepseek.com"),
    "gpt": ChatOpenAI(model_name="gpt-4.1-mini-2025-04-14")
}

# 定义配置数据类型
class ConfigSchema(TypedDict):
    model: Optional[str]

def node(state: MessagesState, config: RunnableConfig):
  # 根据配置，选择不同模型
  model_name = config["configurable"].get("model", "deepseek")
  model = models[model_name]
  response = model.invoke(state["messages"])
  return {"messages": [response]}

# 配置
graph = StateGraph(MessagesState, ConfigSchema)
graph.add_node(node).add_edge(START, "node").compile()
```

调用时传入配置

```python
config = {"configurable": {"model": "gpt"}}
graph.invoke({"messages": [HumanMessage(content="hi")]}, config=config)
```



