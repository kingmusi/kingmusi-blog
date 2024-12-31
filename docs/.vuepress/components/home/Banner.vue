<template>
  <div class="swiper-container">
    <Swiper
      class="swiper-wrapper"
      :modules="[Parallax, Autoplay]"
      :speed="600"
      :touch-ratio="1.5"
      :autoplay="{
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      }"
      :parallax="true"
      @transition-start="transitionStart"
      @transition-end="transitionEnd"
      @init="(s: any) => s.emit('transitionEnd')"
    >
      <swiper-slide v-for="(_, index) of Object.values(bannerText)" :key="index" class="swiper-slide">
        <div class="title" data-swiper-parallax="-130%">
          <h3>{{ bannerText[index] }}</h3>
        </div>
        <div class="img-box">
          <img :src="`/banner/${index + 1}.webp`" style="transform: translateX(0)" />
        </div>
      </swiper-slide>
    </Swiper>

  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Parallax, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/parallax'
import 'swiper/css/autoplay'

const bannerText = ['M', 'U', 'S', 'I']

const bgColor = ['rgb(179, 189, 196)', 'rgb(180, 183, 166)', 'rgb(140, 152, 187)']
const transitionStart = (swiper: any) => {
  const slides = swiper.slides
  const imgBox = slides[swiper.previousIndex].querySelector('.img-box') //图片包装器
  const imgPrev = slides[swiper.previousIndex].querySelector('img') //当前图片
  swiper.el.style.backgroundColor = bgColor[swiper.activeIndex] //背景颜色动画
  imgBox.style.transform = 'matrix(0.6, 0, 0, 0.6, 0, 0)' //图片缩放视差
  imgPrev.style.transition = 'transform 1s cubic-bezier(0.5, 0, 0, 1)' //图片位移视差
  imgPrev.style.transform = 'matrix(1, 0, 0, 1, 0, 0)' //图片位移视差

  slides[swiper.previousIndex].querySelector('h3').style.transition = 'color 1s' //标题颜色动画
  slides[swiper.activeIndex].querySelector('h3').style.color = 'rgba(255,255,255,0)' //标题颜色动画
}

const transitionEnd = (swiper: any) => {
  const slide = swiper.slides[swiper.activeIndex]
  const imgBox = slide.querySelector('.img-box')
  imgBox.style.transform = 'matrix(1, 0, 0, 1, 0, 0)'
  const img = slide.querySelector('img')
  img.style.transition = 'transform 1s cubic-bezier(0.5, 0, 0, 1)'
  img.style.transform = 'matrix(1, 0, 0, 1, 0, 0)'
  const h3 = slide.querySelector('h3')
  h3.style.transition = 'color 1s'
  h3.style.color = 'rgba(255,255,255,1)'
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
