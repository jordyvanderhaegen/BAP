<template>
  <div
    :style="{backgroundImage: `url(${imageSrc})`}"
    class="m-event__image"
  >
    <EventImageCaption
      :location="image.location"
      :date="image.date"
      :copyright="`${image.origin.source} - ${image.origin.id}`"
    />
  </div>
</template>

<style lang="scss">
.m-event__image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  background-size: cover;
  background-position: center center;
}
</style>

<script>
import EventImageCaption from '@/components/atoms/EventImageCaption.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'a-event-image',
  props: {
    imageIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters('chapters', ['getImageByIndex']),
    image() {
      return this.getImageByIndex(this.imageIndex);
    },
    imageSrc() {
      if (this.image.localSrc) {
        return require('@/assets/img/'+ this.image.localSrc)
      } else {
        return this.image.src
      }
    }
  },
  components: {
    EventImageCaption,
  },
};
</script>
