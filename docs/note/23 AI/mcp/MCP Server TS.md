# MCP Server TS

## STDIO —— node 执行 js 脚本启动服务器

1. 创建项目

```shell
mkdir project-name
cd project-name

# 初始化一个 npm 项目
npm init -y

# 安装 dependencies
npm install @modelcontextprotocol/sdk zod
npm install -D @types/node typescript

# 创建src
mkdir src
touch src/index.ts
```

2. 更新 `package.json`

```json
{
  "type": "module",
  "bin": {
    "project-name": "./build/index.js"
  },
  "scripts": {
    "build": "tsc && chmod 755 build/index.js"
  },
  "files": [
    "build"
  ],
}
```

3. 创建一个 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

4. 创建 server instance，并且定义一个工具

```ts
// src/index.ts

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 创建 server instance
const server = new McpServer({
  name: "project-name",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// 创建工具
server.tool(
  "say_hello",
  "和某人说你好",
  {
    name: z.string().describe("人的名字"),
  },
  async ({ name }) => {
    return {
      content: [{ type: "text", text: `Hello, ${name}!` }],
    };
  }
);
```

5. 运行 server

```ts
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
```

6. build

```shell
npm run build
```

7. 在 Inspector 中测试

> 在 cursor 使用
>
> ```json
> {
> 	"mcpServers": {
> 		"project-name": {
> 			"command": "node",
> 			"args": [
> 				"/Users/tal/Desktop/test/mcp-test/server/ts/build/index.js"
> 			]
> 		}
> 	}
> }
> ```
>

## STDIO —— npx 执行 npm库 启动服务器

在上面 **STDIO —— node 执行 js 脚本启动服务器** 例子的基础上

1. 在 `package.json` 中追加上传到 npm 仓库的信息

```json
{
  "name": "project-name",
  "version": "0.0.1",
  "mcp": {
    "servers": {
      "project-name": {
        "command": "node",
        "args": [
          "dist/index.js"
        ]
      }
    }
  }
}
```

2. 在 `src/index.ts` 第一行追加

```ts
#!/usr/bin/env node

// other code
```

> 这行的意思是：用系统路径中的 `node` 可执行文件来执行这个脚本
>
> 这是因为，当通过 `npx project-name` 启动服务器时，等价于执行 `/path/to/node_modules/.bin/project-name`，而这个目录是一个符号链接，最终指向 `package.json` 的 `bin`：
>
> ```json
> {
> 	"bin": {
> 		"project-name": "./build/index.js"
> 	}
> }
> ```
>
> 然后系统就会去执行这个 `./build/index.js` 文件，执行时，发现第一行有 `#!/usr/bin/env node`，则会使用 `node` 执行这个文件。

3. 发布到 npm 仓库

```shell
npm version xxxx
npm publish
```

4. 在 Inspector 中测试

> 在 cursor 使用
>
> ```json
> {
> 	"mcpServers": {
> 		"teacher-map": {
> 			"command": "npx",
> 			"args": [
> 				"-y",
> 				"project-name",
> 				"--MODE=test"
> 			]
> 		}
> 	}
> }
> ```

## SSE —— 通过 SSE 方式实现和 client 的通信

1. 创建项目

```shell
mkdir project-name
cd project-name

# 初始化一个 npm 项目
npm init -y

# 安装 dependencies
npm install @modelcontextprotocol/sdk zod express
npm install -D @types/node @types/express typescript

# 创建src
mkdir src
touch src/index.ts
touch src/server.ts
```

2. 更新 `package.json`

```json
{
  "type": "module",
  "scripts": {
    "build": "tsc && node build/index.js"
  }
}
```

3. 创建一个 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "rootDir": "src",
    "outDir": "build",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src/**/*"]
}
```

4. 在 `src/server.ts` 中返回 server 服务器的创建和工具的定义

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import fs from "fs";

function getServer() {
  const server = new McpServer(
    {
        name: 'project-name',
        version: '1.0.0',
    },
    { capabilities: { tools: {} } }
  );

  server.tool(
    'say_hello',
    'Say hello to someone',
    z.object({ name: z.string() }).shape,
    async ({ name }) => {
      return { content: [{ type: 'text', text: `Hello, ${name}!` }] };
    }
  );

  return server;
}

export default getServer;
```

