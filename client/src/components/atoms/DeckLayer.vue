<template>
  <canvas class="a-map__layer" ref="deck"></canvas>
</template>

<script>
import { Deck } from "@deck.gl/core";
import { mapMutations, mapState } from "vuex";

export default {
  name: "a-deckgl",
  props: {
    initialViewState: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      geodataCurrentDate: null,
      geodataNextDate: null,
      currentFrame: 0
    };
  },
  mounted() {
    this.initDeck();
  },
  computed: {
    ...mapState("timeline", ["map"])
  },
  methods: {
    ...mapMutations("timeline", ["setDeck"]),
    initDeck() {
      const deck = new Deck({
        canvas: this.$refs.deck,
        width: "100%",
        height: "100%",
        initialViewState: this.initialViewState,
        controller: true,
        onViewStateChange: ({ viewState }) => {
          this.map.jumpTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            bearing: viewState.bearing,
            pitch: viewState.pitch
          });
        },
      });
      this.setDeck(deck);
    }
  }
};
</script>
