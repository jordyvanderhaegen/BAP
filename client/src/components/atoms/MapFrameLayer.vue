<template>
  <div class="a-map__layer a-map__layer--overlay" />
</template>

<style lang="scss">
.a-map__layer--overlay {
  pointer-events: none;
  box-shadow: inset 0 0 25vw $background-color-primary;
  z-index: layer('overlay');
}

</style>

<script>
export default {
  name: 'a-map-frame',
}
</script>
