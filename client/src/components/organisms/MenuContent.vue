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
import MenuItems from '@/components/molecules/MenuItems';
import MenuImage from '@/components/molecules/MenuImage';
import { TweenMax, Power4 } from 'gsap';
import { mapState } from 'vuex';

export default {
  name: 'm-menu-content',
  components: {
    MenuItems,
    MenuImage,
  },
};
</script>
