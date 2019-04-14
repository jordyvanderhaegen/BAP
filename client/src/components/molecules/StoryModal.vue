<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    appear
  >
    <div class="m-story-modal">
      <slot />
    </div>
  </transition>
</template>

<style lang="scss">
.m-story-modal {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 11vh;
  left: 0;
  justify-content: center;
  align-items: flex-end;
  padding: rem($space-xs) rem($space-xs);
  z-index: layer('header');
  pointer-events: none;
  display: flex;
}
</style>

<script>
import { TweenMax, TimelineMax } from 'gsap';

export default {
  name: 'm-storymodal',
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
