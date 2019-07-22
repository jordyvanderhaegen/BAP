<template>
  <div class="m-content__modal">
    <slot />
  </div>
</template>

<style lang="scss">
.m-content__modal {
  background: $background-color-primary;
  color: white;
  /* position: absolute;
  bottom: 0; */
  padding: $space-md;
  margin: $space-xl;
  z-index: layer('header');
}

.m-progress-bar {
  margin-top: $space-sm;
}
.a-modal__description, .a-modal__synopsis {
  font-family: $font-family-regular;
  font-size: rem($font-size-small);
  line-height: 1.7em;
  font-weight: 300;
}

.a-modal__synopsis {
  font-weight: 600;
  font-size: rem($font-size-base);
  margin-bottom: $space-xs;
}

.a-modal__title {
  font-family: $font-family-headings;
  font-size: rem(30px);
  font-weight: 600;
  margin-bottom: 1.15rem;
}
</style>

<script>
export default {
  name: 'm-content-modal',
}
</script>

