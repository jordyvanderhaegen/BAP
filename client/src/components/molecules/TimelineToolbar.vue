<template>
  <div class="m-timeline__toolbar">
    <OptionsButton />
    <PlayButton />
    <PauseButton />
    <RestartButton />
  </div>
</template>

<style lang="scss">
.m-timeline__toolbar {
  position: fixed;
  right: 0;
  bottom: 11vh;
  z-index: layer('header');
  padding: 3.2rem;
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

export default {
  name: 'm-timeline-toolbar',
  components: {
    PlayButton,
    PauseButton,
    OptionsButton,
    RestartButton,
  }
}
</script>
