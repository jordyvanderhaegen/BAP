<template>
  <div class="m-timeline__modal" ref="modal">
    <ul>
      <li>
        <input type="checkbox" id="camera_lock" class="m-timeline__modal-input" v-model="cameraLocked">
        <label for="camera_lock" class="m-timeline__modal-label">Lock camera</label>
      </li>
      <li>
        <input type="checkbox">
        <label>Lock camera</label>
      </li>
      <li>
        <input type="checkbox">
        <label>Lock camera</label>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.m-timeline__modal {
  position: absolute;
  right: 100%;
  top: 0;
  // top: 50%;
  // transform: translateY(-50%);
  width: 300px;
  padding: 1.6rem;
  background: rgba($background-color-primary, 0.5);
  z-index: layer("header");
  font-family: $font-family-regular;
  font-size: $font-size-base;
  li {
    display: flex;
    align-items: center;
  }
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
    }
  },
  watch: {
    timelineToolbarModalOpen(open) {
      open ? this.openModal() : this.closeModal()
    }
  },
  mounted() {
    TweenMax.set(this.$refs.modal, {
      yPercent: 100,
      opacity: 0,
    });
  },
  methods: {
    openModal() {
      this.animation = TweenMax.to(this.$refs.modal, .3, {
        yPercent: 0,
        opacity: 1
      });
    },
    closeModal() {
      this.animation.reverse()
    }
  }
};
</script>
