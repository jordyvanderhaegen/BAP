<template>
  <div class="l-map">
    <NavBar />
    <ContentContainer>
      <MapContainer />
      <AppModal />
    </ContentContainer>
  </div>
</template>

<style lang="scss">
.l-map {
  display: flex;
  max-height: 100vh;
  overflow: hidden;
}
</style>

<script>
import MapContainer from '@/components/molecules/MapContainer.vue';
import NavBar from '@/components/molecules/NavBar.vue';
import ContentContainer from '@/components/organisms/ContentContainer.vue';
import AppModal from '@/components/molecules/AppModal.vue';

export default {
  name: 'l-map',
  components: {
    MapContainer,
    NavBar,
    ContentContainer,
    AppModal
  },
}
</script>