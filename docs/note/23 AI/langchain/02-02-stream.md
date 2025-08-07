# Streaming

> 参考文档：  
> [LangChain 官方 Streaming 概念指南](https://python.langchain.com/docs/concepts/streaming/)  
> [LangChain 官方 Streaming How-to](https://python.langchain.com/docs/how_to/streaming/)

## 1️⃣ 什么是 Streaming？

**Streaming** 是指在 LLM、Chain、Graph 等组件执行时，**实时获取其输出内容或事件**，而不是等到全部计算完成后一次性返回结果。

- **Streaming 能极大提升用户体验和系统响应速度，适合交互式应用。**

## 2️⃣ Streaming 的三大应用场景

1. **LLM 输出流式返回**：边生成边展示，提升交互体验
2. **Pipeline/Workflow 进度流式追踪**：可视化每一步的执行过程
3. **自定义数据流**：在流中插入自定义事件或数据，满足特殊需求

## 3️⃣ Streaming API 详解

### 3.1 `stream()` / `astream()` —— 内容流

- 适用于 LLM、ChatModel、Chain、Runnable、LangGraph 等
- **同步/异步**两种模式，推荐用异步（`astream()`）

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(streaming=True)
for chunk in llm.stream("Say foo"):
    print(chunk.content, end="", flush=True)
```

- 重点：**内容流只返回最终内容片段，适合直接展示。**

### 3.2 `astream_events()` —— 事件流

- 适用于 LCEL 组装的 Chain、Runnable、ChatModel 等
- 可以获取**中间步骤、元数据、调试信息**等丰富事件

```python
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_anthropic import ChatAnthropic

model = ChatAnthropic(model="claude-3-sonnet-20240229")
prompt = ChatPromptTemplate.from_template("tell me a joke about {topic}")
parser = StrOutputParser()
chain = prompt | model | parser

async for event in chain.astream_events({"topic": "parrot"}):
    kind = event["event"]
    if kind == "on_chat_model_stream":
        print(event, end="|", flush=True)
```

- 重点：**事件流适合需要追踪中间状态、调试、可视化的场景。**

| event                | name             | chunk                           | input                                         | output                                          |
| -------------------- | ---------------- | ------------------------------- | --------------------------------------------- | ----------------------------------------------- |
| on_chat_model_start  | [model name]     |                                 | {"messages": [[SystemMessage, HumanMessage]]} |                                                 |
| on_chat_model_stream | [model name]     | AIMessageChunk(content="hello") |                                               |                                                 |
| on_chat_model_end    | [model name]     |                                 | {"messages": [[SystemMessage, HumanMessage]]} | AIMessageChunk(content="hello world")           |
| on_llm_start         | [model name]     |                                 | {'input': 'hello'}                            |                                                 |
| on_llm_stream        | [model name]     | 'Hello'                         |                                               |                                                 |
| on_llm_end           | [model name]     |                                 | 'Hello human!'                                |                                                 |
| on_chain_start       | format_docs      |                                 |                                               |                                                 |
| on_chain_stream      | format_docs      | "hello world!, goodbye world!"  |                                               |                                                 |
| on_chain_end         | format_docs      |                                 | [Document(...)]                               | "hello world!, goodbye world!"                  |
| on_tool_start        | some_tool        |                                 | {"x": 1, "y": "2"}                            |                                                 |
| on_tool_end          | some_tool        |                                 |                                               | {"x": 1, "y": "2"}                              |
| on_retriever_start   | [retriever name] |                                 | {"query": "hello"}                            |                                                 |
| on_retriever_end     | [retriever name] |                                 | {"query": "hello"}                            | [Document(...), ..]                             |
| on_prompt_start      | [template_name]  |                                 | {"question": "hello"}                         |                                                 |
| on_prompt_end        | [template_name]  |                                 | {"question": "hello"}                         | ChatPromptValue(messages: [SystemMessage, ...]) |

> 自定义工具如果需要支持流式调用，即触发 `on_chain_stream` 事件，可以在工具函数上添加一个 `@chain` 的装饰器，或者使用 `RunnableLambda` 包裹函数
>
> ```python
> from langchain_core.runnables import RunnableLambda, chain
> import asyncio
> 
> # def reverse_word(word: str):
> #     return word[::-1]
> # reverse_word = RunnableLambda(reverse_word)
> 
> @chain
> def reverse_word(word: str):
>     return word[::-1]
> 
> async def main():
>     async for event in reverse_word.astream_events("hello"):
>        print(event)
> 
> asyncio.run(main())
> ```
>
> ```
> {'event': 'on_chain_start', 'data': {'input': 'hello'}, 'name': 'reverse_word', 'tags': [], 'run_id': '40e5b493-51cf-4b8a-9559-fa5ba64cd601', 'metadata': {}, 'parent_ids': []}
> {'event': 'on_chain_stream', 'run_id': '40e5b493-51cf-4b8a-9559-fa5ba64cd601', 'name': 'reverse_word', 'tags': [], 'metadata': {}, 'data': {'chunk': 'olleh'}, 'parent_ids': []}
> {'event': 'on_chain_end', 'data': {'output': 'olleh'}, 'run_id': '40e5b493-51cf-4b8a-9559-fa5ba64cd601', 'name': 'reverse_word', 'tags': [], 'metadata': {}, 'parent_ids': []}
> ```

### 3.3 LangGraph 的多种流式模式

- LangGraph 支持多种流式模式（mode）：
  - `"values"`：每步的全部 state
  - `"updates"`：每步的节点名和更新内容
  - `"debug"`：调试事件
  - `"messages"`：LLM 消息逐 token 输出
  - `"custom"`：自定义输出（需用 StreamWriter）

> **注意**  
> LangGraph 的 `stream`/`astream` 已经非常强大，通常不需要再用 `astream_events`。

## 4️⃣ 自动流式模式（Auto-Streaming）

- 如果检测到正在流式消费整个应用，LangChain 会在你调用 `invoke`/`ainvoke` 时**自动切换到流式模式**
- 这样即使你用的是非流式方法，也能获得流式体验

```python
def node(state):
    # LangChain 会自动切换到流式
    ai_message = model.invoke(state["messages"])
    ...

for chunk in compiled_graph.stream(..., mode="messages"):
    ...
```

- 重点：**自动流式让开发更简单，无需手动切换 API。**

## 5️⃣ 流式输出JSON

使用 `JsonOutputParser` 输出解析器，解析器会尝试将部分 json“自动完成”为有效状态

```python
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import JsonOutputParser
import asyncio

llm = ChatOpenAI(streaming=True)
chain = llm | JsonOutputParser()

async def async_stream():
  async for text in chain.astream(
            "以JSON 格式输出法国、西班牙和日本的国家及其人口列表。"
            '使用一个带有“countries”外部键的字典，其中包含国家列表。'
            "每个国家都应该有键`name`和`population`"
    ):
        print(text, end="|", flush=True)

asyncio.run(async_stream())
```

输出

```
{}
{'countries': []}
{'countries': [{}]}
{'countries': [{'name': ''}]}
{'countries': [{'name': 'France'}]}
{'countries': [{'name': 'France', 'population': 677}]}
{'countries': [{'name': 'France', 'population': 677500}]}
{'countries': [{'name': 'France', 'population': 67750000}]}
{'countries': [{'name': 'France', 'population': 67750000}, {}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': ''}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': 'Spain'}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': 'Spain', 'population': 474}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': 'Spain', 'population': 474200}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': 'Spain', 'population': 47420000}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': 'Spain', 'population': 47420000}, {}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': 'Spain', 'population': 47420000}, {'name': ''}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': 'Spain', 'population': 47420000}, {'name': 'Japan'}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': 'Spain', 'population': 47420000}, {'name': 'Japan', 'population': 125}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': 'Spain', 'population': 47420000}, {'name': 'Japan', 'population': 125700}]}
{'countries': [{'name': 'France', 'population': 67750000}, {'name': 'Spain', 'population': 47420000}, {'name': 'Japan', 'population': 125700000}]}
```

