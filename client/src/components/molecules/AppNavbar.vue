<template>
  <div class="m-navbar">
    <AppLogo />
    <MenuButton @click.native="toggleMenu()" />
  </div>
</template>

<style lang="scss">
.m-navbar {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  padding: rem($space-sm);
  z-index: layer('header');

  @include at($screen-lg) {
    padding: rem($space-md);
  }

}
</style>

<script>
import MenuButton from '@/components/atoms/MenuButton.vue';
import AppLogo from '@/components/atoms/AppLogo.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'm-navbar',
  components: {
    MenuButton,
    AppLogo,
  },
  methods: {
    ...mapMutations('ui', ['toggleMenu']),
  },
};
</script>
