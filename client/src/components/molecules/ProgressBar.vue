<template>
  <div class="m-progress-bar"></div>
</template>

<style lang="scss">
.m-progress-bar {
  width: 100%;
  height: 3px;
  margin: 20px 0;
}
</style>

<script>
import { Line } from 'progressbar.js'
export default {
  name: 'm-progress-bar',
  props: {
    duration: {
      type: Number,
      required: true,
    }
  },
  mounted() {
    const line = new Line(this.$el, {
      strokeWidth: 3,
      duration: this.duration,
      color: 'white',
      trailColor: 'rgba(255, 255, 255, 0.6)',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'}
    })
    line.animate(1)
  }
}
</script>


