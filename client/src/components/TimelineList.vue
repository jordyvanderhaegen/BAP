<template>
  <div class="timeline">
    <TimelineItem
      v-for="index in dataCount"
      :key="index"
      :index="index"
    >
    </TimelineItem>
  </div>
</template>

<style lang="scss" scoped>
.timeline {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 11vh;
  display: flex;
  z-index: layer("header");
}
</style>

<script>
import TimelineItem from '@/components/TimelineItem.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'timeline-list',
  components: {
    TimelineItem,
  },
  computed: {
    ...mapGetters('chapters', ['dataCount']),
  },
};
</script>
