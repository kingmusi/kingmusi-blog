# fewShot

## 介绍

提供少量个例子。在提示中的作用是通过少量样本引导模型对特定任务进行学习和执行。可以大幅度提高模型执行的质量

## FewShotPromptTemplate

该对象接受少量示例和少量示例的格式化程序。

:::demo config={"packages":["langchain_core","langchain_deepseek"]}
```python
from langchain_core.prompts import PromptTemplate, FewShotPromptTemplate
from langchain_deepseek import ChatDeepSeek
  
llm = ChatDeepSeek(model_name="deepseek-chat", api_key="you_api_key")

example_prompt = PromptTemplate.from_template("问题：{question}\n答案：{answer}")

examples = [
  {
    "question": "第一次鸦片战争发生在哪一年？",
    "answer": "1840年"
  },
  {
    "question": "中国古代四大发明包括哪些？",
    "answer": "造纸术、印刷术、火药、指南针"
  },
  {
    "question": "中华人民共和国的成立年份是？",
    "answer": "1949年"
  }
]

prompt = FewShotPromptTemplate(
  examples=examples,
  example_prompt=example_prompt,
  suffix="请按以上示例进行回答。\n问题：{input}\n答案：",
  input_variables=["input"]
)

chain = prompt | llm
result = chain.invoke({"input": "清朝是中国历史上的哪个朝代？"})
print(result)
```
:::

