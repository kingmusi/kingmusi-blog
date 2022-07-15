# react-query

## 好处

- 适用于`react hooks`
- 帮助异步获取、同步、更新和缓存数据
- 可以代替全局数据管理

## 安装

##### 1. 安装包

```shell
npm i react-query --save
```

##### 2. 引入

- 在 `index.js` 中

```jsx
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## 配置参数

##### 1. 一些配置参数

- `staleTime` 重新获取数据的时间间隔 默认`0`
- `cacheTime` 数据缓存时间 默认 1000 * 60 * 5 5分钟
- `retry` 失败重试次数 默认 3次
- `refetchOnWindowFocus` 窗口重新获得焦点时重新获取数据 默认 true
- `refetchOnReconnect` 网络重新链接
- `refetchOnMount` 实例重新挂载
- `enabled` 如果为“false”的化，“useQuery”不会触发，需要使用其返回的“refetch”来触发操作

##### 2. 全局配置

```jsx
import { ReactQueryConfigProvider, ReactQueryProviderConfig } from 'react-query'

const queryConfig: ReactQueryProviderConfig = {
  queries: { 
    refetchOnWindowFocus: true
  }
}

ReactDOM.render(
    <ReactQueryConfigProvider config={queryConfig}>
        <App />
    </ReactQueryConfigProvider>
    document.getElementById('root')
);
```

##### 3. 单独配置

```jsx
// 在 useQuery 的第三个参数传入配置
// 如这里不会自动发起请求，而是需要调用 refetch 发起请求
const { isLoading, isError, data, error, refetch, isFetching } = useQuery('todos', fetchTodoList, {
     enabled: false,
})
```

## useQuery

##### 1. 作用

- 用于**查询**数据

##### 2. 返回值作用

- `isLoading`或`status === 'loading'` ：查询没有数据或者当前正在获取
- `isError`或`status === 'error'`：查询遇到错误
- `isSuccess`或`status === 'success'`：查询成功且数据可用
- `isIdle`或`status === 'idle'`：查询当前已禁用

除了这些主要状态之外，还可以根据查询的状态获得更多信息：

- `error`：如果查询处于某种`isError`状态，则错误可通过`error`属性获得。
- `data`：如果查询处于某种`success`状态，则数据可通过`data`属性获得。
- `isFetching`：在任何状态下，如果查询在任何时间正在获取（包括后台重新获取），`isFetching`则`true`.

大多数情况下，获取以下几个返回值就够用了

```js
const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)
```

##### 3. 查询键

- 对于数据的唯一标识，如果查询没有依赖则可传入一个字符串

  ```js
  useQuery('todos', ...)
  ```

- 对于有依赖的查询，可以传入一个数组

  当 page 改变时，会重新查询

  ```js
  const [ page, setPage ] = useState(0)
  useQuery(['todos', page])
  ```

##### 4. 查询函数

- 可以获取查询键

  ```jsx
  const [ page, setPage ] = useState(0)
  useQuery(['todos', page], ({ queryKey }) => {
      const [key, page] = querykey
  })
  ```

- 对于使用 `fetch`

  ```js
  useQuery(['todos', page], async () => {
     const response = await fetch('/todos/' + page)
     if (!response.ok) {
       throw new Error('Network response was not ok')
     }
     return response.json()
  })
  ```

- 对于使用 `axios`

  ```js
  const { data } = useQuery(['todos', page], () => axios.get('/todos/' + page))
  const jsonData = data.data
  // 或者
  useQuery(['todos', page], async () => {
      const { data } = await axios.get('/todos/' + page)
      return data
  })
  ```

## 查询场景

##### 1. 串行查询

```js
// 先获取用户
const { data: user } = useQuery(['user', email], getUserByEmail)

const userId = user?.id

// 然后获取用户的项目
const { isIdle, data: projects } = useQuery(
	['projects', userId],
	getProjectsByUser,
	{
 		// 查询不会执行，直到 userId 存在
 		enabled: !!userId,
	}
)

