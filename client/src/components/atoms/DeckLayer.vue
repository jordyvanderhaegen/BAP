<template>
  <canvas class="a-map__layer" ref="deck"></canvas>
</template>

<style lang="scss">
.a-map__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>


<script>
import { Deck, FlyToInterpolator } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { mapMutations, mapState } from 'vuex';
import * as d3 from 'd3';
import * as pstimer from '@/assets/js/timer.js'
import timelineDates from '@/assets/data/map.json';

export default {
  name: 'a-deckgl',
  props: {
    initialViewState: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      geodataCurrentDate: null,
      geodataNextDate: null,
      currentFrame: 0,
    };
  },
  computed: {
    ...mapState('timeline', ['map', 'deck', 'timer', 'activeDateId', 'cameraLocked', 'timelineDates']),
  },
  mounted() {
    this.initDeck()
    // this.loadGeodata()
  },
  methods: {
    ...mapMutations('timeline', ['setDeck', 'setTimer', 'incrementActiveDateId', 'setTooltipPos']),
    ...mapMutations('ui', ['toggleModal']),
    initDeck() {
      const deck = new Deck({
        canvas: this.$refs.deck,
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
      this.setDeck(deck)
    },
    async loadGeodata() {
      const timelineCurrentDate = this.timelineDates.find(item => item.id === this.activeDateId);
      const timelineNextDate = this.timelineDates.find(item => item.id === this.activeDateId + 1);
      const geodataCurrentDate = await import(`@/assets/data/${timelineCurrentDate.date}-troops.json`);
      const geodataNextDate = await import(`@/assets/data/${timelineNextDate.date}-troops.json`);
      this.geodataNextDate = geodataCurrentDate.features
      this.geodataCurrentDate = geodataCurrentDate.features.map((feature) => {
        // Destruct feature object
        const {id, front} = feature.properties;
        // Get next point to determine interpolation
        const featureNextDate = geodataNextDate.features.find(feature => 
          feature.properties.id == id && feature.properties.front == front
        );
        return {
          ...feature,
          interpolatePos: d3.geoInterpolate(feature.geometry.coordinates, 
          featureNextDate ? featureNextDate.geometry.coordinates : feature.geometry.coordinates
          ),
        };
      });

      if (this.cameraLocked) {
        this.deck.setProps({
          viewState: {
            ...timelineCurrentDate.camera,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: 3000,
            transitionEasing: d3.easeCubic
          }
        });
      }
      
      this.startAnimation()
      this.incrementActiveDateId()
    },
    interpolateGeodata() {
      if (this.currentFrame <= 1) {
        this.geodataCurrentDate.forEach(feature => {
          feature.geometry.coordinates = feature.interpolatePos(this.currentFrame);
        });

        this.deck.setProps({
          layers: this.createScatterPlotterLayer(),
          viewState: this.deck.viewState,
        });

        this.currentFrame += 0.005;
        return
      }

      this.timer.stop();
      this.loadGeodata();
    },
    startAnimation() {
      if (this.timer) {
        this.timer.stop();
      }

      this.currentFrame = 0;
      // this.setTimer(d3.timer(this.interpolateGeodata))
      this.setTimer(pstimer.pausableTimer(this.interpolateGeodata))
    },
    createScatterPlotterLayer() {
      return new ScatterplotLayer({
        id: 'scatterplot-layer',
        data: [...this.geodataCurrentDate],
        autoHighlight: true,
        pickable: true,
        radiusScale: 2,
        radiusMinPixels: 2,
        radiusMaxPixels: 6,
        getPosition: d => [d.geometry.coordinates[0], d.geometry.coordinates[1]],
        getFillColor: d => this.getUnitColor(d.properties.country),
        getRadius: 1000,
        onClick: d => { 
          if(d.object) {
            this.$router.push(`/unitp/${d.object.properties.id}`)
          }
        },
        onHover: d => this.setTooltipPos({x: d.x, y: d.y, object: d.object})
      });
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
      };
    },
  }
}
</script>
