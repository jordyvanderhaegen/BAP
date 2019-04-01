<template>
  <div id="app">
    <router-view/>
    <Menu />
  </div>
</template>

<style lang="scss">
</style>

<script>
import Menu from '@/components/templates/Menu.vue';

export default {
  components: {
    Menu,
  },
};
</script>
