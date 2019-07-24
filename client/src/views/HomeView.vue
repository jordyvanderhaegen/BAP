<template>
  <div class="l-home">
    <NavBar />
    <ContentContainer>
      <MapContainer />
      <StoryModal />
    </ContentContainer>
  </div>
</template>

<style lang="scss">
.l-home {
  display: flex;
  max-height: 100vh;
}
</style>

<script>
import MapContainer from '@/components/molecules/MapContainer.vue';
import NavBar from '@/components/molecules/NavBar.vue';
import ContentContainer from '@/components/organisms/ContentContainer.vue';
import StoryModal from '@/components/molecules/StoryModal.vue';

export default {
  name: 'home-view',
  components: {
    MapContainer,
    NavBar,
    ContentContainer,
    StoryModal,
  },
  data() {
    return {
      showModal: this.$route.meta.showModal
    };
  },
  watch: {
    '$route.meta'({ showModal }) {
      this.showModal = showModal
    }
  }
}
</script>
