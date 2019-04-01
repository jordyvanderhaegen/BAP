<template>
  <div class="m-menu__items">
    <MenuItem
      v-for="(chapter, index) in chapters"
      :key="index"
      :title="chapter.title"
      :number="index + 1"
      ref="menuItem"
      @mouseover.native="$store.commit('ui/setMenuCoverImageIndex', chapter.coverImageIndex)"
    />
  </div>
</template>

<style lang="scss">
.m-menu__items {
  flex-grow: 1;
  padding: 0 5.4rem;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

<script>
import MenuItem from '@/components/atoms/MenuItem';
import { TweenMax, Power4 } from 'gsap';
import { mapState } from 'vuex';

export default {
  name: 'm-menu-items',
  components: {
    MenuItem
  },
  computed: {
    ...mapState('chapters', ['chapters']),
    ...mapState('ui', ['menuOpen', 'menuTl']),
    elements() {
      return this.$refs.menuItem.map(item => item.$el)
    },
  },
  watch: {
    menuOpen(open) {
      if (open) this.addAnimation()
    }
  },
  mounted() {
    TweenMax.set(this.elements , {
      yPercent: 200,
      opacity: 0,
    });
  },
  methods: {
    addAnimation() {
      this.menuTl.staggerTo(this.elements, 1.5, {
        yPercent: 0,
        opacity: 1,
        force3D: true,
        ease: Power4.easeOut,
      }, 0.08, 'start');
    }
  }
}
</script>
