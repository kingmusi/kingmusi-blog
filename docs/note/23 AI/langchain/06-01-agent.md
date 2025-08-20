# agent

## 创建agent

1. 创建提示词

```python
from langchain import hub

prompt = hub.pull("hwchase17/openai-functions-agent")
print(prompt)
```

> ```python
> [
>   SystemMessagePromptTemplate(prompt=PromptTemplate(input_variables=[], template='You are a helpful assistant')),
>   MessagesPlaceholder(variable_name='chat_history', optional=True),
>   HumanMessagePromptTemplate(prompt=PromptTemplate(input_variables=['input'], template='{input}')),
>   MessagesPlaceholder(variable_name='agent_scratchpad')
> ]
> ```

2. 构建agent

```python
from langchain.agents import create_tool_calling_agent

agent = create_tool_calling_agent(llm, tools, prompt)
```

3. 将 Agent 与 AgentExecutor 中的工具结合起来
   - AgentExecutor将重复调用代理并执行工具

```python
from langchain.agents import AgentExecutor

agent_executor = AgentExecutor(agent=agent, tools=tools)
```

4. 运行

```python
respose = agent_executor.invoke({ "input": "你好" })
```

```
{'input': '你好', 'output': '你好！有什么我可以帮助你的吗？'}
```

5. 整体代码

:::demo config={"packages":["langchain","langchain_deepseek"]}
```python
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_deepseek import ChatDeepSeek
from langchain_core.prompts import SystemMessagePromptTemplate, MessagesPlaceholder, PromptTemplate, ChatPromptTemplate, HumanMessagePromptTemplate
from langchain_core.tools import tool

@tool
def get_weather(city: str) -> str:
  """获取天气状况"""
  return "天晴晴朗"

llm = ChatDeepSeek(model_name="deepseek-chat", api_key="your_api_key")
tools = [get_weather]
prompt = ChatPromptTemplate.from_messages([
  SystemMessagePromptTemplate(prompt=PromptTemplate(input_variables=[], template='You are a helpful assistant')),
  MessagesPlaceholder(variable_name='chat_history', optional=True),
  HumanMessagePromptTemplate(prompt=PromptTemplate(input_variables=['input'], template='{input}')),
  MessagesPlaceholder(variable_name='agent_scratchpad')
])

agent = create_tool_calling_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools)
respose = agent_executor.invoke({ "input": "你好" })
print(respose)
```
:::

## 添加记忆

1. 创建会话记忆存储搜索函数

```python
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

store = {}
def get_session_history(session_id: str) -> BaseChatMessageHistory:
 	if session_id not in store:
 		store[session_id] = ChatMessageHistory()
 	return store[session_id]
```

2. 使用 `RunnableWithMessageHistory` 构建

```python
agent_with_history = RunnableWithMessageHistory(
    agent_executor,
    get_session_history,
    input_messages_key="input",
    history_messages_key="chat_history"
)
```

3. 运行

```python
response = agent_with_history.invoke(
    {"input": "你好哇，我叫kingmusi"},
    config={"configurable": {"session_id": "123"}}
)
print(response)

response = agent_with_history.invoke(
    {"input": "我叫什么名字？"},
    config={"configurable": {"session_id": "123"}}
)
print(response)
```

```
{'input': '你好哇，我叫kingmusi', 'chat_history': [], 'output': '你好，Kingmusi！很高兴认识你！有什么我可以帮你的吗？😊'}
{'input': '我叫什么名字？', 'chat_history': [HumanMessage(content='你好哇，我叫kingmusi', additional_kwargs={}, response_metadata={}), AIMessage(content='你好，Kingmusi！很高兴认识你！有什么我可以帮你的吗？😊', additional_kwargs={}, response_metadata={})], 'output': '你刚刚告诉我你的名字是 **Kingmusi**！没错吧？😄'}
```

