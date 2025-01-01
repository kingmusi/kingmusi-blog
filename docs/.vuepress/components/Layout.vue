<template>
  <vue-particles
    id="tsparticles"
    :options="particlesOptions"
  />
  <ParentLayout />
</template>

<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import particlesOptions from '@/utils/ts-particles-option.json'
</script>

<style lang="css">
.vp-page div[vp-content] > div {
  z-index: 2;
  position: relative;
  background-color: var(--vp-c-bg);
}
</style>