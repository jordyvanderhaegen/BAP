<template>
  <div class="a-btn a-btn__action">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.a-btn {
  cursor: pointer;
  pointer-events: all;
}
.a-btn__action {
  border: 1px solid $background-color-secondary;
  box-shadow: 0 0 1px 0px white inset, 0 0 1px 0px white;
  border-radius: 50%;
  @include square(33px);
  transition: .3s background-color cubic-bezier(.694,0,.335,1);
  &:hover {
    background-color: $background-color-secondary;
    svg {
      fill: rgba($background-color-primary, .7);
      stroke: rgba($background-color-primary, .7);
    }
  }
}
</style>
