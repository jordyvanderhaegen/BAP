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
    this.setTimer(timeline)
    /* timeline.addJSON(22000, 'line')
    timeline.addTimer(2000)
    timeline.addContent(6000)
    timeline.addCamera(6000,1)
    timeline.addCamera(6000,2,500)
    timeline.addContent(6000) */
    timeline.addTroops(4000, dates[0].date, dates[1].date, 3)
    // timeline.addContent(6000)
    timeline.addTroops(9000, dates[1].date, dates[2].date, 4)
    timeline.addTroops(9000, dates[2].date, dates[3].date, 5)
    timeline.addTroops(9000, dates[3].date, dates[4].date, 5)
    timeline.addTroops(9000, dates[4].date, dates[5].date, 5)
    timeline.addTimer(2000)
    
    

    this.map.on("load", () => {
      console.log(timeline)
      timeline.play()
    });

    /* this.setTimer(new TimeLine())
    
    this.timer.addJSON('line')
    timeline.forEach(item => {
      this.timer.addCamera(item.duration, item.camera)
    });
    this.timer.addContent(5000) */
    /* this.timer.addJSON('line')
    this.timer.addCamera(5000, this.camera)
    this.timer.addGeoData(5000, dates[0], dates[1])
    this.timer.addContent(5000)
    this.timer.addContent(5000)
    this.timer.addGeoData(5000, dates[1], dates[2])
    this.timer.addGeoData(5000, dates[2], dates[3])
    this.timer.addGeoData(5000, dates[3], dates[4])
    this.timer.addContent(5000)
    this.timer.addCamera(5000, this.camera2) */

    /* console.log(this.timer) */
    /* tl.addGeoData(5000)
    tl.addGeoData(5000)
    tl.play() */
    /* console.log(tl)
    
    tl.addGeodata(1000)
    tl.addCamera(1, this.camera, 3000)
    tl.addContent(1, 8000)
    tl.addCamera(2, this.camera2, 3000)
    tl.addCamera(3, this.camera, 3000)
    tl.addContent(1, 8000)
    tl.addCamera(4, this.camera2, 3000)
    this.map.on('load', () => {
      tl.play()
      setTimeout(() => tl.pause(), 8000);
    }) */
  },
  computed: {
    ...mapState("timeline", ["map", "timer"])
  },
  methods: {
    ...mapMutations("timeline", ["setTimer"])
  }
};
</script>
