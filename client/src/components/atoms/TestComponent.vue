<template></template>

<script>
// import { TimeLine, Timer } from "@/assets/js/utils";
import { Timeline } from '@/assets/js/timer/timeline';
import { mapState, mapMutations } from "vuex";
import dates from "@/assets/data/map.json";
import timeline from "@/assets/data/timeline.json";

export default {
  data() {
    return {
      camera: {
        latitude: 49.40353884604574,
        longitude: -1.3149950607894074,
        zoom: 9.996327088527236,
        bearing: -127.875,
        pitch: 46.507813202512544,
        altitude: 1.5
      },
      camera2: {
        latitude: 49.50353884604574,
        longitude: -1.3149950607894074,
        zoom: 8.996327088527236,
        bearing: -127.875,
        pitch: 49.507813202512544,
        altitude: 1.8
      }
    };
  },
  mounted() {
    const timeline = new Timeline()
    timeline.setTimelineFromJSON('timeline')
    this.setTimer(timeline)
    this.map.on("load", () => {
      console.log(timeline)
      timeline.play()
    });
  },
  computed: {
    ...mapState("timeline", ["map", "timer"])
  },
  methods: {
    ...mapMutations("timeline", ["setTimer"])
  }
};
</script>
