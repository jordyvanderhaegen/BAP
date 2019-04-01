<template>
  <div class="carousel__list">
    <CarouselItem
      v-for="(item, index) in items"
      :key="index"
      :img="item"
    />
  </div>
</template>

<style lang="scss" scoped>
.carousel__list {
  width: 100vw;
  position: absolute;
  top: 20%;
  overflow: hidden;
  z-index: layer("base");
  display: flex;

}
</style>

<script>
import CarouselItem from '@/components/CarouselItem.vue';

export default {
  name: 'carousel-list',
  components: {
    CarouselItem,
  },
  data() {
    return {
      items: [
        'https://www.historyonthenet.com/wp-content/uploads/2014/11/140828132531-01-world-war-ii-0828-horizontal-large-gallery.jpg',
        'https://www.ww2research.com/wp-content/uploads/2017/05/slide2-image.jpg',
        'https://cdn.cnn.com/cnnnext/dam/assets/150827000152-ww2-china-10-super-169.jpg',
      ],
    };
  },
};
</script>
