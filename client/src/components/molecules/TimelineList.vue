<template>
  <div class="m-timeline__list">
    <TimelineItem
      v-for="index in dataCount"
      :key="index"
      :index="index"
      :active="index == activeChapterIndex"
    />
  </div>
</template>

<style lang="scss">
.m-timeline__list {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 11vh;
  display: flex;
  z-index: layer('overlay');
}
</style>

<script>
import TimelineItem from '@/components/atoms/TimelineItem.vue';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'o-timeline-list',
  components: {
    TimelineItem
  },
  computed: {
    ...mapGetters('chapters', ['dataCount']),
    ...mapGetters('timeline', ['activeChapterIndex']),
  },
}
</script>
