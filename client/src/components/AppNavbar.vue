<template>
  <div class="navbar">
    <AppLogo />
    <BaseActionButton
    @click.native="toggleMenu()"
    />
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.9rem;
}
</style>

<script>
import BaseActionButton from '@/components/BaseActionButton.vue';
import AppLogo from '@/components/AppLogo.vue';
import { mapMutations } from 'vuex';

export default {
  name: 'navbar',
  components: {
    BaseActionButton,
    AppLogo,
  },
  methods: {
    ...mapMutations('ui', ['toggleMenu']),
  },
};
</script>
