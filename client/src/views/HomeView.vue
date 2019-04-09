<template>
  <div>
    <AppNavbar />
    <MapElement />
    <TimelineList />
    <TimelineToolbar />
  </div>
</template>

<style lang="scss">

</style>

<script>
import TimelineList from '@/components/molecules/TimelineList.vue';
import MapElement from '@/components/atoms/MapElement.vue';
import TimelineToolbar from '@/components/molecules/TimelineToolbar.vue';
import AppNavbar from '@/components/AppNavbar.vue';

export default {
  name: 'home-view',
  components: {
    TimelineList,
    TimelineToolbar,
    MapElement,
    AppNavbar
  }
}
</script>
