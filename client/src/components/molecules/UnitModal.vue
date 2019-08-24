<template>
  <ContentModal>
    <h3 class="a-modal__title">{{ unit.name }}</h3>
    <p class="a-modal__synopsis"></p>
    <p class="a-modal__description">{{ description }}</p>
    <div class="m-modal__actions">
      <OptionsButton />
      <WikipediaButton />
      <CloseButton @click.native="hideModal()" />
    </div>
  </ContentModal>
</template>

<style lang="scss">
.m-modal__actions {
  display: flex;
  justify-content: center;
  margin-top: $space-sm;
  .a-btn__action {
    margin: rem(0px) rem(8px);
  }
}
</style>

<script>
import ContentModal from '@/components/molecules/ContentModal.vue';
import CloseButton from '@/components/atoms/CloseButton.vue';
import OptionsButton from '@/components/atoms/OptionsButton.vue';
import WikipediaButton from '@/components/atoms/WikipediaButton.vue';
import { mapMutations, mapState, mapGetters } from 'vuex';

export default {
  name: 'UnitModal',
  components: {
    ContentModal,
    CloseButton,
    OptionsButton,
    WikipediaButton,
  },
  data() {
    return {
      unit: null,
      description: null,
    }
  },
  methods: {
    ...mapMutations('modal', ['hideModal']),
  },
  computed: {
    ...mapState('modal', ['referenceId']),
    ...mapGetters('unit', ['getById'])
  },
  created() {
    this.unit = this.getById(this.referenceId)
    // Create wikipedia API request
    fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${this.unit.page_id}`)
      .then(res => { return res.json() })
      .then(json => {
        this.description = json.query.pages[this.unit.page_id].extract
      })
  },
}
</script>