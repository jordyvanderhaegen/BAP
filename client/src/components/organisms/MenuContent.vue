<template>
  <div class="o-menu__content">
    <MenuImage />
    <MenuItems />
  </div>
</template>

<style lang="scss">
.o-menu__content {
  flex-grow: 1;
  display: flex;
}
</style>

<script>
import MenuItems from '@/components/molecules/MenuItems.vue';
import MenuImage from '@/components/molecules/MenuImage.vue';

export default {
  name: 'm-menu-content',
  components: {
    MenuItems,
    MenuImage,
  },
};
</script>
