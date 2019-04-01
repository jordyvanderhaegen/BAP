<template>
  <Event />
</template>

<style lang="scss">

</style>

<script>
import AppEventImage from '@/components/AppEventImage.vue';
import Event from '@/components/templates/Event.vue';

export default {
  name: 'event-detail',
  components: {
    AppEventImage,
    Event,
  },
  data() {
    return {
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/NormandySupply_edit.jpg/1200px-NormandySupply_edit.jpg',
    };
  },
};
</script>
