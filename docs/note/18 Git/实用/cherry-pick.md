# cherry-pick

## 基础用法

将指定的提交（commit）应用于当前分支，会在当前分支产生一个新的提交，当然它们的哈希值会不一样

```shell
git cherry-pick <commitHash>
```

如有以下情况

```
a - b - c - d   Master
     \
       e - f - g Feature
```

将**提交 f** 应用到 master 分支上

```shell
git checkout master
git cherry-pick f
```

操作完后，会变成以下情况

```
a - b - c - d - f   Master
     \
       e - f - g Feature
```

## 转移多个提交

一次转移多个提交

```shell
git cherry-pick <HashA> <HashB>
```

想要转移一系列的连续提交，A 提交的时间比 B 要早

```shell
# 不包括 A
git cherry-pick A..B 

# 包括 A
git cherry-pick A^..B 
```

## 代码冲突

解决冲突

```shell
git add .
```

```shell
git cherry-pick --continue
```

> 放弃合并
>
> ```shell
> git cherry-pick --abort
> ```

## 配置项

1. `-e`，`--edit`

   打开外部编辑器，编辑提交信息

2. `-n`，`--no-commit`

   只更新工作区和暂存区，不产生新的提交

   