<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    appear
  >
    <div class="l-modal">
      <slot />
    </div>
  </transition>
</template>

<style lang="scss">
.l-modal {
  color: white;
  position: fixed;
  background: $background-color-primary;
  overflow: auto;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: layer('header');
}
</style>

<script>
import { TweenMax, Power4, TimelineMax } from 'gsap';

export default {
  name: 'l-modal',
  data() {
    return {
      animation: null,
    };
  },
  methods: {
    beforeEnter(el) {
      TweenMax.set(el, {
        yPercent: 100,
        opacity: 0,
      });
    },
    enter(el, done) {
      this.animation = new TimelineMax({
        onComplete: done
      })

      this.animation.to(el, 0.8, {
        yPercent: 0,
        opacity: 1,
        ease: Power4.easeOut,
        force3D: true,
      })
    },
    leave(el, done) {
      this.animation.eventCallback("onReverseComplete", done)
      this.animation.reverse()
    }
  }
}
</script>
