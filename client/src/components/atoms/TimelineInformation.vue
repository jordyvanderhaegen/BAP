<template>
  <div class="a-timeline__information">
    <p class="a-timeline__information-item">{{ activeDate | formatDate }}</p>
    <p class="a-timeline__information-item">GE: 3985</p>

  </div>
</template>

<style lang="scss">
.a-timeline__information {
  pointer-events: none;
  position: fixed;
  top: 11vh;
  left: 0;
  padding: rem($space-sm);
  z-index: layer('header');

  @include at($screen-lg) {
    padding: rem($space-md);
  }

}
.a-timeline__information-item {
  font-family: $font-family-regular;
  font-size: rem($font-size-small);
  color: $text-color-primary;
  text-transform: uppercase;
  letter-spacing: rem(5px);
  padding-bottom: rem(10px);
}
</style>

<script>
import { mapState } from 'vuex';

export default {
  name: 'a-timeline-information',
  computed: {
    ...mapState('timeline', ['activeDateId', 'timelineDates']),
  },
  data() {
    return {
      activeDate: null
    };
  },
  watch: {
    activeDateId() {
      const item = this.timelineDates.find(item => item.id === this.activeDateId)
      this.activeDate = item.date
    }
  }
};
</script>
