<template>
  <div class="event__image-caption">
    <h4 class="caption__title">{{ title }}</h4>
    <p class="caption__description">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.event__image-caption {
  font-family: 'Open Sans', sans-serif;
  background: $background-color-primary;
  color: $text-color-primary;
  width: 100%;
  margin: 1.15rem;
  padding: 1.5rem;
}
.caption__title {
  margin-bottom: rem(6px);
  font-weight: 400;
}
.caption__description {
  font-weight: 300;
  font-size: rem($font-size-small);
}
</style>

<script>
export default {
  name: 'event-image-caption',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
};
</script>
