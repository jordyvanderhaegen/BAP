<template>
  <canvas class="a-map__layer" ref="deck"></canvas>
</template>


<script>
import { Deck, FlyToInterpolator } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { mapMutations } from 'vuex';
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
  mounted() {
    this.initDeck()
  },
  methods: {
    ...mapMutations('timeline', ['setDeck']),
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
  }
}
</script>
