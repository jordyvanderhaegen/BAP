<template>
  <div>
    <div id="container">
      <div class="map__overlay"></div>
      <div id="map"></div>
      <canvas id="deck-canvas" class="deck__canvas"></canvas>
    </div>
    <!-- <button @click="logViewState()" type="button">refresh</button>
    <button @click="timer.stop()" type="button">stop</button>
    <button @click="timer.restart()" type="button">restart</button> -->
  </div>
</template>

<style lang="scss">
@import "~mapbox-gl/dist/mapbox-gl.css";
#container {
  width: 100vw;
  height: 100vh;
  position: relative;
  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.map__overlay {
  pointer-events: none;
  box-shadow: inset 0 0 25vw #000000;
  z-index: layer('overlay');
}
/* .deck__canvas {
  box-shadow: inset 0 0 25vw #000000;
} */
</style>

<script>
import mapboxgl from 'mapbox-gl';
import { Deck, FlyToInterpolator, TRANSITION_EVENTS } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import * as d3 from 'd3';
import unitprops from '@/assets/data/map.json';
import { setTimeout } from 'timers';
import { Power4 } from 'gsap';

export default {
  name: 'a-mapbox',
  data() {
    return {
      activeId: 1,
      map: null,
      deck: null,
      posCurrentUnits: null,
      posNextUnits: null,
      currentFrame: 0,
      timer: null,
      lockCamera: true,
      initialViewState: {
        latitude: 49.257969,
        longitude: -1,
        zoom: 7,
        bearing: 30,
        pitch: 30,
      }
    }
  },
  mounted() {
    this.initMapBox()
    this.initDeckGL()
    this.loadUnitsPos()
  },
  methods: {
    logViewState() {
      console.log(this.deck.viewState['default-view'])
      console.log(JSON.stringify(this.deck.viewState['default-view']))
    },
    initMapBox() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZHl2YW5kZXJoYWVnZW4iLCJhIjoiY2pydzZkNDd0MDhudTN5bWQwZXg5dDg0ZyJ9.UJtwyGNM3UlFubdMbs3kRg';
      this.map = new mapboxgl.Map({
        attributionControl: false,
        container: 'map',
        style: 'mapbox://styles/jordyvanderhaegen/cju8q1e4n3qhs1gold0w3lxev',
        interactive: false,
        center: [this.initialViewState.longitude, this.initialViewState.latitude],
        zoom: this.initialViewState.zoom,
        bearing: this.initialViewState.bearing,
        pitch: this.initialViewState.pitch,
      });
    },
    initDeckGL() {
      this.deck = new Deck({
        canvas: 'deck-canvas',
        width: '100%',
        height: '100%',
        initialViewState: this.initialViewState,
        controller: true,
        onViewStateChange: ({ viewState }) => {
          this.map.jumpTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            bearing: viewState.bearing,
            pitch: viewState.pitch,
          });
        },
      });
    },
    async loadUnitsPos() {
      const currentUnitProp = unitprops.find(item => item.id === this.activeId)
      console.log(currentUnitProp)
      const nextUnitProp = unitprops.find(item => item.id === this.activeId + 1)
      const res = await import(`@/assets/data/${currentUnitProp.date}-troops.json`)
      const res2 = await import(`@/assets/data/${nextUnitProp.date}-troops.json`)
      this.posNextUnits = res2.features
      this.posCurrentUnits = res.features.map((feature) => {
        const { id, front } = feature.properties
        const nextPoint = this.findNextUnitLocation(id, front);
        return {
          ...feature,
          interPolatePos: this.getInterpolation(
            feature.geometry.coordinates,
            nextPoint ? nextPoint.geometry.coordinates : feature.geometry.coordinates,
          ),
        };
      })
      this.startAnimation()
      this.activeId++
    },
    onvwChange() {
      console.log('interrupting')
    },
    getInterpolation(currentPos, nextPos) {
      return d3.geoInterpolate(currentPos, nextPos);
    },
    findNextUnitLocation(id, front) {
      return this.posNextUnits.find(feature => feature.properties.id == id && feature.properties.front == front)
    },
    interpolateUnitPos() {
      if (this.currentFrame <= 1) {
        this.posCurrentUnits.forEach((feature) => {
          feature.geometry.coordinates = feature.interPolatePos(this.currentFrame);
        });
        this.deck.setProps({
          layers: this.createScatterPlotterLayer('33'),
          viewState: this.deck.viewState
        });
        this.currentFrame += 0.005;
      } else {
        this.timer.stop()
        this.loadUnitsPos()
      }
    },
    createScatterPlotterLayer(id) {
      return new ScatterplotLayer({
        id,
        data: [...this.posCurrentUnits],
        radiusScale: 10,
        radiusMinPixels: 5,
        getPosition: d => [d.geometry.coordinates[0], d.geometry.coordinates[1]],
        getFillColor: d => this.getUnitColor(d.properties.country),
      });
    },
    startAnimation() {
      if (this.timer) {
        this.timer.stop();
      }
      this.currentFrame = 0;
      this.timer = d3.timer(this.interpolateUnitPos);
      const currentUnitProp = unitprops.find(item => item.id === this.activeId)
      this.deck.setProps({
        viewState: {
          ...currentUnitProp.camera,
          transitionInterpolator: new FlyToInterpolator(),
          transitionDuration: 3000,
          transitionEasing: d3.easeCubic
        }
      })
    },
    getUnitColor(name) {
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
    }
  }
}
</script>
