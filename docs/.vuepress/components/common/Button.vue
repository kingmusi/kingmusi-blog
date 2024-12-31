<template>
  <div class="blog-common-button">
    <span>
      <slot />
    </span>
  </div>
</template>

<style scoped lang="scss">
@mixin btn-draw($color, $color-hov, $width: 1px, $padding: 0.5em, $time: 0.2s) {
  position: relative;
  display: inline-block;

  color: $width;
  border-bottom: $width solid $color;
  cursor: pointer;
  overflow: hidden;
  transition: color $time ease-in-out, background-color $time ease-in-out;
  user-select: none;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;

    height: 100%;
    width: $width;

    background: $color;
    transform: translateY(100%);
    transition: transform $time ease-in-out;
    transition-delay: $time * 3;
  }

  > span {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: $padding;

    color: inherit;

    &:before,
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;

      background: $color;
      transition: transform $time ease-in-out;
    }

    &:before {
      height: $width;
      width: 100%;
      transform: translateX(100%);
      transition-delay: $time * 2;
    }

    &:after {
      height: 100%;
      width: $width;

      transform: translateY(-100%);
      transition-delay: $time;
    }
  }

  &:hover:after,
  &:hover > span:before,
  &:hover > span:after {
    transform: translate(0, 0);
  }

  &:hover:after {
    transition-delay: 0s;
  }

  &:hover > span:before {
    transition-delay: $time;
  }

  &:hover > span:after {
    transition-delay: $time * 2;
  }

  &:hover {
    color: $color-hov;
    background-color: $color;
    transition-delay: $time * 3;
  }

  &.active {
    color: $color-hov;
    background-color: $color;
  }
}

$color-blue: var(--c-brand-light);
$color-grey: #fff;

.blog-common-button {
  z-index: 1;
  font-size: 1em;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.1em;
  @include btn-draw($color-blue, $color-grey, 2px);
}
</style>
