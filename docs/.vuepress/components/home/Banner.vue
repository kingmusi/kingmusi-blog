<template>
  <div class="swiper-container">
    <Swiper
      class="swiper-wrapper"
      :modules="[Parallax, Autoplay]"
      :speed="600"
      :touch-ratio="1.5"
      :autoplay="{
        autoplay: true,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      }"
      :parallax="true"
      @transition-start="transitionStart"
      @transition-end="transitionEnd"
      @init="(s) => s.emit('transitionEnd')"
    >
      <swiper-slide v-for="(item, index) of Object.values(bannerImages)" :key="index" class="swiper-slide">
        <div class="title" data-swiper-parallax="-130%">
          <h3>{{ bannerText[index] }}</h3>
        </div>
        <div class="img-box">
          <img :src="item.default" style="transform: translateX(0)" />
        </div>
      </swiper-slide>
    </Swiper>

    <!-- <div v-show="swiperRef?.activeIndex !== 0" class="button-prev button" @click="!lock && swiperRef.slidePrev()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 350 160 90">
        <g id="arrow-svg-home">
          <g id="circ" class="cls-1">
            <circle cx="42" cy="42" r="40" class="cls-4"></circle>
          </g>
          <g id="arrow">
            <path id="arrow-trg" d="M.983,6.929,4.447,3.464.983,0,0,.983,2.482,3.464,0,5.946Z"></path>
          </g>
          <path id="line" d="M120,0H0" class="cls-3"></path>
        </g>
      </svg>
    </div> -->
    <!--左箭头-->
    <!-- <div v-show="swiperRef?.activeIndex !== Object.keys(bannerImages).length - 1" class="button-next button" @click="!lock && swiperRef.slideNext()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 350 160 90">
        <g id="arrow-svg-home">
          <g id="circ" class="cls-1">
            <circle cx="42" cy="42" r="40" class="cls-4"></circle>
          </g>
          <g id="arrow">
            <path id="arrow-trg" d="M.983,6.929,4.447,3.464.983,0,0,.983,2.482,3.464,0,5.946Z" class="cls-2"></path>
          </g>
          <path id="line" d="M120,0H0" class="cls-3"></path>
        </g>
      </svg>
    </div> -->
    <!--右箭头-->
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Parallax, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/parallax'
import 'swiper/css/autoplay'

const bannerImages = import.meta.globEager('../../public/banner/*.webp')
const bannerText = ['A', 'N', 'M', 'I']

// const swiperRef = ref()
// const onSwiper = (swiper: any) => {
//   swiperRef.value = swiper
// }

let lock = false
const bgColor = ['rgb(179, 189, 196)', 'rgb(180, 183, 166)', 'rgb(140, 152, 187)']
const transitionStart = (swiper: any) => {
  lock = true //锁住按钮
  const slides = swiper.slides
  const imgBox = slides.eq(swiper.previousIndex).find('.img-box') //图片包装器
  const imgPrev = slides.eq(swiper.previousIndex).find('img') //当前图片
  const imgActive = slides.eq(swiper.activeIndex).find('img') //下一张图片
  const derection = swiper.activeIndex - swiper.previousIndex
  swiper.$el.css('background-color', bgColor[swiper.activeIndex]) //背景颜色动画
  imgBox.transform('matrix(0.6, 0, 0, 0.6, 0, 0)')
  imgPrev.transition(1000).transform('matrix(1, 0, 0, 1, 0, 0)') //图片缩放视
  swiper.slides.eq(swiper.previousIndex).find('h3').transition(1000).css('color', 'rgba(255,255,255,0)')
  imgPrev.transitionEnd(function () {
    imgActive.transition(1300).transform('translate3d(0, 0, 0) matrix(1, 0, 0, 1, 0, 0)') //图片位移视差
    imgPrev.transition(1300).transform('translate3d(' + 60 * derection + '%, 0, 0) matrix(1, 0, 0, 1, 0, 0)')
  })
}

const transitionEnd = (swiper: any) => {
  swiper.slides.eq(swiper.activeIndex).find('.img-box').transform('matrix(1, 0, 0, 1, 0, 0)')
  const imgActive = swiper.slides.eq(swiper.activeIndex).find('img')
  imgActive.transition(1000).transform('matrix(1, 0, 0, 1, 0, 0)')
  swiper.slides.eq(swiper.activeIndex).find('h3').transition(1000).css('color', 'rgba(255,255,255,1)')

  imgActive.transitionEnd(() => (lock = false))
}
</script>

<style scoped lang="scss">
.swiper-container {
  position: relative;
  width: 100%;
  height: calc(70vh - var(--navbar-height));
  background-color: rgb(179, 189, 196);
  transition: 1s background-color 1.3s;
}
.swiper-wrapper {
  transition-delay: 1s;
  transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
  user-select: none;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.title {
  transition-delay: 1s;
  z-index: 10;
}
.title h3 {
  font-weight: 700;
  font-size: calc(55px + 54 * ((53vw + 53vh) - 520px) / 820);
  letter-spacing: -1px;
  color: rgba(255, 255, 255, 0);
  -webkit-text-stroke: 2px #fff;
}
.img-box {
  width: 100%;
  height: 100%;
  position: absolute;
  transform: scale(0.6, 0.6);
  transition-duration: 1s;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
  opacity: 0.9;
  overflow: hidden;
}
.img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translateX(50%);
  transition-timing-function: cubic-bezier(0.5, 0, 0, 1);
  transition-property: transform;
}

.button-prev,
.button-next {
  transition: 0.5s;
  outline: none;
  position: absolute;
  bottom: 10px;
  width: 140px;
  z-index: 10;
  transform: translateY(-34px);
  cursor: pointer;

  @media (max-width: 719px) {
    width: 80px;
  }
}
.button-prev {
  left: 4vw;
}
.button-next {
  right: 4vw;
}
#arrow-svg-home {
  transform: translateY(353px);
}
.button-next #arrow-svg-home {
  transform: translateY(353px) rotateY(180deg);
  transform-origin: 80px 0px 0px;
}
svg {
  transition: 0.5s;
}
.cls-1 {
  transition: 0.5s;
  opacity: 0.4;
  transform-origin: -20px 40px;
  opacity: 1;
}
.cls-4 {
  transition: 0.5s;
  stroke-width: 2px;
  stroke: #fff;
  fill: none;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0.4;
  transform-origin: 0px 0px 0px;
}
#arrow-trg {
  transition: 0.5s;
  fill: #fff;
  transform: rotateY(180deg) translate(-53px, 39px);
}
#line {
  transition: 0.5s;
  stroke: #fff;
  transform: translate(50px, 42px);
}
.button-prev:hover svg {
  transform: translateX(-25px);
}
.button-next:hover svg {
  transform: translateX(25px);
}
.button:hover .cls-1 {
  transform: scale(1.1);
}
.button:hover .cls-4 {
  stroke-dasharray: 2px;
  stroke-dashoffset: 2px;
  opacity: 1;
}
.button:hover #arrow-trg {
  transform: rotateY(180deg) translate(-37px, 39px);
}
.button:hover #line {
  transform: translate(35px, 42px) scaleX(0.33);
}
</style>