// isIdle 将为 `true`，直到 `enabled` 为真并且查询开始获取。
// 然后它会进入`isLoading` 阶段，并希望进入`isSuccess` 阶段
```

##### 2. 手动触发查询

```js
// 如这里不会自动发起请求，而是需要调用 refetch 发起请求
const { isLoading, isError, data, error, refetch, isFetching } = useQuery('todos', fetchTodoList, {
     enabled: false,
})
```

##### 3. 分页查询

- 普通的 useQuery 也可以完成分页查询，但提供一个更好查询，不会开启新的查询，即不会跳出`success`和`loading`状态

```js
useQuery(['todos', page], () => axios.get('/todos/' + page), { keepPreviousData : true })
```

##### 4. 无限查询

```jsx
import { useInfiniteQuery } from 'react-query'
 
 function Projects() {
   const fetchProjects = ({ pageParam = 0 }) =>
     fetch('/api/projects?page=' + pageParam)
 
   const {
     data,
     error,
     fetchNextPage,
     hasNextPage,
     isFetching,
     isFetchingNextPage,
     status,
   } = useInfiniteQuery('projects', fetchProjects, {
     getNextPageParam: (lastPage, pages) => lastPage.nextPage,
   })
 
   return status === 'loading' ? (
     <p>Loading...</p>
   ) : status === 'error' ? (
     <p>Error: {error.message}</p>
   ) : (
     <>
       {data.pages.map((group, i) => (
         <React.Fragment key={i}>
           {group.projects.map(project => (
             <p key={project.id}>{project.name}</p>
           ))}
         </React.Fragment>
       ))}
       <div>
         <button
           onClick={() => fetchNextPage()}
           disabled={!hasNextPage || isFetchingNextPage}
         >
           {isFetchingNextPage
             ? 'Loading more...'
             : hasNextPage
             ? 'Load More'
             : 'Nothing more to load'}
         </button>
       </div>
       <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
     </>
   )
 }
```

- 如果后端没有返回 nextPage，可以自定义

```js
function Projects() {
   const pageParam = useRef(0)
   const fetchProjects = ({ pageParam = 0 }) =>
     fetch('/api/projects?page=' + pageParam)
 
   const {
     status,
     data,
     isFetching,
     isFetchingNextPage,
     fetchNextPage,
     hasNextPage,
   } = useInfiniteQuery('projects', fetchProjects, {
     getNextPageParam: (lastPage, pages) => lastPage.nextPage,
   })
 
   const skipToCursor50 = () => {
       pageParam.current = pageParam.current + 1
       fetchNextPage({ pageParam: pageParam.current })
   }
 }
```

## useMutation

##### 1. 普通场景

- 增删改后，清除对应 **key** 的缓存，使 **useQuery** 再次请求，完成数据的更新

```js
import { useMutation, useQueryClient  } from 'react-query'

const queryClient = useQueryClient ()

const [mutate] = useMutation((param) => fetch(), {
    onSuccess: () => {
        queryCache.invalidateQueries('todos')
        queryCache.invalidateQueries('reminders')
    },
})

// 使用
mutate()
```

##### 2. 乐观更新

- 在请求前，就更新 UI
- 如果请求失败，再把 UI 回滚

```js
import { useMutation, useQueryCache } from 'react-query'

const queryCache = useQueryCache()

const [mutate] = useMutation(
	(param: T) => fetch(),
    {
        // 请求前执行
        onMutate(param: T) {
            // param：调用 mutate 传入的参数
            const previousItems = queryClient.getQueryData('key')
            queryClient.setQueryData('key', data: T[] => {
                // data：查询键对应的数据
                // 乐观更新
                return data.map(project => project.id === param.id ? param : project)
            })
            return previousItems
        },
        onError(error: Error, newItem: T, context: any) {
            // context：onMutate 返回的值
            queryClient.setQueryData('key', context)
        },
        onSuccess() {
            queryClient.invalidateQueries()
        }
    }
)
```



