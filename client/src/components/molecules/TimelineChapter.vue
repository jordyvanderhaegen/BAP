<template>
  <div class="m-timeline__chapter">
    <h3 class="a-timeline__chapter-date">Chapter {{ ('0' + $route.params.id).slice(-2)}}</h3>
    <p class="a-timeline__chapter-synopsis">{{ chapter.synopsis }}</p>
    <p class="a-timeline__chapter-description">{{ chapter.body }}</p>
  </div>
</template>

<style lang="scss">
.m-timeline__chapter {
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
.a-timeline__chapter-synopsis,
.a-timeline__chapter-description {
  font-family: $font-family-regular;
  font-size: rem($font-size-small);
  line-height: 1.7em;
}
.a-timeline__chapter-synopsis {
  font-weight: 600;
  padding-bottom: $space-xs;
}

.a-timeline__chapter-description {
  font-weight: 300;
}
.a-timeline__chapter-date {
  font-family: $font-family-headings;
  font-size: rem($font-size-large);
  font-weight: 600;
  margin-bottom: 1.15rem;
}
</style>

<script>
import chapters from '@/assets/data/chapters.json';

export default {
  name: 'm-timeline-chapter',
  data() {
    return {
      chapter: null,
    };
  },
  created() {
    this.chapter = chapters.find(item => item.id == this.$route.params.id)
  }
}
</script>
