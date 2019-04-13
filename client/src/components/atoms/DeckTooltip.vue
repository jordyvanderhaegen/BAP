<template>
  <div 
    class="ello"
    v-if="visible"
    :style="{top: `${y}px`, left: `${x}px`}"
  >{{ title }}</div>
</template>

<style lang="scss">
.ello {
  z-index: layer('header');
  position: fixed;
  background: rgba($background-color-primary, .5);
  font-family: $font-family-regular;
  font-size: rem($font-size-small);
  padding: rem(5px);
  pointer-events: none;
}
</style>


<script>
import { mapState } from 'vuex';
export default {
  name: 'a-deck-tooltip',
  computed: {
    ...mapState('timeline', ['tooltipPos'])
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
    tooltipPos(val) {
      if (!val.object) { return this.visible = false }
      const { x, y, object} = val
      this.x = x
      this.y = y
      this.title = object.properties.name
      this.visible = true
    }
  }
  /* props: {
    title: {
      type: String,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    }
  } */
}
</script>
