# view transition

## 简介

:::demo

```vue
<template>
  <div class="container" @click="change">
    <div>{{ name[index] }}</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const name = "kingmusi";
  const index = ref(0);

  function change() {
    // 关键代码
    document.startViewTransition(() => {
      index.value = index.value === name.length - 1 ? 0 : index.value + 1;
    });
  }
</script>

<style scoped>
  .container {
    width: 50px;
    line-height: 50px;
    background: deeppink;
    text-align: center;
    color: #fff;
    cursor: pointer;
    div {
      /* 定义 view transition 名称 */
      view-transition-name: stage;
    }
  }
</style>

<style>
  @keyframes fade-in-1 {
    0% {
      scale: 0;
      opacity: 0;
    }
    100% {
      scale: 1;
      opacity: 1;
    }
  }

  @keyframes fade-out-1 {
    0% {
      scale: 1;
      opacity: 1;
    }
    100% {
      scale: 0;
      opacity: 0;
    }
  }

  /* 元素消失动画定义 */
  ::view-transition-old(stage) {
    animation: fade-out-1 0.5s ease-in-out both;
  }
	/* 元素显示动画定义 */
  ::view-transition-new(stage) {
    animation: fade-in-1 0.5s ease-in-out both;
  }
</style>

```

:::

`view transition` 视图变化的原理：

-   调用 `document.startViewTransition()` ，浏览器会捕获 **DOM 当前状态的快照**
-   执行 `document.startViewTransition()` 提供的回调函数，一旦调用完成，浏览器会捕获 **DOM 更新后状态的快照**
-   触发两者（新旧快照）的过渡动画，包括透明度、位移等变化，也可以自定义 CSS 动画。但浏览器默认的过渡效果是一种交叉淡入的效果

一旦浏览器捕获了 DOM 的“之前”和“之后”的快照，会在 html 页面之上创建一个叠加层，是一个如下的伪元素树：

```
::view-transition
└─ ::view-transition-group(name)
   └─ ::view-transition-image-pair(name)
      ├─ ::view-transition-old(name)  <-- 旧快照
      └─ ::view-transition-new(name)  <-- 新快照
```

| **伪元素**                     | **核心职责**        | **默认包含的动画属性**                       | 作用                                                         |
| ------------------------------ | ------------------- | -------------------------------------------- | ------------------------------------------------------------ |
| `::view-transition`            | 舞台背景            | 无                                           | 写全局属性<br />通过其补货点击事件                           |
| `::view-transition-group`      | **几何形变管理层**  | `width`, `height`, `transform` (位置)        | 调用位移的速度（`animation-duration`）和曲线（`animation-timing-function`） |
| `::view-transition-image-pair` | **图像混合层**      | 无 (主要处理 `isolation`)                    | 一般不用修改                                                 |
| `::view-transition-old`        | **视觉内容** (旧图) | `opacity` (1 -> 0), `transform` (如果有必要) | 消失的动画                                                   |
| `::view-transition-new`        | **视觉内容** (新图) | `opacity` (0 -> 1), `transform` (如果有必要) | 显示的动画                                                   |

## 使用步骤

为目标元素添加 `view-transition-name` 属性

```css
.target {
  view-transition-name: stage;
}
```

自定义 CSS 动画，以描述元素在过渡期间应该如何变化

```css
@keyframes fade-in-1 {
  0% {
    scale: 0;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
}

@keyframes fade-out-1 {
  0% {
    scale: 1;
    opacity: 1;
  }
  100% {
    scale: 0;
    opacity: 0;
  }
}
```

用于 `::view-transition-old()` （使用离开 `exit` 对应的动画）和 `::view-transition-new()` （使用进入 `entrances` 对应的动画）：

```css
/* 元素消失动画定义 */
::view-transition-old(stage) {
  animation: fade-out-1 0.5s ease-in-out both;
}
/* 元素显示动画定义 */
::view-transition-new(stage) {
  animation: fade-in-1 0.5s ease-in-out both;
}
```

在 JavaScript 中使用 `document.startViewTransition()` 方法来启动视图过渡效果，传递一个回调函数，该函数用于在过渡期间更新元素的状态：

```js
function viewTransition(fn, params) {
  if (document.startViewTransition) {
    document.startViewTransition(() => fn(params));
  } else {
    fn(params);
  }
}

viewTransition(() => {
  // ...
}});
```

## 使用

#### 1、todo list

:::demo

```vue
<template>
  <main class="wrapper">
    <section>
      <h2>未完成</h2>
      <ul>
        <li
          v-for="task in todoTasks"
          :key="task.id"
          :style="{ '--view-transition-name': 'todo-item-' + task.id }"
        >
          <input
            type="checkbox"
            :id="'todo-item-' + task.id"
            :checked="task.completed"
            @change="toggleTask(task)"
          >
          <label :for="'todo-item-' + task.id">{{ task.text }}</label>
        </li>
      </ul>
    </section>

    <section>
      <h2>已完成</h2>
      <ul>
        <li
          v-for="task in completedTasks"
          :key="task.id"
          :style="{ '--view-transition-name': 'todo-item-' + task.id }"
        >
          <input
            type="checkbox"
            :id="'todo-item-' + task.id"
            :checked="task.completed"
            @change="toggleTask(task)"
          >
          <label :for="'todo-item-' + task.id">{{ task.text }}</label>
        </li>
      </ul>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const tasks = ref([
  { id: 1, text: 'Wrap presents', completed: false },
  { id: 2, text: 'Decorate tree', completed: false },
  { id: 3, text: 'Cookies + milk', completed: false },
  { id: 4, text: 'Buy gifts', completed: true },
  { id: 5, text: 'Set up lights', completed: true },
]);
// 待办任务
const todoTasks = computed(() => tasks.value.filter(t => !t.completed));
// 已完成任务
const completedTasks = computed(() => tasks.value.filter(t => t.completed));

// 切换任务状态并触发 View Transition
function toggleTask(task: { id: number, text: string, completed: boolean }) {
  const updateDOM = () => {
    task.completed = !task.completed;
  };

  if (document.startViewTransition) {
    document.startViewTransition(updateDOM);
  } else {
    updateDOM();
  }
}
</script>

<style lang="less">
.generate-vt-group-style(@i) when (@i > 0) {
  /** 两个不同容器之间的动画是位移，所以动画曲线和时间在view-transition-group中设置 */
  ::view-transition-group(todo-item-@{i}) {
    /* 调整元素位移/尺寸变化的时长 */
    animation-duration: 0.5s;
    /* 使用更具活力的缓动函数，使其看起来有“弹簧”效果 */
    animation-timing-function: cubic-bezier(0.31, 0.39, 0.43, 1.25);
  }
  
  .generate-vt-group-style(@i - 1);
}

.generate-vt-group-style(5);
</style>

<style scoped lang="less">
.wrapper {
  display: flex;
  gap: 3rem;
  max-width: 600px;
  pointer-events: auto;
  
  section {
    flex: 1;
    border: 1px solid #ccc;
    
    ul {
      list-style: none;
      li {
        view-transition-name: var(--view-transition-name);
        display: flex;
        align-items: center;
        padding: 8px 0;
        
        /* 模拟已完成任务的划线效果 */
        &:has(input:checked) {
          color: #888;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
```

:::
