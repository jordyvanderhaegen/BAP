<template>
  <div class="m-event__intro">
    <h1 class="a-event__intro-title">{{ title }}</h1>
    <h3 class="a-event__intro-date">{{ date }}</h3>
    <p class="a-event__intro-description">{{ description }}</p>
  </div>
</template>

<style lang="scss">
.m-event__intro {
  padding: 5.4rem;
  color: $text-color-primary;
  @include to($screen-md) {
    padding: 2.9rem;
  }
  @include to($screen-sm) {
    padding: 1.45rem;
  }
}
.a-event__intro-title {
  font-family: $font-family-headings;
  font-size: rem($font-size-xl);
  font-weight: 700;
  margin-bottom: 1.15rem;
}
.a-event__intro-date {
  font-family: $font-family-headings;
  font-size: rem($font-size-medium);
  font-weight: 600;
  color: $text-color-secondary;
  margin-bottom: 2.3rem;
}
.a-event__intro-description {
  font-family: $font-family-regular;
  font-size: rem($font-size-medium);
  line-height: 1.7em;
  font-weight: 300;
  margin-bottom: 2.3rem;
}
</style>

<script>
export default {
  name: 'm-event-intro',
  props: {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
