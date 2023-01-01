# stash

## 保存

```shell
# 保存全部
git stash [save '备注']

# 保存部分
git stash push -m "xxx" **/*.js
```

## 弹出

```shell
# 弹出最近的保存记录
git stash pop

# 缓存堆栈中的stash多次应用到工作目录中
git stash apply stash@{1}
```

## 删除

```shell
# 有选择的删除stash
git stash drop stash@{1}

# 删除最近的stash
git stash drop

# 删除全部stash
git stash clear
```

## 查看列表

```shell
git stash list
```



