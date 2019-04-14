<template>
  <div class="l-home">
    <AppNavbar />
    <MapContainer />
    <TimelineList />
    <TimelineToolbar />
    <StoryModal v-if="showModal">
      <router-view name="story"/>
    </StoryModal>
  </div>
</template>

<style lang="scss">
.l-home {
  // display: flex;
}
</style>

<script>
import TimelineList from '@/components/molecules/TimelineList.vue';
import MapContainer from '@/components/molecules/MapContainer.vue';
import TimelineToolbar from '@/components/molecules/TimelineToolbar.vue';
import AppNavbar from '@/components/molecules/AppNavbar.vue';
import Modal from '@/components/molecules/Modal.vue';
import StoryModal from '@/components/molecules/StoryModal.vue';

export default {
  name: 'home-view',
  components: {
    TimelineList,
    TimelineToolbar,
    MapContainer,
    AppNavbar,
    Modal,
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
