<template>
  <div class="m-navbar">
    <MenuButton />
    <TimelineToolbar />
  </div>
</template>

<style lang="scss">
.m-navbar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
  background: $background-color-primary;
  padding: rem($space-xs);
  z-index: layer('header');
}
</style>


<script>
import MenuButton from '@/components/atoms/MenuButton.vue';
import TimelineToolbar from '@/components/molecules/TimelineToolbar.vue';

export default {
  name: 'm-navbar',
  components: {
    MenuButton,
    TimelineToolbar,
  }
}
</script>
