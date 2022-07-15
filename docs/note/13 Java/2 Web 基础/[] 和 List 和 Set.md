# [] 和 List 和 Set

## []

 - 定长
 - 基础类型


```java
String[] strs = new String[]{"张三","李四","王五"};

// 或

String[] strs = new String[3];
strs[0] = "张三";
```

## List

 - 不定长
 - 任意类型

主要有两个实现类：**ArrayList**、**LinkedList**

##### 1、ArrayList

 - 容量不固定，随着容量的增加而动态扩容（阈值基本不会达到）
   2. 有序集合（插入的顺序 == 输出的顺序）
   3. 插入的元素可以为 **null**
   4. 增删改查效率更高（相对于LinkedList来说）
   5. 线程不安全

###### 2、LinkedList

 - 双向列表

##### 3、基本方法

```java
// 初始化
List<类型> list = new ArrayList() 

// 添加
boolean add(E element):向集合中添加一个元素
void add(int index, E element):在指定位置添加元素

// 删除
void clear()：删除集合中的所有元素
E remove(int index)：根据指定索引删除元素，并把删除的元素返回
boolean remove(Object o)：从集合中删除指定的元素

// 修改
E set(int index, E element):把指定索引位置的元素修改为指定的值，返回修改前的值。

// 获取
E get(int index)：获取指定位置的元素

// 判断
boolean isEmpty()：判断集合是否为空。
boolean contains(Object o)：判断集合中是否存在指定的元素。

// 获取长度
int size():获取集合中的元素个数

// 遍历List
for(E 每一项的变量名 : list){}
```

## set

一般用 **HashSet** 实现类

 

  1. 不允许出现重复因素
  2. 允许插入 **Null** 值
  3. 元素无序（即插入的顺序，不一定是得到的顺序）
  4. 线程不安全

##### 如果类型是自定义的类，要重构 equals 和 hashCode

 - **idea** 里快速生成：`右键 -- Generate -- equal() and hashCode()`

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Category category = (Category) o;
    return Objects.equals(id, category.id);
}

@Override
public int hashCode() {
    return Objects.hash(id);
}
```

##### 方法：

```java
// 初始化
Set<类型> set = new HashSet();

// 添加
boolean add(E e);

// 删除
boolean remove(Object o);
void clear();

// 长度
int size();

// 判断
boolean isEmpty();
boolean contains(Object o);

// 遍历List
for(E 每一项的变量名 : set){}
```