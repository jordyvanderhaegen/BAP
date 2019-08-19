<template>
  <!-- <div>
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
  </div> -->
  <div class="l-unit-detail">
    <div class="l-unit-detail__img">
      <EventImage
        v-if="coverImageIndex"
        :imageIndex="coverImageIndex"
      />
    </div>
    <div class="l-unit-detail__intro">
      <CloseButton 
        @click.native="$router.go(-1)"
        class="l-unit-detail__close" />
      <UnitIntro
        v-if="data"
        :data="data"
      />
    </div>
    <div class="l-unit-detail__images">
      <ImageGridList
        v-if="imageIndexes && imageIndexes.length"
        :images="imageIndexes"
      />
    </div>
  </div>
</template>

<style lang="scss">
.l-unit-detail {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @include at($screen-lg) {
    flex-direction: row;
  }

}
.l-unit-detail__img {
  height: 75vh;

  @include at($screen-lg) {
    width: 40%;
    padding: rem($space-xl) rem($space-md);
    height: 100vh;
  }

}

.l-unit-detail__intro {
  padding: rem($space-md) rem($space-xs);

  @include at($screen-lg) {
    padding: rem($space-md);
    width: 60%;
    display: flex;
    flex-direction: column;
  }

}

.l-unit-detail__close {
  position: absolute;
  top: 0;
  right: 0;
  margin: rem($space-xs);

  @include at($screen-lg) {
    margin: 0;
    position: relative;
    align-self: flex-end;
  }

}
.l-unit-detail__images {
  width: 100%;
  padding: rem($space-md) 0;
  @include at($screen-lg) {
    padding: rem($space-md) rem($space-xs);
  }
}
</style>

<script>
import axios from 'axios';
import units from '@/assets/data/units.json';
import EventImage from '@/components/molecules/EventImage.vue';
import ImageGridList from '@/components/molecules/ImageGridList.vue';
import UnitIntro from '@/components/molecules/UnitIntro.vue';
import CloseButton from '@/components/atoms/CloseButton.vue';
import { mapState } from 'vuex';

export default {
  name: 't-unit',
  components: {
    EventImage,
    UnitIntro,
    ImageGridList,
    CloseButton,
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
