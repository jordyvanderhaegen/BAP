<template>
  <div class="m-menu__image" ref="menuImage">
    <EventImage
      :imageIndex="coverImageIndex"
    />
    <!-- <div class="m-menu__image-cover" ref="cover"></div> -->
  </div>
</template>

<style lang="scss">
.m-menu__image {
  width: 40vw;
  height: 100%;
  > div {
    position: absolute;
  }
}
.m-menu__image-cover {
  width: 100%;
  height: 100%;
  background: $background-color-primary;
}
</style>

<script>
import EventImage from '@/components/molecules/EventImage.vue';
import { mapState, mapGetters } from 'vuex';
import { TweenMax, Power4 } from 'gsap';

export default {
  name: 'm-menu-image',
  components: {
    EventImage,
  },
  data() {
    return {
      coverImageIndex: null,
    };
  },
  computed: {
    ...mapState('chapters', ['chapters']),
    ...mapState('ui', ['menuOpen', 'menuTl', 'menuImageIndex']),
    ...mapGetters('chapters', ['getImageByIndex']),
  },
  watch: {
    menuOpen(open) {
      if (open) this.addAnimation();
    },
    menuImageIndex(index) {
      this.coverImageIndex = index;
    },
  },
  created() {
    this.coverImageIndex = this.chapters[0].coverImageIndex;
  },
  mounted() {
    TweenMax.set(this.$refs.menuImage, {
      yPercent: 200,
      opacity: 0,
    });
  },
  methods: {
    addAnimation() {
      this.menuTl.to(this.$refs.menuImage, 1.5, {
        yPercent: 0,
        opacity: 1,
        force3D: true,
        ease: Power4.easeOut,
      }, 'start');
    },
  },
};
</script>
