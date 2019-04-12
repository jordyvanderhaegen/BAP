<template>
  <div class="m-unit__intro">
    <h1 class="a-unit__intro-title">{{ data.title }}</h1>
    <h3 class="a-unit__intro-date">{{ countryFull }}</h3>
    <p class="a-unit__intro-description"
      v-for="(section, index) of data.wikiSections"
      :key="index"
      v-html="section.text"
    >{{ section.text }}</p>
    <a class="a-unit__intro-source" :href="data.fullUrl" target="_blank">Read more on Wikipedia</a>
  </div>
</template>

<style lang="scss">
.m-unit__intro {
  // padding: 5.4rem;
  color: $text-color-primary;
  /* @include to($screen-md) {
    padding: 2.9rem;
  }
  @include to($screen-sm) {
    padding: 1.45rem;
  } */
}
.a-unit__intro-title {
  font-family: $font-family-headings;
  font-size: rem($font-size-xl);
  font-weight: 700;
  margin-bottom: 1.15rem;
  margin-top: 1.15rem;
}
.a-unit__intro-date {
  font-family: $font-family-headings;
  font-size: rem($font-size-medium);
  font-weight: 600;
  color: $text-color-secondary;
  margin-bottom: 2.3rem;
}
.a-unit__intro-description {
  font-family: $font-family-regular;
  font-size: rem($font-size-medium);
  line-height: 1.7em;
  font-weight: 300;
  margin-bottom: 2.3rem;
}
.a-unit__intro-source {
  font-family: $font-family-regular;
  font-size: rem($font-size-small);
  font-style: italic;
  color: $text-color-primary;
}
// Wikipedia
.a-unit__intro-description {
  .box-Refimprove_section, figure, figure-inline {
  display: none;
  }
  a {
    color: white;
  }
  figure-inline {
    margin-bottom: 1.9rem;
  }
}

</style>

<script>
export default {
  name: 'm-unit-intro',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    countryFull() {
      switch(this.data.country) {
        case 'GE':
          return 'Nazi Germany';
        case 'UK':
          return 'United Kingdom';
        case 'US':
          return 'United States';
        case 'CA':
          return 'Canada';
        default:
          return this.data.country;
      }
    }
  }
};
</script>
