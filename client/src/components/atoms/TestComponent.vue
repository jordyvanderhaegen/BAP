<template>
  
</template>

<script>
import { TimeLine, Timer } from '@/assets/js/utils'
import { mapState } from 'vuex';

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
    }
  },
  mounted() {
    const tl = new TimeLine()
    tl.addCamera(1, this.camera, 3000)
    tl.addContent(1, 8000)
    tl.addCamera(2, this.camera2, 3000)
    tl.addCamera(3, this.camera, 3000)
    tl.addContent(1, 8000)
    tl.addCamera(4, this.camera2, 3000)
    this.map.on('load', () => {
      tl.play()
    })
  },
  computed: {
    ...mapState('timeline', ['map'])
  }
}
</script>
