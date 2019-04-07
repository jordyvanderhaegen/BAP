<template>
  <div>
    <div id="container">
      <div id="map"></div>
      <canvas id="deck-canvas"></canvas>
    </div>
    <button @click="startAnimation()" type="button">refresh</button>
  </div>
</template>

<style lang="scss">
@import "~mapbox-gl/dist/mapbox-gl.css";
#container {
  width: 100%;
  height: 90vh;
  position: relative;
  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

<script>
import mapboxgl from 'mapbox-gl';
import { Deck, FlyToInterpolator } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import * as d3 from 'd3';
import { mapState } from 'vuex';
import * as moment from 'moment';
import dateviewpoints from '@/assets/data/map.json';

export default {
  name: 'a-mapbox',
  data() {
    return {
      activeId: 1,
      troops: [],
      deckLayers: [],
      deck: null,
      currentFrame: 0,
      timer: null,
      startDate: moment('07-06-44', 'DD-MM-YY')
    };
  },
  computed: {
    ...mapState('troops', ['troopPositions', 'troopNextPositions'])
  },
  async mounted() {
    await this.$store.dispatch('troops/setTroops', ['06-06-44', '07-06-44'])
    // Set the date to global state
    // Wait till the animation is over or 1
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZHl2YW5kZXJoYWVnZW4iLCJhIjoiY2pydzZkNDd0MDhudTN5bWQwZXg5dDg0ZyJ9.UJtwyGNM3UlFubdMbs3kRg';

    const INITIAL_VIEW_STATE = {
      latitude: 49.257969,
      longitude: -1,
      zoom: 7,
      bearing: 30,
      pitch: 30,
    };

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jordyvanderhaegen/cjs11hf8l099g1fmnv9my8ozu',
      interactive: false,
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      bearing: INITIAL_VIEW_STATE.bearing,
      pitch: INITIAL_VIEW_STATE.pitch,
    });
    
    this.setTroops()
    
    this.deckLayers.push(this.addScatterplotLayer('1', this.troops));

    this.deck = new Deck({
      canvas: 'deck-canvas',
      width: '100%',
      height: '100%',
      initialViewState: INITIAL_VIEW_STATE,
      controller: true,
      onViewStateChange: ({ viewState }) => {
        map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch,
        });
      },
      layers: this.deckLayers,
    });

    this.startAnimation();
  },
  methods: {
    updateToolTip({x, y, object}) {
      if(object) console.log(object.properties.name)
    },
    setTroops() {
      this.troops = this.troopPositions.map((feature) => {
        const { id, front } = feature.properties
        const nextPoint = this.findNextFeatureById(id, front, this.troopNextPositions);
        return {
          ...feature,
          interPolatePos: this.getInterpolation(
            feature.geometry.coordinates,
            nextPoint ? nextPoint.geometry.coordinates : feature.geometry.coordinates,
          ),
        };
      });
    },
    findNextFeatureById(id, isFront, dataset) {
      return dataset.find(feature => feature.properties.id == id && feature.properties.front == isFront);
    },
    getInterpolation(p1, p2) {
      return d3.geoInterpolate(p1, p2);
    },
    interpolateAll() {
      if (this.currentFrame <= 1) {
        this.troops.forEach((feature) => {
          feature.geometry.coordinates = feature.interPolatePos(this.currentFrame);
        });
        this.deck.setProps({
          layers: this.addScatterplotLayer('33', [...this.troops]),
        });
        this.currentFrame += 0.005;
      } else {
        this.timer.stop()
        this.loadTroops()
      }
    },
    addScatterplotLayer(id, data) {
      return new ScatterplotLayer({
        id,
        data,
        radiusScale: 10,
        radiusMinPixels: 5,
        getPosition: d => [d.geometry.coordinates[0], d.geometry.coordinates[1], 0],
        getFillColor: d => this.getTroopsColor(d.properties.country),
        pickable: true,
        onClick: this.updateToolTip,
      });
    },
    getTroopsColor(name) {
      const GER_COLOR = [173, 27, 27];
      const ALLIED_COLOR = [0, 35, 149];
      const UK_COLOR = [32, 142, 201];
      const CA_COLOR = [221, 215, 215];
      switch (name) {
        case 'GE':
          return GER_COLOR;
        case 'CA':
          return CA_COLOR;
        case 'UK':
          return UK_COLOR;
        case 'US':
          return ALLIED_COLOR;
        default:
          return ALLIED_COLOR;
      }
    },
    startAnimation() {
      if (this.timer) {
        this.timer.stop();
      }
      this.currentFrame = 0;
      this.timer = d3.timer(this.interpolateAll);
    },
    async loadTroops() {
      console.log(this.startDate.format('DD-MM-YY'))
      await this.$store.dispatch('troops/setTroops', [this.startDate.format('DD-MM-YY'), this.startDate.add(1, 'day').format('DD-MM-YY')])
      const view = {
          latitude: 49.257969,
          longitude: -1,
          zoom: 10,
          transitionInterpolator: new FlyToInterpolator(),
          transitionDuration: 2000
        }
        
        console.log('setting viewstate')
        this.setTroops()
        this.deckLayers.push(this.addScatterplotLayer('1', this.troops));
        this.startAnimation();
        this.deck.setProps({
          viewState: view
        })
    },
  },
};
</script>