5. 在 `src/index.ts` 创建一个服务器

```ts
import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import getServer from "./server.js";

const transports: Record<string, SSEServerTransport> = {};

const app = express();

app.use(express.json());

app.get("/sse", async (req, res) => {
  try {
    const transport = new SSEServerTransport('/messages', res);

    const sessionId = transport.sessionId;
    transports[sessionId] = transport;

    transport.onclose = () => {
      console.log(`SSE transport closed for session ${sessionId}`);
      delete transports[sessionId];
    };

    const server = getServer();
    await server.connect(transport);
  } catch (error) {
    console.error('Error establishing SSE stream:', error);
    if (!res.headersSent) {
      res.status(500).send('Error establishing SSE stream');
    }
  }
});

app.post("/messages", async (req, res) => {
  const sessionId = req.query.sessionId as string | undefined;

  if (!sessionId) {
    console.error('No session ID provided in request URL');
    res.status(400).send('Missing sessionId parameter');
    return;
  }

  const transport = transports[sessionId];
  if (!transport) {
    console.error(`No active transport found for session ID: ${sessionId}`);
    res.status(404).send('Session not found');
    return;
  }

  try {
    await transport.handlePostMessage(req, res, req.body);
  } catch (error) {
    console.error('Error handling request:', error);
    if (!res.headersSent) {
      res.status(500).send('Error handling request');
    }
  }
});

const HOST = '0.0.0.0';

const PORT = 3000;
app.listen(PORT, HOST, () => {
  console.log(`🚀 MCP Server running at http://localhost:${PORT}`);
  console.log(`🌐 Network access: http://0.0.0.0:${PORT}`);
});

process.on('SIGINT', async () => {
  for (const sessionId in transports) {
    try {
      await transports[sessionId].close();
      delete transports[sessionId];
    } catch (error) {
      console.error(`Error closing transport for session ${sessionId}:`, error);
    }
  }
  process.exit(0);
});
```

6. 启动

```shell
npm run dev
```

7. 在 Inspector 中测试

> 在 cursor 中使用
>
> ```json
> {
> 	"mcpServers": {
> 		"project-name": {
> 			"type": "sse",
> 			"url": "http://localhost:3000/sse"
> 		}
> 	}
> }
> ```

## Streamable HTTP —— 通过 Streamable HTTP 的方式通信

1. 创建项目

```shell
mkdir project-name
cd project-name

# 初始化一个 npm 项目
npm init -y

# 安装 dependencies
npm install @modelcontextprotocol/sdk zod express
npm install -D @types/node @types/express typescript

# 创建src
mkdir src
touch src/index.ts
touch src/server.ts
```

2. 更新 `package.json`

```json
{
  "type": "module",
  "scripts": {
    "build": "tsc && node build/index.ts"
  }
}
```

3. 创建一个 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "rootDir": "src",
    "outDir": "build",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src/**/*"]
}
```

4. 在 `src/server.ts` 中返回 server 服务器的创建和工具的定义

```ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

function getServer() {
  const server = new McpServer(
    {
        name: 'project-name',
        version: '1.0.0',
    },
    { capabilities: { tools: {} } }
  );


  server.tool(
    'say_hello',
    'Say hello to someone',
    z.object({ name: z.string() }).shape,
    async ({ name }) => {
      return { content: [{ type: 'text', text: `Hello, ${name}!` }] };
    }
  );

  return server;
}

export default getServer;
```

5. 在 `src/index.ts` 创建一个服务器

