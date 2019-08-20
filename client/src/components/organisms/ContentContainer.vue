<template>
  <div class="o-content-container">
    <slot />
    <Menu />
  </div>
</template>

<style lang="scss">
.o-content-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}
</style>

<script>
import Menu from '@/components/templates/Menu.vue';

export default {
  name: 'o-content-container',
  components: {
    Menu,
  },
}
</script>
