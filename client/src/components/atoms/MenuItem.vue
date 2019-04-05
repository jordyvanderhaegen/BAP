<template>
  <div class="a-menu__item">
    <div class="a-menu__item-number">
      <h1>0{{ number }}</h1>
    </div>
    <div class="a-menu__item-title">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<style lang="scss">
.a-menu__item {
  display: flex;
  align-items: flex-end;
  font-family: $font-family-headings;
  color: $text-color-secondary;
  font-size: rem(70px);
  font-weight: 700;
  margin-bottom: 1.45rem;
  transition: color .3s ease;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    color: $text-color-primary;
    .a-menu__item-number {
      transform: translateY(0);
    }
  }
}
.a-menu__item-number {
  transform: translateY(100%);
  transition: transform .3s ease;
  padding-right: 1.3rem;
  font-size: rem(30px);
  line-height: 1.6;
}
</style>

<script>
export default {
  name: 'a-menu-item',
  props: {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
};
</script>
