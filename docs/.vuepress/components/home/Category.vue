<template>
  <div class="home-category">
    <span>类型归档</span>
    <ul>
      <li v-for="item of categorys" :key="item.name" @click="router.push(item.path)">
        <img :src="iconMap.get(item.name)" :alt="item.name" />
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import iconMap from '@/utils/category-icon-map'

const router = useRouter()

const categorys = __CATEGORYS__
</script>

<style scoped lang="scss">
.home-category {
  z-index: 1;
  margin-top: 2rem;
  text-align: center;

  & > span {
    font-weight: 600;
    font-size: 1.2rem;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2px;
    margin: 0;
    padding: 0;
    margin-top: 0.5rem;
    list-style-type: none;

    li {
      border: 3px solid var(--vp-c-border);
      border-radius: 4px;
      background-color: transparent;
      text-align: center;
      cursor: pointer;
      img {
        width: 100%;
      }
      span {
        margin-top: 2rem;
      }
    }
  }
}
</style>
