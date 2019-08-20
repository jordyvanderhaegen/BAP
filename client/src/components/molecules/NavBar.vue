<template>
  <div class="m-navbar">
    <MenuButton v-if="!menuOpen" @click.native="toggleMenu()" />
    <CloseButton v-if="menuOpen" @click.native="toggleMenu()" />
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
import CloseButton from '@/components/atoms/CloseButton.vue';
import TimelineToolbar from '@/components/molecules/TimelineToolbar.vue';
import { mapMutations, mapState } from "vuex";

export default {
  name: 'm-navbar',
  components: {
    MenuButton,
    TimelineToolbar,
    CloseButton,
  },
  computed: {
    ...mapState('ui', ['menuOpen'])
  },
  methods: {
    ...mapMutations('ui', ['toggleMenu'])
  }
}
</script>
