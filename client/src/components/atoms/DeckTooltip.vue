<template>
  <div 
    class="a-deck__tooltip"
    v-if="visible"
    :style="{top: `${y}px`, left: `${x}px`}"
  >{{ title }}</div>
</template>

<style lang="scss">
.a-deck__tooltip {
  position: fixed;
  background: $background-color-overlay;
  z-index: layer('header');
  font-family: $font-family-regular;
  font-size: rem($font-size-small);
  color: $text-color-primary;
  padding: rem(5px);
  pointer-events: none;
}
</style>


<script>
import { mapState } from 'vuex';

export default {
  name: 'a-deck-tooltip',
  computed: {
    ...mapState('timeline', ['tooltip'])
  },
  data() {
    return {
      visible: false,
      x: 0,
      y: 0,
      title: '',
    }
  },
  watch: {
    tooltip(val) {
      if (!val.object) { return this.visible = false }
      const { x, y, object} = val
      this.x = x
      this.y = y
      this.title = object.properties.unit_name
      this.visible = true
    }
  },
}
</script>
