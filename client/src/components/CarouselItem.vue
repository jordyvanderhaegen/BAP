<template>
  <div
  :style="`backgroundImage:url(${img})`"
  class="carousel__item"
  />
</template>

<style lang="scss" scoped>
.carousel__item {
  min-width: 66vw;
  background-size: cover;
  height: 60vh;
  opacity: .7;
  margin-right: 20vw;
}
</style>

<script>
export default {
  name: 'carousel-item',
  props: {
    img: {
      type: String,
      required: true,
    },
  },
};
</script>
