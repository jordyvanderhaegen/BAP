<template>
  <div class="m-timeline__toolbar">
    <OptionsButton
      @click.native="toggleMenuToolbarModal()"
      :active="timelineToolbarModalOpen"
    />
    <PreviousButton @click.native="previousTimelineItem()" />
    <NextButton @click.native="nextTimelineItem()"/>
    <PlayButton @click.native="playTimeline()" v-if="timelinePlayingState == 'PAUSED'" />
    <PauseButton @click.native="pauseTimeline()" v-if="timelinePlayingState == 'PLAYING'" />
    <RestartButton @click.native="restartTimeline()" />
    <TimelineOptionsModal />
    <!-- <button @click="logCamera()">log</button> -->
  </div>
</template>

<style lang="scss">
.m-timeline__toolbar {
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
import NextButton from '@/components/atoms/NextButton.vue';
import PreviousButton from '@/components/atoms/PreviousButton.vue';
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
    NextButton,
    PreviousButton
  },
  computed: {
    ...mapState('ui', ['timelineToolbarModalOpen']),
    ...mapState('timeline', ['timer', 'timelinePlayingState']),
  },
  methods: {
    ...mapMutations('ui', ['toggleMenuToolbarModal']),
    ...mapMutations('timeline', ['restartTimeline', 'pauseTimeline', 'playTimeline', 'previousTimelineItem', 'nextTimelineItem']),
    logCamera() {
      /* console.log(JSON.stringify(this.$store.state.timeline.deck.viewState['default-view'])) */
      console.log(this.timer)
      this.timer.pause()
    }
  }
}
</script>
