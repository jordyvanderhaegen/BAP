<template>
  <div class="m-menu__content">
    <div class="m-menu__image" ref="menuImage">
      <EventImage
        :image="coverImage"
      />
      <!-- <div class="m-menu__image-cover" ref="cover"></div> -->
    </div>
    <div class="m-menu__items">
      <div
        v-for="(chapter, index) in chapters"
        :key="index"
        class="m-menu__item"
        ref="menuItem"
        @mouseover="setCoverImage(chapter.coverImageIndex)"
      >
        <div class="m-menu__item-number">
          <h1>0{{ index + 1 }}</h1>
        </div>
        <div class="m-menu__item-title">
          <h1>{{ chapter.title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.m-menu__content {
  flex-grow: 1;
  display: flex;
}
.m-menu__image {
  width: 40vw;
  height: 100%;
  > div {
    position: absolute;
  }
}
.m-menu__items {
  flex-grow: 1;
  padding: 0 5.4rem;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.m-menu__item {
  display: flex;
  align-items: flex-end;
  font-family: $font-family-headings;
  color: $text-color-secondary;
  font-size: rem(70px);
  font-weight: 700;
  margin-bottom: 1.45rem;
  transition: color .3s ease;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    color: $text-color-primary;
    .m-menu__item-number {
      transform: translateY(0);
    }
  }
}
.m-menu__item-number {
  transform: translateY(100%);
  transition: transform .3s ease;
  padding-right: 1.3rem;
  font-size: rem(30px);
  line-height: 1.6;
}
.m-menu__image-cover {
  width: 100%;
  height: 100%;
  background: $background-color-primary;
}
</style>

<script>
import EventImage from '@/components/molecules/EventImage.vue';
import { TweenMax, Power4 } from 'gsap';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'm-menu-content',
  components: {
    EventImage,
  },
  computed: {
    ...mapState('ui', ['menuOpen', 'menuTl']),
    ...mapState('chapters', ['chapters']),
    ...mapGetters('chapters', ['dataTitles', 'getImageByIndex']),
  },
  watch: {
    menuOpen (open) {
      if (open) {
        this.openMenu();
      }
    },
  },
  data() {
    return {
      coverImage: null
    }
  },
  created() {
    this.setCoverImage(1)
  },
  mounted() {
    TweenMax.set([this.$refs.menuItem, this.$refs.menuImage], {
      yPercent: 200,
      opacity: 0,
    });
  },
  methods: {
    openMenu() {
      this.menuTl.add('start');
      this.menuTl.staggerTo(this.$refs.menuItem, 1.5, {
        yPercent: 0,
        opacity: 1,
        force3D: true,
        ease: Power4.easeOut,
      }, 0.08, 'start');
      this.menuTl.to(this.$refs.menuImage, 1.5, {
        yPercent: 0,
        opacity: 1,
        force3D: true,
        ease: Power4.easeOut,
      }, 'start');
    },
    setCoverImage(index) {
      this.coverImage = this.getImageByIndex(index)
    }
  },
};
</script>
