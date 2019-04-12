<template>
  <div
    class="a-image-grid__item"
    :style="{backgroundImage: `url(${require('@/assets/img/'+ this.image.localSrc)})`}"
    @mouseover="showCaption()"
    @mouseleave="hideCaption()"
  >
    <EventImageCaption
      :location="image.location"
      :date="image.date"
      :copyright="`${image.origin.source} - ${image.origin.id}`"
      ref="caption"
    />
  </div>
</template>

<style lang="scss">
.a-image-grid__item {
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  overflow: hidden;
}
</style>

<script>
import EventImageCaption from '@/components/atoms/EventImageCaption.vue';
import { TweenMax, Power4 } from 'gsap';
import { mapGetters } from 'vuex';

export default {
  name: 'a-image-grid-item',
  components: {
    EventImageCaption
  },
  data() {
    return {
      animation: null,
    };
  },
  props: {
    imageIndex: {
      type: Number,
      required: true,
    }
  },
  mounted() {
    TweenMax.set(this.$refs.caption.$el, {
      opacity: 0,
      yPercent: 100,
    });
  },
  computed: {
    ...mapGetters('chapters', ['getImageByIndex']),
    image() {
      return this.getImageByIndex(this.imageIndex)
    },
  },
  methods: {
    showCaption() {
      TweenMax.to(this.$refs.caption.$el, .3, {
        opacity: 1,
        yPercent: 0,
      });
    },
    hideCaption() {
      TweenMax.to(this.$refs.caption.$el, .3, {
        opacity: 0,
        yPercent: 100,
      });
    }
  }
};
</script>
