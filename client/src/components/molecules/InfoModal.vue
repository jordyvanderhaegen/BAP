<template>
  <div class="m-info-modal">
    <ContentModal>
      <h3 class="a-modal__title">Atlantic wall.</h3>
      <p class="a-modal__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, placeat laudantium doloribus sed, omnis aut explicabo atque odit tenetur recusandae officia consequuntur sequi distinctio delectus molestiae. Adipisci officiis totam magnam!Laboriosam ullam eos harum nisi atque minima quidem veritatis ipsum voluptates deserunt dolor autem quae esse, velit est obcaecati, maiores provident inventore earum amet officiis rerum dolore. Non, nulla rem!</p>
      <ProgressBar :percentage="20"/>
    </ContentModal>
  </div>
</template>

<style lang="scss">

</style>

<script>
import ContentModal from '@/components/molecules/ContentModal.vue';
import ProgressBar from '@/components/molecules/ProgressBar.vue';

export default {
  name: 'm-info-modal',
  components: {
    ContentModal,
    ProgressBar,
  },
}
</script>
