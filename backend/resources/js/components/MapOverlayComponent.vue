<template>
  <div class="map__overlay">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.map__overlay {
  position: absolute;
  left: 0%;
  top: 0;
  width: 100%;
  height: 100vh;
  background: url('../../../public/images/noise.jpg') center center repeat fixed;
  color: #fff;
  z-index: 2;
  overflow: auto;
}
</style>
