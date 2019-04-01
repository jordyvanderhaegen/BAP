<template>
  <div
    :style="{backgroundImage: `url(${image.src})`}"
    class="m-event__image"
  >
    <EventImageCaption
      :location="image.location"
      :date="image.date"
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

export default {
  name: 'a-event-image',
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  components: {
    EventImageCaption,
  },
};
</script>
