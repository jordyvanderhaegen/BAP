<template>
  <div class="l-map">
    <NavBar />
    <ContentContainer>
      <MapContainer />
      <StoryModal v-if="modalVisible"/>
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
import StoryModal from '@/components/molecules/StoryModal.vue';
import { mapState } from 'vuex';

export default {
  name: 'l-map',
  components: {
    MapContainer,
    NavBar,
    ContentContainer,
    StoryModal,
  },
  computed: {
    ...mapState('modal', ['modalVisible'])
  },
}
</script>