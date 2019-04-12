<template>
  <div>
    <div class="l-unit-detail">
      <div class="l-unit-detail__img">
        <EventImage
          v-if="coverImageIndex"
          :imageIndex="coverImageIndex"
        />
      </div>
      <div class="l-unit-detail__intro">
        <UnitIntro
          v-if="data"
          :data="data"
        />
        <p 
          v-if="!data && !loading"
          class="l-unit-detail__intro-error"
        >Wikipedia does not have any data available 😞</p>
      </div>
      <div class="l-unit-detail__images">
        <ImageGridList
          v-if="imageIndexes.length"
          :images="imageIndexes"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.l-unit-detail {
  display: flex;
  min-height: 100vh;
  flex-wrap: wrap;

  @include to($screen-lg) {
    flex-direction: column;
  }
}
.l-unit-detail__img {
  width: 100%;
  padding: 0;
  height: 85vh;
  
  @include at($screen-lg) {
    width: 45%;
    padding: 5.4rem 3.2rem;
    height: 100vh;
  }

  @include at($screen-xl) {
    width: 35%;
  }

  
}
.l-unit-detail__intro {
  width: 100%;
  padding: 3.2rem;

  @include at($screen-lg) {
    width: 55%;
    padding: 5.4rem 3.2rem;
  }

  @include at($screen-xl) {
    width: 65%;
    padding: 5.4rem;
  }
}
.l-unit-detail__intro-error {
  font-size: rem($font-size-large);
  font-family: $font-family-headings;
  font-weight: 600;
}
.l-unit-detail__images {
  width: 100%;
}
</style>

<script>
import axios from 'axios';
import units from '@/assets/data/units.json';
import EventImage from '@/components/molecules/EventImage.vue';
import ImageGridList from '@/components/molecules/ImageGridList.vue';
import UnitIntro from '@/components/molecules/UnitIntro.vue';
import { mapState } from 'vuex';

export default {
  name: 't-unit',
  components: {
    EventImage,
    UnitIntro,
    ImageGridList,
  },
  data() {
    return {
      loading: true,
      data: null,
      coverImageIndex: null,
      imageIndexes: [],
      wikiBaseUrl: 'https://en.wikipedia.org/'
    }
  },
  computed: {
    ...mapState({
      menuOpen: state => state.menu.menuOpen,
    }),
  },
  created() {
    const unit = this.findUnit(this.$route.params.id)
    if (!unit) return this.$router.push('/not-found')
    this.coverImageIndex = unit.coverImage
    this.imageIndexes = unit.images
    this.loadData(unit);
  },
  methods: {
    loadData(unit) {
      axios
        .get(`https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${unit.page_title}`)
        .then(res => {
          const filtered = this.filterWikiSections(res.data.remaining.sections, unit.sections)

          this.data = {
            title: unit.name,
            wikiSections: filtered,
            country: unit.country,
            fullUrl: `${this.wikiBaseUrl}wiki/${unit.page_title}`
          }
        })
        .catch(err => console.error('err', err))
        .then(() => this.loading = false)
    },
    findUnit(id) {
      return units.find(unit => unit.id == id)
    },
    filterWikiSections(wikiSections, sectionNumbers) {
      return wikiSections.filter(function(el){
          return ~sectionNumbers.indexOf(el.id);
      });
    }
  }
};
</script>
