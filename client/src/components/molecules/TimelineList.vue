<template>
  <div class="m-timeline__list">
    <TimelineItem
      v-for="index in dataCount"
      :key="index"
      :index="index"
      :active="index == activeChapterId"
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
    ...mapState('timeline', ['activeDateId']),
    ...mapState('chapters', ['chapters']),
  },
  data() {
    return {
      activeChapterId: 1
    }
  },
  watch: {
    activeDateId(val) {
      const activeChapter = this.getActiveChapter(val)
      console.log(activeChapter)
      this.activeChapterId = activeChapter.id
    }
  },
  methods: {
    getActiveChapter(activeId) {
      return this.chapters.find(item => item.dateRange[0] <= activeId && item.dateRange[1] >= activeId)
    }
  }
}
</script>
