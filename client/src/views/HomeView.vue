<template>
  <div>
    <AppNavbar />
    <MapContainer />
    <TimelineList />
    <TimelineToolbar />
    <Modal v-if="showModal">
      <router-view name="unit"/>
    </Modal>
  </div>
</template>

<style lang="scss">

</style>

<script>
import TimelineList from '@/components/molecules/TimelineList.vue';
import MapContainer from '@/components/molecules/MapContainer.vue';
import TimelineToolbar from '@/components/molecules/TimelineToolbar.vue';
import AppNavbar from '@/components/molecules/AppNavbar.vue';
import Modal from '@/components/templates/Modal.vue';

export default {
  name: 'home-view',
  components: {
    TimelineList,
    TimelineToolbar,
    MapContainer,
    AppNavbar,
    Modal,
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
