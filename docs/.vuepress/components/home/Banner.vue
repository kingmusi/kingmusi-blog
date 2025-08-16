<template>
  <div class="swiper-container" ref="containerRef">
    <div class="swiper-wrapper">
      <div v-for="(_, index) of Object.values(bannerText)" :key="index" class="swiper-slide">
        <div class="title">
          <h3>{{ bannerText[index] }}</h3>
        </div>
        <div class="img-box">
          <img :src="`/banner/${index + 1}.webp`" loading="lazy" style="transform: translateX(0)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { type SwiperInstance } from 'tiny-swiper'

const bannerText = ['M', 'U', 'S', 'I']
const bgColor = ['rgb(179, 189, 196)', 'rgb(180, 183, 166)', 'rgb(140, 152, 187)', 'rgb(179, 189, 196)']

let swiper: SwiperInstance | null = null
const containerRef = ref<HTMLDivElement | null>(null)
onMounted(async () => {
  const container = containerRef.value
  if (!container) return

  const slides = container.querySelectorAll('.swiper-slide')

  const [SwiperRes, AutoPlayRes, LayLoadRes] = await Promise.allSettled([
    import('tiny-swiper'),
    // @ts-ignore
    import('tiny-swiper/lib/modules/autoPlay.min.js'),
    // @ts-ignore
    import('tiny-swiper/lib/modules/lazyload.min.js')
  ])

  if (SwiperRes.status === 'fulfilled') {
    const Swiper = SwiperRes.value.default 
    const plugins = []
    if (AutoPlayRes.status === 'fulfilled') {
      plugins.push(AutoPlayRes.value.default)
    }
    if (LayLoadRes.status === 'fulfilled') {
      plugins.push(LayLoadRes.value.default)
    }

    swiper = new Swiper(container, {
      loop: true,
      autoplay: {
        delay: 3000
      },
      plugins
    })

    swiper.on('before-slide', (currentIndex: number, state: any, newIndex: number) => {
      const previousIndex = currentIndex <= 0 ? slides.length - 1 : currentIndex - 1
      const imgBox = slides[previousIndex].querySelector('.img-box') as HTMLDivElement
      const imgPrev = slides[previousIndex].querySelector('img') as HTMLImageElement
      container.style.backgroundColor = bgColor[newIndex]
      imgBox.style.transform = 'matrix(0.6, 0, 0, 0.6, 0, 0)'
      imgPrev.style.transition = 'transform 1s cubic-bezier(0.5, 0, 0, 1)'
      imgPrev.style.transform = 'matrix(1, 0, 0, 1, 0, 0)'

      slides[previousIndex].querySelector('h3')!.style.transition = 'color 1s'
      slides[currentIndex].querySelector('h3')!.style.color = 'rgba(255,255,255,0)'
    })

    swiper.on('after-slide', (currentIndex: number, state: any, newIndex: number) => {
      const slide = slides[currentIndex]
      const imgBox = slide.querySelector('.img-box') as HTMLDivElement
      imgBox.style.transform = 'matrix(1, 0, 0, 1, 0, 0)'
      const img = slide.querySelector('img') as HTMLImageElement
      img.style.transition = 'transform 1s cubic-bezier(0.5, 0, 0, 1)'
      img.style.transform = 'matrix(1, 0, 0, 1, 0, 0)'
      const h3 = slide.querySelector('h3') as HTMLHeadingElement
      h3.style.transition = 'color 1s'
      h3.style.color = 'rgba(255,255,255,1)'
    })
  }
})
onBeforeUnmount(() => {
  if (swiper) {
    swiper.destroy()
    swiper = null
  }
})
</script>

<style scoped lang="scss">
.swiper-container {
  position: relative;
  width: 100%;
  height: calc(70vh - var(--navbar-height));
  background-color: rgb(179, 189, 196);
  transition: background-color 1s;
  overflow: hidden;
  .swiper-wrapper {
    width: 100%;
    height: 100%;
    user-select: none;

    .swiper-slide {
      position: relative;
      display: flex;
      flex-shrink: 0;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 18px;
      align-items: center;
      cursor: grab;

      .title {
        transition-delay: 1s;
        z-index: 10;

        h3 {
          font-weight: 700;
          font-size: calc(55px + 54 * ((53vw + 53vh) - 520px) / 820);
          letter-spacing: -1px;
          color: rgba(255, 255, 255, 0);
          -webkit-text-stroke: 2px #fff;
          &::before {
            content: '';
            width: 0;
            height: 0;
          }
        }
      }

      .img-box {
        width: 100%;
        height: 100%;
        position: absolute;
        transform: scale(0.6);
        transition-duration: 1s;
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
        opacity: 0.9;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: translateX(50%);
          transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
          transition-property: transform;
        }
      }
    }
  }
}
</style>
