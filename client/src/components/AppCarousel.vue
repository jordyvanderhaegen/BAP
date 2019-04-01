<template>
  <div
    class="carousel"
    ref="carousel"
  >
    <div
      v-for="(image,index) in images"
      :key="index"
      :style="`backgroundImage: url(${image})`"
      class="carousel__item"
    />
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  z-index: layer("base");
  position: absolute;
  top: 20%;
  width: 100vw;
  opacity: .9;
  .is-selected {
    opacity: 1;
  }
}
.carousel__item {
  height: 55vh;
  width: 45vw;
  background-size: cover;
  background-position: center center;
  margin-right: 10vw;
  opacity: 0.6;
  transition: opacity 0.3s;
}
</style>

<script>
import Flickity from 'flickity';

export default {
  name: 'app-carousel',
  data() {
    return {
      images: [
        'https://ichef.bbci.co.uk/news/660/cpsprodpb/7375/production/_103075592_hmsrepulse.jpg',
        'http://getwallpapers.com/wallpaper/full/0/6/6/723645-iwo-jima-flag-raising-wallpaper-2500x1978-computer.jpg',
        'https://qph.fs.quoracdn.net/main-qimg-aaa7945bb77b142c1a1fe7bb20b8ee01.webp',
        'https://nationalinterest.org/sites/default/files/styles/desktop__1486_x_614/public/main_images/image-2018-08-03%20%282%29.jpg?itok=A5yxqLOJ',
      ],
    };
  },
  mounted() {
    const flkty = new Flickity(this.$refs.carousel, {
      prevNextButtons: false,
      pageDots: false,
      autoPlay: true,
      lazyLoad: 1,
      on: {
        staticClick: (event, pointer, cellElem, cellIndex) => {
          if (cellIndex !== undefined) {
            flkty.select(cellIndex);
          }
        },
        change: (index) => {
          console.log(index);
        },
      },
    });
    /* flkty.on('staticClick', (event, pointer, cellElem, cellIndex) => {
      if (cellIndex) {
        flkty( 'select', cellIndex );
      }
    }) */
  },
};
</script>
