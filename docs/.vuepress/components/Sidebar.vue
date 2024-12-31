<template>
  <aside class="sidebar vp-sidebar" vp-sidebar>
    <NavbarItems />
    <slot name="top" />
    <SidebarItems v-show="!isNarrow" />
    <slot name="bottom" />

    <button v-show="showNarrowButton" class="resize-button" @click="toggleNarrow">
      <img src="/arrow.svg" alt="arrow" />
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, VNode } from 'vue'
import { useWindowSize } from 'vue-window-size'
import NavbarItems from '@theme/VPNavbarItems.vue'
import SidebarItems from '@theme/VPSidebarItems.vue'

defineSlots<{
  top?: (props: Record<never, never>) => VNode | VNode[] | null
  bottom?: (props: Record<never, never>) => VNode | VNode[] | null
}>()

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

<!-- <sytle lang="scss">
:root {
  /* 侧边栏滚动栏宽度 */
  --sidebar-scroll-width: 0.5rem;
  --sidebar-narrow-button-deg: 0deg;
}
</sytle> -->
<style scoped lang="scss">
$MQNarrow: 959px !default;
$MQMobile: 719px !default;
$MQMobileNarrow: 419px !default;

.vp-sidebar {
  position: fixed;

  // leave space for navbar
  top: var(--navbar-height);
  bottom: 0;
  left: 0;
  z-index: 10;

  overflow-y: auto;

  box-sizing: border-box;
  width: var(--sidebar-width);
  margin: 0;
  border-right: 1px solid var(--vp-c-border);

  background-color: var(--vp-sidebar-c-bg);

  font-size: 16px;

  transition:
    transform var(--vp-t-transform),
    background-color var(--vp-t-color),
    border-color var(--vp-t-color);

  scrollbar-color: var(--c-brand-light) var(--vp-c-gutter);
  scrollbar-width: thin;

  // narrow desktop / iPad
  @media (max-width: $MQNarrow) {
    width: var(--sidebar-width-mobile);
    font-size: 15px;
  }

  // wide mobile
  @media (max-width: $MQMobile) {
    top: 0;

    // leave space for navbar
    padding-top: var(--navbar-height);
    transform: translateX(-100%);
  }

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--vp-c-gutter);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--vp-c-accent-bg);
  }

  // override styles
  .vp-navbar-items {
    display: none;
    padding: 0.5rem 0 0.75rem;
    border-bottom: 1px solid var(--vp-c-gutter);
    transition: border-color var(--vp-t-color);

    @media (max-width: $MQMobile) {
      display: block;

      .vp-navbar-dropdown-item a.route-link-active::after {
        top: calc(1rem - 2px);
      }
    }

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    a {
      font-weight: 600;
    }
  }

  // override styles
  .vp-navbar-item {
    display: block;
    padding: 0.5rem 0 0.5rem 1.5rem;
    font-size: 1.1em;
    line-height: 1.25rem;
  }
}

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
  width: calc(var(--sidebar-width) - 1em);
  height: 2rem;
  background-color: var(--c-brand-light);
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: all $transition-time ease-in-out;

  img {
    width: 1.5rem;
    height: 1.5rem;
    transform: rotate(var(--sidebar-narrow-button-deg));
    transition: transform $transition-time ease-in-out;
    background: transparent;
    user-select: none;
  }

  @media (max-width: 959px) {
    width: calc(var(--sidebar-width-mobile) - 1em);
  }
}
</style>
