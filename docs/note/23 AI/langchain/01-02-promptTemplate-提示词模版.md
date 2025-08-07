# PromptTemplate

## PromptTemplate —— 灵活的提示模板

**PromptTemplate** 是 LangChain 中用于构建和复用提示（prompt）的基础工具。它允许你通过占位符和变量，动态生成适合不同场景的提示内容。

**核心用法：**

```python
from langchain_core.prompts import PromptTemplate

prompt = PromptTemplate.from_template("请用{num}句话总结以下内容：{text}")
result = prompt.format(text="LangChain 是一个强大的 LLM 应用开发框架。", num="一")
print(result)
# 输出：请用一句话总结以下内容：LangChain 是一个强大的 LLM 应用开发框架。
```

> ⚠️ **注意**：  
> `PromptTemplate` 适用于**单轮对话**或**静态提示**，如果需要多轮对话或消息流，建议使用 `ChatPromptTemplates`。

## ChatPromptTemplates —— 多轮对话的提示模板

**ChatPromptTemplates** 是 LangChain 3 新增的功能（自 v0.1.0 起），专为多轮对话和消息流设计。它允许你以消息（Message）为单位，灵活组合系统、用户、AI 等多种角色的提示。

**典型用法：**

```python
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个乐于助人的 AI 助手。"),
    ("user", "{input}"),
])
result = prompt.format_messages(input="帮我写一个 Python 打印 Hello World 的例子。")
for msg in result:
    print(msg)
# 输出：
# SystemMessage(content='你是一个乐于助人的 AI 助手。')
# HumanMessage(content='帮我写一个 Python 打印 Hello World 的例子。')
```

**重点：**  
- `ChatPromptTemplates` 支持**多角色消息**，如 system、user、ai 等。
- 可以通过 `.from_messages()` 传入消息列表，**灵活组合多轮对话**。
- `.format_messages()` 返回的是消息对象列表，适合直接传递给 LLM。

> ⚠️ **注意**：  
> `ChatPromptTemplates` 适合**多轮对话**和**复杂消息流**，比 `PromptTemplate` 更适合对话型应用。

## MessagesPlaceholder —— 动态插入历史消息

**MessagesPlaceholder** 是 LangChain 3 的一项重要特性（自 v0.1.0 起），用于在对话模板中**动态插入历史消息**，实现上下文记忆和多轮对话。

**典型用法：**

```python
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一个专业的翻译助手。"),
    MessagesPlaceholder("history"),
    ("user", "{input}"),
])

# 假设有历史消息
history = [
    {"role": "user", "content": "你好"},
    {"role": "assistant", "content": "你好！有什么可以帮您？"}
]

result = prompt.format_messages(history=history, input="请把 'LangChain' 翻译成中文")
for msg in result:
    print(msg)
# 输出：
# SystemMessage(content='你是一个专业的翻译助手。')
# HumanMessage(content='你好')
# AIMessage(content='你好！有什么可以帮您？')
# HumanMessage(content="请把 'LangChain' 翻译成中文")
```

**重点：**  
- `MessagesPlaceholder` 允许你**动态插入消息**

> ⚠️ **注意**：  
> `MessagesPlaceholder` 仅在 `ChatPromptTemplates` 中使用，**不支持在 `PromptTemplate` 中使用**。
