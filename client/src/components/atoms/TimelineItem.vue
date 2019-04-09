<template>
  <div class="a-timeline__item">
    <p>Chapter <br>0{{ index }}</p>
  </div>
</template>

<style lang="scss">
.a-timeline__item {
  border-top: 1px solid rgba($background-color-secondary, 0.3);
  color: $text-color-primary;
  flex-grow: 1;
  font-family: 'Open Sans', sans-serif;
  font-size: rem(12px);
  font-weight: 300;
  text-transform: uppercase;
  padding: rem(12px);
  cursor: pointer;
  transition: .25s border-top cubic-bezier(.694,0,.335,1);
  br {
    margin-bottom: rem(4px);
  }
  &:hover {
    border-top: 1px solid $background-color-secondary;
  }
}
.a-timeline__item--active {
  border-top: 1px solid $background-color-secondary;
}
</style>

<script>
export default {
  name: 'a-timeline-item',
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
}
</script>
