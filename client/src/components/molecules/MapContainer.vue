<template>
  <div class="m-map__container">
    <MapFrameLayer />
    <DeckTooltip />
    <TimelineInformation />
    <MapBoxLayer :initialViewState="initialViewState" />
    <DeckLayer :initialViewState="initialViewState" />
  </div>
</template>

<style lang="scss">
.m-map__container {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}
</style>

<script>
import DeckLayer from '@/components/atoms/DeckLayer.vue';
import DeckTooltip from '@/components/atoms/DeckTooltip.vue';
import MapBoxLayer from '@/components/atoms/MapBoxLayer.vue';
import MapFrameLayer from '@/components/atoms/MapFrameLayer.vue';
import TimelineInformation from '@/components/atoms/TimelineInformation.vue';

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
    DeckTooltip,
    TimelineInformation,
  }
}
</script>
