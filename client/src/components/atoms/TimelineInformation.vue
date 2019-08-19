<template>
  <div class="a-timeline__information">
    <p class="a-timeline__information-item">{{ activeDate | formatDate }}</p>
    <div 
      v-if="showCasualties"
      class="a-timeline__information-casualties"
    >
      <p class="a-timeline__information-item">
        <CasualtiesIcon
          class="a-timeline__information-item-icon"
          :class="'a-icon__casualties--ge'"
        />3985
      </p>
      <p class="a-timeline__information-item">
        <CasualtiesIcon
          class="a-timeline__information-item-icon"
          :class="'a-icon__casualties--us'"
        />3985
      </p>
      <p class="a-timeline__information-item">
        <CasualtiesIcon
          class="a-timeline__information-item-icon"
          :class="'a-icon__casualties--uk'"
        />3985
      </p>
      <p class="a-timeline__information-item">
        <CasualtiesIcon
          class="a-timeline__information-item-icon"
          :class="'a-icon__casualties--ca'"
        />3985
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.a-timeline__information {
  pointer-events: none;
  position: fixed;
  top: 11vh;
  left: 0;
  padding: rem($space-sm);
  z-index: layer("header");

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
.a-timeline__information-item-icon {
  // max-height: rem($font-size-small);
  max-width: rem(10px);
  margin-right: 10px;
}
.a-timeline__information-casualties {
  padding-top: rem($space-xs);
}
</style>

<script>
import CasualtiesIcon from "@/components/atoms/CasualtiesIcon.vue";
import { mapState } from "vuex";

export default {
  name: "a-timeline-information",
  components: {
    CasualtiesIcon
  },
  computed: {
    ...mapState('timeline', ['activeDateId', 'timelineDates', 'showCasualties'])
  },
  data() {
    return {
      activeDate: null
    };
  },
  watch: {
    activeDateId() {
      const item = this.timelineDates.find(
        item => item.id === this.activeDateId
      );
      this.activeDate = item.date;
    }
  }
};
</script>
