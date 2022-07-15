<template>
  <aside class="sidebar">
    <NavbarItems />
    <slot name="top" />
    <SidebarItems v-show="!isNarrow" />
    <slot name="bottom" />

    <button v-show="showNarrowButton" class="resize-button" @click="toggleNarrow">
      <img src="../public/arrow.svg" alt="arrow" />
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useWindowSize } from 'vue-window-size'
import NavbarItems from '@theme/NavbarItems.vue'
import SidebarItems from '@theme/SidebarItems.vue'

const isNarrow = ref(false)
const toggleNarrow = () => {
  isNarrow.value = !isNarrow.value
  document.documentElement.style.setProperty('--sidebar-width', isNarrow.value ? '4rem' : '20rem')
  document.documentElement.style.setProperty('--sidebar-scroll-width', isNarrow.value ? '0rem' : '0.5rem')
  document.documentElement.style.setProperty('--sidebar-narrow-button-deg', isNarrow.value ? '180deg' : '0deeg')
}

const { width } = useWindowSize()
const showNarrowButton = ref(width.value < 720 ? false : true)
watch(width, (val) => {
  if (val < 720) {
    isNarrow.value = false
    showNarrowButton.value = false
    document.documentElement.style.setProperty('--sidebar-width', '20rem')
  } else {
    showNarrowButton.value = true
  }
})
</script>

<sytle lang="scss">
:root {
  /* 侧边栏滚动栏宽度 */
  --sidebar-scroll-width: 0.5rem;
  --sidebar-narrow-button-deg: 0deg;
}
</sytle>
<style scoped lang="scss">
$transition-time: 0.1s;

aside.sidebar {
  padding-bottom: 2rem;
  transition: width $transition-time ease-in-out;
}

.resize-button {
  z-index: 20;
  position: fixed;
  left: 0;
  bottom: 0;
  width: calc(var(--sidebar-width) - var(--sidebar-scroll-width));
  height: 2rem;
  background-color: var(--c-brand-light);
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: all $transition-time ease-in-out;

  &:hover {
    background-color: var(--c-brand);
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    transform: rotate(var(--sidebar-narrow-button-deg));
    transition: transform $transition-time ease-in-out;
  }

  @media (max-width: 959px) {
    width: calc(var(--sidebar-width-mobile) - var(--sidebar-scroll-width));
  }
}
</style>
