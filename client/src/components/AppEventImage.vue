<template>
  <div
    class="event__image"
    :style="`backgroundImage: url(${img})`"
  >
    <EventImageCaption
      title="Normandië"
      description="06 jun, 1994"
    />
  </div>
</template>

<style lang="scss">
.event__image {
  width: 45vw;
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
}
</style>

<script>
import EventImageCaption from '@/components/EventImageCaption.vue';

export default {
  name: 'event-image',
  props: {
    img: {
      type: String,
      required: false,
    },
  },
  components: {
    EventImageCaption,
  },
};
</script>
