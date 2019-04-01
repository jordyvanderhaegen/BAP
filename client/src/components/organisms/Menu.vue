<template>
  <div class="o-menu">
    <MenuContent/>
    <BaseActionButton class="a-menu__btn" @click.native="$store.commit('ui/toggleMenu')"/>
  </div>
</template>

<style lang="scss">
.o-menu {
  width: 100vw;
  height: 100vh;
  background: $background-color-primary;
  position: fixed;
  right: 0;
  z-index: layer("header");
  padding: 3.2rem;
  display: flex;
}
</style>

<script>
import BaseActionButton from '@/components/BaseActionButton';
import MenuContent from '@/components/molecules/MenuContent';
import { TweenMax, Power4, TimelineMax } from 'gsap';
import { mapState } from 'vuex';

export default {
  name: 'o-menu',
  components: {
    BaseActionButton,
    MenuContent,
  },
  computed: {
    ...mapState('ui', ['menuOpen', 'menuTl']),
  },
  watch: {
    menuOpen(open) {
      open ? this.openMenu() : this.closeMenu();
    },
  },
  mounted() {
    TweenMax.set(this.$el, {
      x: this.$el.offsetWidth,
    });
  },
  methods: {
    openMenu() {
      this.$store.commit('ui/setMenuTl', new TimelineMax());
      this.menuTl.to(this.$el, 0.8, {
        x: 0,
        ease: Power4.easeOut,
        force3D: true,
      });
    },
    closeMenu() {
      this.menuTl.reverse(2);
    },
  },
};
</script>
