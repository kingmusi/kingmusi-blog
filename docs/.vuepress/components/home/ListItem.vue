<template>
  <li class="list-item">
    <!-- 模糊背景图片 -->
    <div class="list-item__bg" :style="{ backgroundImage: img }" />
    <!-- 图片 -->
    <div class="list-item__img" :style="{ backgroundImage: img }" @click="toArticle" />

    <!-- 内容 -->
    <div class="list-item__box">
      <div class="list-item__info">
        <div class="list-item__info__category">{{ props.category }}</div>
        <div class="list-item__info__subcatalog">{{ props.subcatalog }}</div>
        <div class="list-item__info__time">{{ dayjs(props.time).format('YYYY-MM-DD h:m:s') }}</div>
      </div>
      <h3 @click="toArticle">{{ props.title }}</h3>
      <span>{{ props.content }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import iconMap from '@/utils/category-icon-map'

type Params = {
  category: string // 分类
  subcatalog: string // 所属子目录
  title: string // 标题
  content: string // 内容
  path: string // 跳转路径
  time: number // 修改时间
}
const props = withDefaults(defineProps<Params>(), {
  category: '', // 分类
  subcatalog: '', // 所属子目录
  title: '', // 标题
  content: '', // 内容
  path: '/', // 跳转路径
  time: 0 // 修改时间
})

const img = `url(${iconMap.get(props.category)})`

const router = useRouter()
const href = props.path.replace('.md', '.html')
const toArticle = () => {
  router.push(href)
}
</script>

<style scoped lang="scss">
.list-item {
  z-index: 1;
  display: flex;
  position: relative;
  height: 14.5rem;
  padding: 0;
  margin: 0;
  margin-bottom: 2rem;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  box-shadow: 0 0.5rem 1rem rgb(18 38 63 / 5%);
  text-align: left;
  overflow: hidden;

  &__bg {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--c-text);
    background-size: cover;
    background-position: center;
    filter: blur(1.875rem) brightness(0.8);
  }

  &__img {
    z-index: 1;
    width: 35%;
    height: 100%;
    background-color: var(--c-text);
    background-size: cover;
    background-position: center;
    clip-path: polygon(0 0, 94% 0, 100% 100%, 0 100%);
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      transform: scale(1.1);
    }
  }

  &__box {
    z-index: 1;
    flex: 1;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;

    h3 {
      margin: 0;
      color: var(--main-1);
      font-size: 1.5rem;
      font-weight: bold;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;
      cursor: pointer;

      &::before {
        display: none;
      }
    }

    span {
      line-height: 1.8rem;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      word-break: break-all;
      white-space: pre-wrap;
      min-height: 3.625rem;
    }
  }

  &__info {
    display: flex;
    border-bottom: 1px solid var(--c-border-dark);

    div {
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: inline-block;
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.5rem;
        background-size: cover;
      }
    }

    &__category::before {
      background-image: url('@/public/category.svg');
    }
    &__category::after {
      content: ' - ';
      margin: 0 0.5rem;
    }

    &__subcatalog::before {
      background-image: url('@/public/subcatalog.svg');
    }

    &__time::before {
      background-image: url('@/public/time.svg');
    }

    div:last-child {
      margin-left: auto;
    }

    /* @media (max-width: 719px) {
      display: none;
    } */
  }

  @media (max-width: 719px) {
    flex-direction: column;

    &__img {
      height: 3rem;
      width: 100%;
    }

    &__box {
      h3 {
        font-size: 1rem;
        font-weight: 900;
      }

      span {
        font-size: 0.8rem;
        -webkit-line-clamp: 2;
      }
    }

    &__info {
      justify-content: space-between;
      font-size: 0.7rem;

      div::before {
        display: none;
      }
    }
  }
}
</style>
