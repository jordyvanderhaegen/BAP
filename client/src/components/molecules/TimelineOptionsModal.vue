<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    mode="out-in"
  >
    <div
      v-if="timelineToolbarModalOpen"
      class="m-timeline__modal"
    >
      <ul>
        <li>
          <input type="checkbox" id="camera_lock" class="m-timeline__modal-input" v-model="cameraLocked">
          <label for="camera_lock" class="m-timeline__modal-label">Lock camera</label>
        </li>
        <li>
          <input type="checkbox" id="show_casualties" class="m-timeline__modal-input" v-model="showCasualties">
          <label for="show_casualties" class="m-timeline__modal-label">Show casualties</label>
        </li>
        <li>
          <input type="checkbox">
          <label>Lock camera</label>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style lang="scss">
.m-timeline__modal {
  position: absolute;
  right: 100%;
  top: 0;
  width: 300px;
  padding: 1.6rem;
  background: $background-color-overlay;
  z-index: layer("header");
  li {
    display: flex;
    align-items: center;
  }
}
.m-timeline__modal-label {
  font-family: $font-family-regular;
  font-size: $font-size-base;
  color: $text-color-primary;
}
</style>

<script>
import { TweenMax } from 'gsap'
import { mapState } from 'vuex';

export default {
  name: 'm-timeline-modal',
  data() {
    return {
      animation: null
    };
  },
  computed: {
    ...mapState('ui', ['timelineToolbarModalOpen']),
    cameraLocked: {
      get() {
        return this.$store.state.timeline.cameraLocked
      },
      set(val) {
        this.$store.commit('timeline/setCameraLocked', val)
      }
    },
    showCasualties: {
      get() {
        return this.$store.state.timeline.showCasualties
      },
      set(val) {
        this.$store.commit('timeline/setShowCasualties', val)
      }
    }
  },
  methods: {
    beforeEnter(el) {
      TweenMax.set(el, {
        yPercent: 100,
        opacity: 0,
      });
    },
    enter(el, done) {
      this.animation = TweenMax.to(el, 0.3, {
        yPercent: 0,
        opacity: 1,
        onComplete: done
      });
    },
    leave(el, done) {
      this.animation.eventCallback("onReverseComplete", done)
      this.animation.reverse()
    }
  }
};
</script>
