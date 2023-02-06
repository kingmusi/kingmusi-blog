# 分支&修改最近一次commit

## 分支

```shell
# 查看分支（本地）
git branch

# 查看分支（远端）
git branch -a

# 创建分支
git branch <dev-name>

# 切换分支
git checkout <dev-name>

# 创建+切换分支
git checkout -b <dev-name>

# 删除本地分支
git branch -d <dev-name>

# 删除远程分追
git push origin --delete <BranchName>

# 本地分支推上远程仓库（冒号前是本地分支的名字，冒号后是远端分支的名字）
git push origin <dev-name>:<div-name>

# 重命名分支
git branch -m old_name new_name
```

## 合并 test 分支

- **test** 随便合，不用在意 **commit** 记录

```shell
# 首先切换到 test 分支上
git checkout test
# 拉取最新的
git pull --rebase
# 合并分支
git merge <dev-name>
# 查看合并后的日志是否正确
git log --oneline
```

## 合并 master 分支

- 需要关注 **commit** 记录，尽量不产生 **merge** 信息

```shell
# 首先切换到 master 分支上
git checkout mater
# 拉取最新的
git pull --rebase
# 切回分支上
git checkout <dev-name>
# rebase 令 commit 在 master 前
git rebase master
# 解决冲突
# 切回 master 分支上
git checkout master
# 合并分支
git merge <dev-name>
```

> 如果要上线，还要 **push**，且打上 **tag**
>
> ```shell
> git push
> git tag vxxxx
> git push --tags
> git log --oneline
> ```

## 用远程分支覆盖本地分支

```shell
git fetch --all
git reset --hard origin/<dev-name>
git pull
```

## 修改最近一次的 commit

1. 修改最近一次的提交信息

   ```shell
   git commit --amend
   ```

2. 与上次提交合并

   ```shell
   git commit --amend --no-edit
   ```



