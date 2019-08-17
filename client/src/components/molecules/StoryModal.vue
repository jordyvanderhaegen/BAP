<template>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    appear
  >
  <ContentModal>
    <h3 class="a-modal__title">Atlantic wall.</h3>
    <p class="a-modal__synopsis">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed obcaecati in vitae laboriosam suscipit dolore nihil ut accusantium eaque cupiditate ullam necessitatibus magni, ipsa fuga doloribus ea est libero voluptate.Laudantium deleniti alias eligendi placeat nulla, dicta, totam ullam repellat doloremque inventore ab adipisci reiciendis reprehenderit, amet sint fugiat voluptate numquam? Laudantium tempora repellendus aut impedit cupiditate! Non, sequi ratione.</p>
    <p class="a-modal__description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta maxime, sit nam dolore molestiae omnis perspiciatis earum! A in harum temporibus quod, aliquid doloremque debitis unde eum voluptate nobis dicta.
    Praesentium eius quae ea sapiente blanditiis pariatur. Hic eligendi consequatur dolore fuga expedita, sed aliquid corrupti? Suscipit consectetur fuga atque accusamus aliquam doloremque voluptates rem cum eius, ad similique quasi.
    Non debitis delectus quae eum, minus ex eos doloribus in quidem qui iusto tempore. Saepe nihil repudiandae animi molestiae porro soluta harum officiis facere laborum, voluptas, deserunt quo voluptatum fugit!
    Error sunt ea vel incidunt maiores voluptates adipisci, voluptas sint nam aliquid! Velit exercitationem repudiandae veniam aut labore quisquam doloremque natus, eveniet voluptatibus quis fugiat mollitia. Quas, repellendus ipsa? Omnis.
    Doloribus culpa illo voluptates exercitationem ducimus sint. Exercitationem laboriosam voluptatibus debitis et incidunt ea dignissimos impedit facilis voluptatum reiciendis temporibus blanditiis mollitia non perferendis, at, voluptate nihil ab provident quibusdam!</p>
    <ProgressBar :duration="percentage"/>
  </ContentModal>
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
import ContentModal from '@/components/molecules/ContentModal.vue';
import ProgressBar from '@/components/molecules/ProgressBar.vue';
import { TweenMax, TimelineMax } from 'gsap';
import { setTimeout, setInterval } from 'timers';

export default {
  name: 'm-storymodal',
  data() {
    return {
      animation: null,
      percentage: 0
    };
  },
  components: {
    ContentModal,
    ProgressBar
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
