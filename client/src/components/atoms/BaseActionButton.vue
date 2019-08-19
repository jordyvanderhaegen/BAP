<template>
  <div :class="['a-btn a-btn__action', {'a-btn__action--active': active}]">
    <slot />
  </div>
</template>

<style lang="scss">
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
.a-btn__action--active {
  background-color: $background-color-secondary;
  svg {
    fill: rgba($background-color-primary, .7);
    stroke: rgba($background-color-primary, .7);
  }
}
</style>

<script>
export default {
  name: 'a-btn-action',
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
}
</script>

