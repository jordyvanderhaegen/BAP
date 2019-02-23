<template>
  <div class="map__container" id="map__container"></div>
</template>

<script>
import * as mapboxgl from "mapbox-gl";
export default {
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoiam9yZHl2YW5kZXJoYWVnZW4iLCJhIjoiY2pydzZkNDd0MDhudTN5bWQwZXg5dDg0ZyJ9.UJtwyGNM3UlFubdMbs3kRg";
    let map = new mapboxgl.Map({
      container: "map__container",
      style: "mapbox://styles/jordyvanderhaegen/cjs11hf8l099g1fmnv9my8ozu",
      center: [4.35, 50.85],
      zoom: 5,
      pitch: 20,
      attributionControl: false
    });

    map.on("load", () => {
      map.addLayer({
        id: "maine",
        type: "fill",
        paint: {
          "fill-color": "#7A6C5C",
          "fill-opacity": 0.3
        },
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Polygon",
                  coordinates: [
                    [
                      [3.4716796874999996, 50.93073802371819],
                      [4.306640625, 50.08886893382965],
                      [5.9161376953125, 50.18041592143885],
                      [5.701904296875, 50.80246319809847],
                      [4.361572265625, 51.27566243415853],
                      [3.4716796874999996, 50.93073802371819]
                    ]
                  ]
                }
              }
            ]
          }
        }
      });
    });
  },
  drawMap() {}
};
</script>
<style lang="scss" scoped>
.map__container {
  width: 100vw;
  height: 100vh;
}
</style>



