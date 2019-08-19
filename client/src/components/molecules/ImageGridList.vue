<template>
  <div class="m-image-grid__list">
    <ImageGridItem
      v-for="(image, index) of images"
      :key="index"
      :imageIndex="image"
    />
  </div>
</template>

<style lang="scss">
.m-image-grid__list {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: rem(10px);

  @include at($screen-md) {
    grid-template-columns: 1fr 1fr;
    grid-gap: rem(2px);
  }

  @include at($screen-xl) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>


<script>
import ImageGridItem from '@/components/atoms/ImageGridItem.vue';

export default {
  name: 'm-image-grid-list',
  components: {
    ImageGridItem,
  },
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
};
</script>
