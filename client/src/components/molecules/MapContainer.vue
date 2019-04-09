<template>
  <div class="m-map__container">
    <MapFrameLayer />
    <MapBoxLayer :initialViewState="initialViewState" />
    <DeckLayer :initialViewState="initialViewState" />
  </div>
</template>

<style lang="scss">
.m-map__container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>

<script>
import DeckLayer from '@/components/atoms/DeckLayer.vue';
import MapBoxLayer from '@/components/atoms/MapBoxLayer.vue';
import MapFrameLayer from '@/components/atoms/MapFrameLayer.vue';

export default {
  name: 'm-map-container',
  data() {
    return {
      initialViewState: {
        latitude: 49.257969,
        longitude: -1,
        zoom: 7,
        bearing: 30,
        pitch: 30,
      }
    };
  },
  components: {
    DeckLayer,
    MapBoxLayer,
    MapFrameLayer,
  }
}
</script>