```ts
import express from "express";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { randomUUID } from "crypto";
import getServer from "./servre.js";

const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

// 创建 Express 应用
const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  try {
    let transport: StreamableHTTPServerTransport;
    if (sessionId && transports[sessionId]) {
      transport = transports[sessionId];
    } else if (!sessionId && isInitializeRequest(req.body)) {
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: sessionId => {
          transports[sessionId] = transport;
        }
      });

      transport.onclose = () => {
        const sid = transport.sessionId;
        if (sid && transports[sid]) {
          delete transports[sid];
        }
      };

      const server = getServer();
      await server.connect(transport);

      await transport.handleRequest(req, res, req.body);
      return;
    } else {
      res.status(400).json({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Bad Request: No valid session ID provided'
        },
        id: null
      });
      return;
    }

    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error'
        },
        id: null
      });
    }
  }
});

app.get("/mcp", async (req, res) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }
  const transport = transports[sessionId];
  await transport.handleRequest(req, res);
});

app.delete("/mcp", async (req, res) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send('Invalid or missing session ID');
    return;
  }

  try {
    const transport = transports[sessionId];
    await transport.handleRequest(req, res);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).send('Error processing session termination');
    }
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MCP Streamable HTTP Server running at http://localhost:${PORT}/mcp`);
});

process.on('SIGINT', async () => {
  console.log('Shutting down server...');

  for (const sessionId in transports) {
    try {
      await transports[sessionId].close();
      delete transports[sessionId];
    } catch (error) {
      console.error(`Error closing transport for session ${sessionId}:`, error);
    }
  }
  process.exit(0);
});
```

6. 启动

```shell
npm run dev
```

7. 在 Inspector 中测试

> 在 cursor 中使用
>
> ```json
> {
> 	"mcpServers": {
> 		"project-name": {
> 			"type": "streamable-http",
> 			"url": "http://localhost:3000/mcp"
> 		}
> 	}
> }
> ```

## 定义工具的方式

#### 一、`server.tool()` （貌似官方想把这种废弃）

```ts
server.tool(
  'say_hello',
  'Say hello to someone',
  z.object({ name: z.string() }).shape,
  async ({ name }) => {
    return { content: [{ type: 'text', text: `Hello, ${name}!` }] };
  }
);
```

#### 二、`server.registerTool()`

和 `server.tool` 类似，有参有一点区别，评价为对前期的轮子不满意，想换一个新的别名轮子

```ts
server.registerTool(
  'say_hello',
  {
    description: 'Say hello to someone',
    inputSchema: z.object({ name: z.string() }).shape,
  },
  async ({ name }) => {
    return { content: [{ type: 'text', text: `Hello, ${name}!` }] };
  }
)
```

#### 三、`ListToolsRequestSchema & CallToolRequestSchema`

client 在请求工具列表时，会先触发 `ListToolsRequestSchema` 请求，这个请求需要返回一个工具列表

```ts
import { ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod'

server.server.setRequestHandler(ListToolsRequestSchema, async (request) => {
  return {
    tools: [
      {
        name: 'say_hello',
        description: 'say hello',
        inputSchema: z.object({
          name: z.string().describe('name'),
        })
      }
    ]
  };
});
```

在client执行某个工具时，会触发 `CallToolRequestSchema` 请求，这个请求会给出调用工具的名称、入参，并且需要返回执行结果给 client

```ts
import { CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';

server.server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'say_hello') {
    return {
      content: [{ type: "text", text: `Hello, ${args.name}!` }],
    };
  }
  
  return {
    content: [{ type: 'text', text: '没有此工具' }],
    isError: true
  }
});
```

## Resources —— 资源

Resources 代表 MCP server 想要提供给 clients 的任何类型的数据。这可以包括：

- 文件内容
- 数据库记录
- API 响应
- 实时系统数据
- 屏幕截图和图像
- 日志文件
- 等等

每个 resource 都由一个唯一的 URI 标识，并且可以包含文本或二进制数据。

```ts
server.resource(
  'get_city_code',
  'file:///citycode_areacode.json',
  {
    description: "可以获取最新的城市区域的中文名，所属于的城市编码和区域编码",
    mimeType: "application/json",
  },
  async () => {
    const citycodeMap = fs.readFileSync('/server/assets/citycode_areacode.json', 'utf-8')
    return {
      contents: [
        {
          uri: 'file:///citycode_areacode.json',
          mimeType: 'application/json',
          text: citycodeMap
        }
      ]
    }
  }
);
```

## Prompt —— 提示词

```ts
server.prompt(
  "weather-summary",
  "生成天气查询提示词",
  {
    city: z.string().describe('城市名称'),
  },
  async ({ city }) => {
    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `请查询${city}的天气，并简要总结。`
          }
        }
      ]
    }
  }
)
```

