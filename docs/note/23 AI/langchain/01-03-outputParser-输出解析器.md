# outputParser

## OutputParser 作用与意义

在实际应用中，LLM 返回的通常是**非结构化文本**，而我们的业务逻辑往往需要**结构化数据**（如字典、列表、对象等）。OutputParser 就是用来**桥接 LLM 输出与业务需求**的。

## 常用 OutputParser 介绍

### 1️⃣ StrOutputParser

- **作用**：最基础的解析器，直接返回 LLM 的原始字符串输出。
- **适用场景**：只需要原始文本，不做进一步结构化处理时。
- **示例代码**：

  ```python
  from langchain_core.output_parsers import StrOutputParser
  from langchain_core.messages import AIMessage
  
  message = AIMessage(content="Hello, world!")
  
  parser = StrOutputParser()
  result = parser.invoke(message) # 直接获取内容
  print(result)  # 输出: Hello, world!
  ```

### 2️⃣ CommaSeparatedListOutputParser

- **作用**：将 LLM 输出的逗号分隔字符串解析为 Python 列表。
- **适用场景**：让 LLM 输出一组项目时（如关键词、标签等）。
- **示例代码**：

  ```python
  from langchain_core.output_parsers import CommaSeparatedListOutputParser
  from langchain_core.messages import AIMessage
  
  message = AIMessage(content="苹果, 香蕉, 橙子")
  
  parser = CommaSeparatedListOutputParser()
  result = parser.invoke(message)
  print(result)  # 输出: ['苹果', '香蕉', '橙子']
  ```
  
  > **注意**：确保 LLM 输出的格式与预期一致，否则解析可能失败。

### 3️⃣ JsonOutputParser

- **作用**：将 LLM 输出的 JSON 字符串解析为 Python 对象（如 dict）。
- **适用场景**：需要 LLM 输出结构化 JSON 数据时。
- **示例代码**：

  ```python
  from langchain_core.output_parsers import JsonOutputParser
  from langchain_core.messages import AIMessage
  
  message = AIMessage(content='{"name": "张三", "age": 18}')
  
  parser = JsonOutputParser()
  result = parser.invoke(message)
  print(result)  # 输出: {'name': '张三', 'age': 18}
  ```
  
  > **重点**：**强烈建议**在 prompt 中明确要求 LLM 输出合法的 JSON 格式。
  >
  > 以下类似的输出也可以成功解析：
  >
  > ```python
  > AIMessage(content='```json\n{"name": "张三", "age": 18}\n```')
  > AIMessage(content='输出：```json\n{"name": "张三", "age": 18}\n```')
  > ```

### 4️⃣ PydanticOutputParser

- **作用**：基于 Pydantic 模型，将 LLM 输出解析为强类型对象。
- **适用场景**：需要类型校验和更复杂结构时。
- **示例代码**：

  ```python
  from langchain.output_parsers import PydanticOutputParser
  from pydantic import BaseModel
  
  class Person(BaseModel):
      name: str
      age: int
  
  parser = PydanticOutputParser(pydantic_object=Person)
  result = parser.invoke('{"name": "李四", "age": 20}')
  print(result)  # 输出: Person(name='李四', age=20)
  ```

  > **重点**：PydanticOutputParser 能自动校验字段类型，**大大提升数据安全性**。在模型外的数据也可以被过滤掉
  >
  > ```python
  > from langchain.output_parsers import PydanticOutputParser
  > from pydantic import BaseModel
  > 
  > class Person(BaseModel):
  >     name: str
  >     age: int
  > 
  > parser = PydanticOutputParser(pydantic_object=Person)
  > result = parser.invoke('输出：```json\n{"name": "张三", "age": 18, "gender": "男"}\n```')
  > print(result)  # 输出: Person(name='张三', age=18)
  > ```
  
  > **注意**：PydanticOutputParser 需要安装 `pydantic` 库。

  > 通过 `get_format_instructions()` 可以获取生成约定结构的**提示词**，在给AI的提示词里加入这个提示词，就可以得到相应的输出了
  >
  > ```python
  > from pydantic import BaseModel, Field
  > from langchain_core.output_parsers import PydanticOutputParser, JsonOutputParser
  > from langchain_core.prompts import ChatPromptTemplate
  > 
  > class Joke(BaseModel):
  > 	subject: str = Field(description="笑话的主题")
  > 	content: str = Field(description="笑话的内容")
  > 
  > parser = PydanticOutputParser(pydantic_object=Joke)
  > # parser = JsonOutputParser(pydantic_object=Joke) json解析器也可以
  > prompt = ChatPromptTemplate.from_messages([
  >   ("system", f"你是一个笑话大师，请根据用户的问题进行回答。\n{parser.get_format_instructions().replace('{', '{{').replace('}', '}}')}"),
  >   ("user", "{input}"),
  > ])
  > 
  > chain = prompt | llm | parser
  > 
  > result = chain.invoke({"input": "我想听一个关于狗的笑话"})
  > ```

### 5️⃣ OutputFixingParser

- **作用**：当解析失败时，自动重试（如让 LLM 重新输出）。
- **适用场景**：LLM 输出不稳定、偶尔格式错误时。
- **示例代码**：

  ```python
  from langchain.output_parsers.fix import OutputFixingParser
  from langchain_core.output_parsers import PydanticOutputParser
  from pydantic import BaseModel
  from my_openai.deepseekv3 import get_deepseek_v3_client
  
  llm = get_deepseek_v3_client()
  
  class Person(BaseModel):
      name: str
      age: int
  
  parser = PydanticOutputParser(pydantic_object=Person)
  fix_parser = OutputFixingParser.from_llm(parser=parser, llm=llm, max_retries=2)
  # 假设AI返回的age类型为str，使用OutputFixingParser修正为int类型
  result = fix_parser.invoke('{"name": "张三", "age": "18"}')
  print(result)  # 输出: Person(name='张三', age=18)
  ```
  
  > **重点**：**提升健壮性**，但会增加调用次数和成本。

