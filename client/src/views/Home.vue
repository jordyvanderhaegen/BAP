<template>
  <div>
    <TimelineList />
    <AppNavbar />
    <!-- <CarouselList /> -->
    <AppCarousel />
    <h1 class="year__indicator">Chapter <br>01</h1>
    <!-- <div class="img" /> -->
  </div>
</template>

<style lang="scss">
.year__indicator {
  position: absolute;
  top: 30%;
  left: 5%;
  color: #838b91;
  font-family: 'Spectral', serif;
  font-size: rem(200px);
  font-weight: 700;
  z-index: 1;
  opacity: .7;
  z-index: layer("auto");
}
.img {
  position: absolute;
  top: 20%;
  left: 25%;
  background-image: url('https://www.frenchtoday.com//assets/2011/05/caen-france-ww2-story--1080x520.jpg');
  background-size: cover;
  width: 50vw;
  height: 50vh;
  z-index: 3;
  opacity: .9;
}
</style>


<script>
import AppNavbar from '@/components/AppNavbar.vue';
import AppCarousel from '@/components/AppCarousel.vue';
import TimelineList from '@/components/TimelineList.vue';
import CarouselList from '@/components/CarouselList.vue';

export default {
  name: 'home',
  components: {
    AppNavbar,
    TimelineList,
    AppCarousel,
    CarouselList,
  },
};
</script>
