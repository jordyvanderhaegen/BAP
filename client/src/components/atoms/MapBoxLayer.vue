<template>
  <div id="map" class="a-map__layer"/>
</template>

<style lang="scss">
@import "~mapbox-gl/dist/mapbox-gl.css";
</style>


<script>
import mapboxgl from 'mapbox-gl';
import { mapMutations } from 'vuex';

export default {
  name: 'a-mapbox',
  props: {
    initialViewState: {
      type: Object,
      required: true,
    }
  },
  mounted() {
    this.initMapBox()
  },
  methods: {
    ...mapMutations('timeline', ['setMap']),
    initMapBox() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZHl2YW5kZXJoYWVnZW4iLCJhIjoiY2pydzZkNDd0MDhudTN5bWQwZXg5dDg0ZyJ9.UJtwyGNM3UlFubdMbs3kRg';
      const map = new mapboxgl.Map({
        attributionControl: false,
        container: 'map',
        style: 'mapbox://styles/jordyvanderhaegen/cju8q1e4n3qhs1gold0w3lxev',
        interactive: false,
        center: [this.initialViewState.longitude, this.initialViewState.latitude],
        zoom: this.initialViewState.zoom,
        bearing: this.initialViewState.bearing,
        pitch: this.initialViewState.pitch,
      });
      this.setMap(map)
    }
  }
}
</script>
