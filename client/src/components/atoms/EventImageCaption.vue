<template>
  <div class="a-event__image-caption">
    <h4 class="a-event__image-caption-title">{{ location }}</h4>
    <p class="a-event__image-caption-description">{{ date }}</p>
  </div>
</template>

<style lang="scss" scoped>
.a-event__image-caption {
  padding: 1.15rem;
  margin: 1.15rem;
  width: 100%;
  background-color: $background-color-primary;
  font-family: 'Open Sans', sans-serif;
  color: $text-color-primary;
}
.a-event__image-caption-title {
  margin-bottom: rem(5px);
  font-size: rem($font-size-base);
}
.a-event__image-caption-description {
  font-weight: 300;
  font-size: rem($font-size-small);
}
</style>

<script>
export default {
  name: 'a-event-image-caption',
  props: {
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
};
</script>
