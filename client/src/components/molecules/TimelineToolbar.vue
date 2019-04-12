<template>
  <div class="m-timeline__toolbar">
    <OptionsButton 
      @click.native="toggleMenuToolbarModal()"
      :active="timelineToolbarModalOpen"
    />
    <PlayButton @click.native="resumeTimer()" />
    <PauseButton @click.native="pauseTimer()" />
    <RestartButton @click.native="setActiveDateId(1)" />
    <TimelineOptionsModal />
  </div>
</template>

<style lang="scss">
.m-timeline__toolbar {
  position: fixed;
  right: 0;
  bottom: 11vh;
  z-index: layer('header');
  padding: rem($space-sm);

  @include at($screen-lg) {
    padding: rem($space-md);
  }
  div {
    margin: 10px 0;
  }
}
</style>

<script>
import PlayButton from '@/components/atoms/PlayButton.vue';
import PauseButton from '@/components/atoms/PauseButton.vue';
import OptionsButton from '@/components/atoms/OptionsButton.vue';
import RestartButton from '@/components/atoms/RestartButton.vue';
import TimelineOptionsModal from '@/components/molecules/TimelineOptionsModal.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'm-timeline-toolbar',
  components: {
    PlayButton,
    PauseButton,
    OptionsButton,
    RestartButton,
    TimelineOptionsModal,
  },
  computed: {
    ...mapState('ui', ['timelineToolbarModalOpen']),
  },
  methods: {
    ...mapMutations('ui', ['toggleMenuToolbarModal']),
    ...mapMutations('timeline', ['setActiveDateId', 'pauseTimer', 'resumeTimer']),
  }
}
</script>
