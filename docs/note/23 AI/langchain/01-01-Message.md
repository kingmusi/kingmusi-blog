# Message

> **总结**：LangChain 3 的消息体系是构建对话、Agent、工具调用等高级功能的基础。理解不同类型的消息对象及其扩展，是高效开发智能体应用的关键。

## [BaseMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.base.BaseMessage.html)

**BaseMessage** 是 LangChain 中所有消息类型的基类，代表一次对话中的一条消息。

```python
from langchain_core.messages import BaseMessage
```

- **主要参数**：
  - `content`：消息内容（str 或 list[str | dict]，必填）
  - `id`：消息唯一标识（str，可选）
  - `name`：消息名称（str，可选）
  - `response_metadata`：响应元数据（dict，可选）
  - `type`：消息类型（str，必填，子类自动设置）

> **重点**：所有消息类型都继承自 `BaseMessage`，并在其基础上扩展了不同的属性和用途。


## [HumanMessage 👤](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.human.HumanMessage.html)

**HumanMessage** 表示“**人类**”用户发出的消息。

```python
from langchain_core.messages import HumanMessage

msg = HumanMessage(content="你好，LangChain！")
```

## [AIMessage 🤖](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.ai.AIMessage.html)

**AIMessage** 表示 **AI**（如 LLM）生成的回复。

```python
from langchain_core.messages import AIMessage

msg = AIMessage(content="你好！很高兴为你服务。")
```

- **tool_calls 属性**：
  - `tool_calls` 用于描述模型决定调用哪些工具，结构通常为列表，包含每个工具的 `name`、`args`、`id` 等信息。
  - 例如：
    ```python
    AIMessage(content="", tool_calls=[{"name": "get_weather", "args": {"city": "beijing"}, "id": "call_123"}])
    ```

## [SystemMessage 🧩](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.system.SystemMessage.html)

**SystemMessage** 用于传递**系统**级别的指令或上下文，通常用于设定 AI 的行为或角色。

```python
from langchain_core.messages import SystemMessage

msg = SystemMessage(content="你是一个乐于助人的AI助手。")
```

- **重点**：在对话开始前，设定 AI 的“人设”或行为准则。

> **注意**：SystemMessage 并不会直接参与对话，但会影响 AI 的回复风格和内容。

## [ToolMessage 🛠️](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.tool.ToolMessage.html)

**ToolMessage** 用于描述工具调用的结果，**支持多工具并发调用**。

```python
from langchain_core.messages import ToolMessage

msg = ToolMessage(
    tool_call_id="call_Jja7J89XsjrOLA5r!MEOW!SL",
    content="{'temperature': '28°C', 'condition': '晴'}"
)
```

- **主要参数**：
  - `tool_call_id`：工具调用唯一标识（必填）
  - `content`：消息内容（必填）
  - 其他同 BaseMessage
- **重点**：`tool_call_id` 字段用于将工具调用请求与响应一一对应，适合并发场景。
- > **注意**：ToolMessage 是 FunctionMessage 的升级版，推荐优先使用。

## [FunctionMessage](https://python.langchain.com/api_reference/core/messages/langchain_core.messages.function.FunctionMessage.html)

**FunctionMessage** 用于将工具执行结果传递回模型（**旧版消息类型**，不包含 tool_call_id 字段）。

```python
from langchain_core.messages import FunctionMessage

msg = FunctionMessage(
    name="get_weather",
    content="{'city': '北京', 'date': '2024-06-01'}"
)
```

- **主要参数**：
  - `name`：函数名（必填）
  - `content`：消息内容（必填）
  - 其他同 BaseMessage
- **重点**：FunctionMessage 适用于单工具调用场景，**不支持并发工具调用的结果关联**。
> **注意**：FunctionMessage 是 ToolMessage 的旧版实现，推荐优先使用 ToolMessage 以支持多工具并发。


## 典型用法示例

### 多轮对话消息列表

```python
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

messages = [
    SystemMessage(content="你是一个专业的翻译助手。"),
    HumanMessage(content="请将 'Hello' 翻译成中文。"),
    AIMessage(content="你好")
]
```

### 工具调用场景

```python
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage

messages = [
    HumanMessage(content="今天天气怎么样？"),
    AIMessage(content="", tool_calls=[{"name": "get_weather", "args": {"city": "beijing"}, "id": "call_Jja7J89XsjrOLA5r!MEOW!SL"}]),
    ToolMessage(tool_call_id="call_Jja7J89XsjrOLA5r!MEOW!SL", content="{'temperature': '30°C', 'condition': '多云'}")
]
```
