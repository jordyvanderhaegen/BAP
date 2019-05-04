<template>
  <div class="m-timeline__story">
    <h3 class="a-timeline__story-date">Atlantic wall.</h3>
    <p class="a-timeline__story-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, placeat laudantium doloribus sed, omnis aut explicabo atque odit tenetur recusandae officia consequuntur sequi distinctio delectus molestiae. Adipisci officiis totam magnam!Laboriosam ullam eos harum nisi atque minima quidem veritatis ipsum voluptates deserunt dolor autem quae esse, velit est obcaecati, maiores provident inventore earum amet officiis rerum dolore. Non, nulla rem!</p>
  </div>
</template>

<style lang="scss">
.m-timeline__story {
  display: flex;
  flex-direction: column;
  padding: rem($space-sm) rem($space-sm);
  width: 100%;
  pointer-events: all;
  color: $text-color-primary;
  background: $background-color-overlay;

  @include at($screen-lg) {
    padding: rem($space-sm) rem($space-sm);
    width: 70%;
  }

}
.a-timeline__story-description {
  font-family: $font-family-regular;
  font-size: rem($font-size-small);
  line-height: 1.7em;
  font-weight: 300;
}
.a-timeline__story-date {
  font-family: $font-family-headings;
  font-size: rem($font-size-large);
  font-weight: 600;
  margin-bottom: 1.15rem;
}
</style>

<script>
import units from '@/assets/data/units.json';

export default {
  name: 'm-timeline-story',
  created() {
    const unit = units.find(item => item.id === this.$route.params.id)
    console.log(unit)
  }
}
</script>
