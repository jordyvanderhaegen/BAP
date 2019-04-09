<template>
  <div>
    <AppNavbar />
    <MapContainer />
    <TimelineList />
    <TimelineToolbar />
  </div>
</template>

<style lang="scss">

</style>

<script>
import TimelineList from '@/components/molecules/TimelineList.vue';
import MapContainer from '@/components/molecules/MapContainer.vue';
import TimelineToolbar from '@/components/molecules/TimelineToolbar.vue';
import AppNavbar from '@/components/molecules/AppNavbar.vue';

export default {
  name: 'home-view',
  components: {
    TimelineList,
    TimelineToolbar,
    MapContainer,
    AppNavbar,
  }
}
</script>
