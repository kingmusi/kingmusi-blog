<template>
  <div id="particles-js"></div>
  <ParentLayout />
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import PJS from 'particles.js-es'
import getParticlesOptions from '@/utils/particles-option'

let observer = null

onMounted(() => {
  PJS.init('particles-js', getParticlesOptions('#ffffff'))

  const targetNode = document.documentElement; // <html>
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        const newTheme = targetNode.getAttribute("data-theme");
        if (newTheme === "dark") {
          PJS.refresh('particles-js', getParticlesOptions('#ffffff'))
        } else {
          PJS.refresh('particles-js', getParticlesOptions('#000000'))
        }
      }
    }
  });
  // 开始监听属性变化
  observer.observe(targetNode, {
    attributes: true,
    attributeFilter: ["data-theme"], // 只监听 data-theme
  });
})
onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect(); // 停止监听
    observer = null; // 清除引用
  }
  PJS.destroy('particles-js')
})
</script>

<style lang="css">
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.vp-page div[vp-content] > div {
  z-index: 2;
  position: relative;
  background-color: var(--vp-c-bg);
}
</style>