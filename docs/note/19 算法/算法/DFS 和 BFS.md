# DFS 和 BFS

## DFS（深度优先搜素）

- 主要思想：从根节点出发，然后依次向下继续搜索，直到遇到叶子节点，此时就会向上回溯，继续向为访问过的点继续深度搜索

```java
public void dfs(Node root) {
  	if (root == null) return;
  	
  	// 处理这一层逻辑
  	process(root);
  
  	for (Node node : root.children) {
      	// 遍历所有子节点，并进行下一层递归
      	dfs(node)
      }
}
```

树

![](https://gitee.com/kingmusi/imgs/raw/master/blog/20211201163327.png)

## BFS（广度优先搜索）

- 主要思想：从一点出发，查出它的邻接节点放入队列并标记，然后从队列中弹出第一个节点，寻找它的邻接未被访问的节点放入队列，直至所有已被访问的节点的邻接点都被访问过；若图中还有未被访问的点，则另选一个未被访问的点出发，执行相同的操作，直至图中所有节点都被访问

```java
public void bfs(Node root) {
  	List<Node> res = new ArrayList<>();
  	Queue<Node> queue = new LinkedList<>(){{ offer(root) }};
  	
  	while (!queue.isEmpty()) {
      	// 用 len 记录这一层的个数，且只遍历这一层
      	int len = queue.size();
      	for (int i = 0; i < len; i++) {
          	Node node = queue.poll();
          	if (node == null) continue;
          	res.add(node);
          	queue.addAll(node.children);
          }
      }
}
```

> 还有一种写法，另起一个 Queue 记录下一层，在 while 循环最后替换 queue
>
> ```java
> public void bfs(Node root) {
>   	List<Node> res = new ArrayList<>();
>   	Queue<Node> queue = new LinkedList<>(){{ offer(root) }};
>   	
>   	while (!queue.isEmpty()) {
>       	Queue<Node> children = new LinkedList<>();
>       	for (Node node : queue) {
>           	if (node == null) continue;
>           	res.add(node);
>           	children.addAll(node.children);
>           }
>       	queue = children;
>       }
> }
> ```

树

![](https://gitee.com/kingmusi/imgs/raw/master/blog/20211201164625.png)