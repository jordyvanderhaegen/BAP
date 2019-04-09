<template>
  <div class="t-menu">
    <MenuContent/>
    <CloseButton class="a-menu__btn" @click.native="$store.commit('ui/toggleMenu')"/>
  </div>
</template>

<style lang="scss">
.t-menu {
  width: 100vw;
  height: 100vh;
  background: $background-color-primary;
  position: fixed;
  right: 0;
  top: 0;
  z-index: layer("header");
  padding: 3.2rem;
  display: flex;
}
</style>

<script>
import CloseButton from '@/components/atoms/CloseButton.vue';
import MenuContent from '@/components/organisms/MenuContent.vue';
import { TweenMax, Power4, TimelineMax } from 'gsap';
import { mapState } from 'vuex';

export default {
  name: 't-menu',
  components: {
    CloseButton,
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
    this.setMenuOffset()
    this.$nextTick(() => {
      window.addEventListener('resize', this.setMenuOffset)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setMenuOffset)
  },
  methods: {
    openMenu() {
      this.$store.commit('ui/setMenuTl', new TimelineMax());
      this.menuTl.to(this.$el, 0.8, {
        x: 0,
        ease: Power4.easeOut,
        force3D: true,
      });
      this.menuTl.add('start');
    },
    closeMenu() {
      this.menuTl.reverse(2);
    },
    setMenuOffset() {
      TweenMax.set(this.$el, {
        x: this.$el.offsetWidth,
      });
    }
  },
};
</script>
