<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    appear
  >
    <div v-if="modalVisible">
      <component :is="component"></component>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { TweenMax, TimelineMax } from 'gsap';

export default {
  name: "AppModal",
  data() {
    return {
      component: null,
      animation: null,
    };
  },
  computed: {
    ...mapState("modal", ["modalVisible", "modalComponent"])
  },
  watch: {
    modalComponent(componentName) {
      Vue.component(componentName, () =>
        import(`@/components/molecules/${componentName}`)
      );
      this.component = componentName;
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
};
</script>