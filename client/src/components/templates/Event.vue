<template>
  <div>
    <div class="l-event-detail">
      <div class="l-event-detail__img">
        <EventImage
          :imageIndex="1"
        />
      </div>
      <div class="l-event-detail__intro">
        <EventIntro
          title="Invasion of Normandie"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac elementum ligula. Donec a dictum quam. Nunc vulputate elit dolor, vitae elementum odio cursus a. Phasellus eu ipsum vel nisl mattis mattis. Fusce laoreet justo sed diam dictum rutrum. Nunc eget turpis efficitur, suscipit ipsum tempus, condimentum purus. Fusce vehicula arcu nibh, ac eleifend turpis tempor in. Integer imperdiet, nisl scelerisque rutrum auctor, velit dui luctus ante, quis vulputate purus enim non mauris. Donec condimentum sem eget tellus tempus, eget pellentesque velit congue. Fusce eleifend libero vel augue euismod, quis finibus turpis facilisis. Duis eu ipsum neque. Mauris dui velit, ullamcorper ut dictum ac, mollis ut justo. Donec volutpat nisl vehicula, blandit tortor nec, venenatis neque. Maecenas posuere ut mauris quis auctor. Phasellus sed dolor augue. Integer sollicitudin nibh id nibh ullamcorper fermentum. Sed in facilisis nulla. Sed vel risus a enim pharetra rhoncus. Maecenas sed accumsan tortor, et mattis felis. Nulla facilisi. In consequat, erat at hendrerit mattis, odio urna eleifend tellus, vitae ullamcorper felis risus posuere tortor. Nunc ultrices, est sollicitudin fermentum rutrum, urna nisl iaculis justo, at vulputate justo orci sit amet diam."
          date="03 december, 1938"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-event-detail {
  display: flex;

  @include to($screen-lg) {
    flex-direction: column;
  }

}
.l-event-detail__img {
  width: 45vw;
  height: 100vh;

  @include to($screen-lg) {
    width: 100vw;
    height: 75vh;
  }

}
.l-event-detail__intro {
  width: 55vw;

  @include to($screen-lg) {
    width: 100vw;
  }

}
</style>

<script>
import EventImage from '@/components/molecules/EventImage.vue';
import EventIntro from '@/components/molecules/EventIntro.vue';
import { mapState } from 'vuex';

export default {
  name: 't-event',
  components: {
    EventImage,
    EventIntro,
  },
  computed: {
    ...mapState({
      menuOpen: state => state.menu.menuOpen,
    }),
  },
};
</script>
