<template>
  <main class="home">
    <Banner />
    <div class="main">
      <ul class="left">
        <ListItem
          v-for="item of list"
          :key="item.path"
          :category="item.category"
          :subcatalog="item.subcatalog"
          :title="item.title"
          :content="item.content"
          :path="item.path"
          :time="item.time"
        />

        <Button @click="router.push('/note/')">查看更多</Button>
      </ul>
      <div class="right">
        <Author class="author" />
        <Category class="category" />
      </div>
    </div>
    <HomeFooter />
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import HomeFooter from '@theme/VPHomeFooter.vue'
import ListItem from './ListItem.vue'
import Author from './Author.vue'
import Category from './Category.vue'
import Banner from './Banner.vue'

import Button from '@/components/common/Button.vue'

const router = useRouter()

const list = __LIST__
</script>

<style scoped lang="scss">
main.home {
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  min-height: calc(100vh - var(--navbar-height));
  padding-left: 0;
  padding-right: 0;

  .main {
    flex: 1;
    display: flex;
    width: 90%;
    margin: 1rem auto;

    .left {
      flex: 1;
      margin: 0;
      padding: 0;
      margin-right: 1rem;
      list-style-type: none;
      text-align: center;
    }

    .right {
      display: flex;
      flex-direction: column;
      width: 25%;
    }

    @media (max-width: 719px) {
      flex-direction: column-reverse;

      .left {
        margin-right: 0;
      }
      .right {
        width: 100%;
        margin-bottom: 1rem;
      }
      .category {
        display: none;
      }
    }
  }

  ::v-deep(.footer) {
    padding: 1.5rem;
  }
}
</style>

<style>
html.dark .footer {
  color: #fff;
}
</style>
