<template>
  <main class="home">
    <div class="banner"></div>
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

  <Particles id="tsparticles" :particles-init="particlesInit" :options="tsParticlesOptions" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import HomeFooter from '@theme/HomeFooter.vue'
import ListItem from './HomeListItem.vue'
import Author from './HomeAuthor.vue'
import Category from './HomeCategory.vue'

import Button from '@/components/common/Button.vue'

import { loadFull } from 'tsparticles'
import tsParticlesOptions from '@/utils/ts-particles-option.json'

const particlesInit = async (engine: any) => {
  await loadFull(engine)
}

const router = useRouter()

// eslint-disable-next-line no-undef
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

  .banner {
    width: 100%;
    height: calc(50vh - var(--navbar-height));
    font-size: 5rem;
    background-image: url('@/public/banner.webp');
    background-size: cover;
    background-position: center;
  }

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
