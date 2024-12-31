<template>
  <div class="home-author">
    <img src="/avatar.webp" alt="avatar" />
    <span>木厶 | kingmusi</span>
    <img src="/email.svg" alt="email" @click="toEmail" />
  </div>
</template>

<script setup lang="ts">
const toEmail = () => window.open('mailto:543657931@qq.com')
</script>

<style scoped lang="scss">
.home-author {
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 15rem;
  padding: 2rem;
  border: 2px solid var(--c-brand-light);
  border-radius: 8px;
  background-color: transparent;
  box-sizing: border-box;
  font-weight: 600;

  img[alt='avatar'] {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }

  img[alt='email'] {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
}
</style>
