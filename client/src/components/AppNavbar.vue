<template>
  <div class="navbar">
    <AppLogo />
    <MenuButton
    @click.native="toggleMenu()"
    />
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3.2rem;
  z-index: layer('header');
  pointer-events: none;
}
</style>

<script>
import MenuButton from '@/components/atoms/MenuButton.vue';
import AppLogo from '@/components/AppLogo.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'navbar',
  components: {
    MenuButton,
    AppLogo,
  },
  methods: {
    ...mapMutations('ui', ['toggleMenu']),
  },
};
</script>
