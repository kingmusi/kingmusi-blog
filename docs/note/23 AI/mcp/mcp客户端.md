# MCP 客户端——nodejs

```markmap
- MCP 客户端
  - 环境搭建
    - Node.js 项目
    - 依赖安装
    - 环境变量配置
  - 核心组件
    - Client 类
    - StdioClientTransport
  - 主要功能
    - 服务器连接
    - 工具管理
    - 资源处理
    - 查询处理
  - 最佳实践
    - 错误处理
    - 资源清理
```

## [环境搭建](https://mcp-docs.cn/quickstart/client#node)

#### 安装依赖

```shell
npm install @modelcontextprotocol/sdk
```

## 核心组件 🧩

### Client类

`Client` 类是 MCP 客户端操作的主要入口点。它提供了一种结构化的方式来与 MCP 服务器交互。

```ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

const mcp = new Client({
  name: "mcp-client",
  version: "1.0.0"
});
```

### StdioClientTransport

`StdioClientTransport` 使用标准输入/输出流处理客户端和服务器之间的通信。它特别适用于本地开发和测试。

```ts
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

// 连接到具体的mcp服务器脚本上
const transport = new StdioClientTransport({
  command: "python3", // 或 "node"
  args: ["server_script.py"] // 或 ["server_script.js"]
});
```

## 核心功能

### 工具处理

- 从服务器获取可用工具

```ts
const toolsResult = await mcp.listTools();
const tools = toolsResult.tools.map(tool => ({
  name: tool.name,
  description: tool.description,
  parameters: tool.inputSchema,
}));
```

- 调用工具

```ts
const result = await mcp.callTool({
  name: "工具名称",
  arguments: toolArgs
});
```

### 资源处理

- 从服务器获取可用资源

```ts
const resourceResult = await mcp.listResources();
```

- 调用资源

```ts
// 读取特定资源
const resource = await mcp.readResource({
  name: "资源名称",
  uri: "资源URI"
});
```

## 错误及断开处理

### 错误处理

始终为服务器连接和工具调用实现适当的错误处理：

```ts
try {
  await mcpClient.connectToServer(serverPath);
} catch (e) {
  console.error("连接失败:", e);
  throw e;
}
```

### 资源清理

当客户端完成时，始终清理资源：

```ts
async cleanup() {
  await this.mcp.close();
}
```

## 实践

```ts
import { ChatDeepSeek } from '@langchain/deepseek'
import { HumanMessage, BaseMessage, ToolMessage, AIMessage } from '@langchain/core/messages'
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";
import dotenv from "dotenv";

// 加载 .env 配置
dotenv.config()

class MCPClient {
  // mcp 客户端
  private mcp: Client;
  // 使用deepseek 作为 llm 应用
  private openai: ChatDeepSeek;
  // 链接服务器的连接器
  private transport: StdioClientTransport | null = null;
  // 工具列表
  private tools: any[] = [];
  // 资源名称和uri的映射表
  private resourceToolsUriMap: Map<string, string> = new Map()

  constructor() {
    // 初始化llm
    this.openai = new ChatDeepSeek({
      apiKey: process.env.DEEPSEEK_KEY,
      model: "deepseek-chat",
    })
    // 初始化mcp客户端
    this.mcp = new Client({
      name: "mcp-client",
      version: "1.0.0"
    })
  }

  // 连接到 MCP 服务器
  async connectToServer(serverScriptPath: string) {
    try {
      const isJs = serverScriptPath.endsWith(".js")
      const isPy = serverScriptPath.endsWith(".py")

      if (!isJs && !isPy) {
        throw new Error("Invalid server script path. Must end with .js or .py")
      }

      const command = isPy
        ? process.platform === 'win32'
          ? "python"
          : "python3"
        : process.execPath
      
      this.transport = new StdioClientTransport({
        command,
        args: [serverScriptPath]
      })
      this.mcp.connect(this.transport)

      // 获取工具列表，并截取相关参数
      const toolsResult = await this.mcp.listTools()
      this.tools = toolsResult.tools.map((tool) => ({
        name: tool.name,
        description: tool.description,
        input_schema: tool.inputSchema,
      }))

      // 获取资源列表，并截取相关参数
      const resourceResult = await this.mcp.listResources()
      this.tools.push(...resourceResult.resources.map(resource => {
        this.resourceToolsUriMap.set(resource.name, resource.uri)
        return {
          name: resource.name,
          description: resource.description || ''
        }
      }))
      
      // 为llm绑定工具
      this.openai = this.openai.bindTools(this.tools.map(tool => ({
        type: "function",
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.input_schema,
        }
      })), { tool_choice: "auto" }) as ChatDeepSeek

      console.log("已连接到服务器，工具包括：", this.tools.map((tool) => tool.name).join(", "))
    } catch (e) {
      console.error("无法连接到 MCP 服务器: ", e)
      throw e
    }
  }

  // 添加处理查询和处理工具调用的核心功能
  async processQuery(query: string) {
    const messages: BaseMessage[] = [
      new HumanMessage(query)
    ]

    const response = await this.openai.invoke(messages)
    messages.push(response)

    // 工具调用
    if (Array.isArray(response.tool_calls) && response.tool_calls.length > 0) {
      const toolCalls = response.tool_calls
      // 执行工具，并获取调用结果
      const toolResults = await Promise.allSettled(
        toolCalls.map(toolCall => 
          this.resourceToolsUriMap.has(toolCall.name) ? 
            // 执行资源
            this.mcp.readResource({
              name: toolCall.name,
              uri: this.resourceToolsUriMap.get(toolCall.name) || ''
            }) : 
            // 执行工具
            this.mcp.callTool({
              name: toolCall.name,
              arguments: toolCall.args
            })
        )
      )
      const toolMessages = toolResults.map((res, index) => {
        return new ToolMessage({
          tool_call_id: toolCalls[index].id!,
          content: res.status === 'fulfilled' ? JSON.stringify(res.value) : `Error: ${res.reason}`
        })
      })
      messages.push(...toolMessages)
      // 把工具调用结果返回给llm，获取最终答复（这里应该还要考虑AI连续工具调用的问题）
      const aiToolResponse = await this.openai.invoke(messages)
      messages.push(new AIMessage(aiToolResponse.content as string || "失败"))
    }

    return messages[messages.length - 1].content as string
  }

  // 聊天循环
  async chatLoop() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    try {
      console.log("\nMCP 客户端已启动！");
      console.log("输入你的查询或输入 'quit' 退出。");

      while (true) {
        const message = await rl.question("\n查询: ");
        if (message.toLowerCase() === "quit") {
          break;
        }
        const response = await this.processQuery(message);
        console.log("\n" + response);
      }
    } catch(e) {
      console.error("发生错误: ", e)
      await this.cleanup();
      process.exit(1);
    } finally {
      rl.close();
    }
  }

  async cleanup() {
    await this.mcp.close();
  }
}

async function main() {
  if (process.argv.length < 3) {
    console.log("使用方法: node index.ts <path_to_server_script>");
    return;
  }
  const mcpClient = new MCPClient();
  try {
    await mcpClient.connectToServer(process.argv[2]);
    await mcpClient.chatLoop();
  } finally {
    await mcpClient.cleanup();
    process.exit(0);
  }
}

main();
```

