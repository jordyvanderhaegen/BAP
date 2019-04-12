<template>
  <UnitDetail />
</template>

<style lang="scss">

</style>

<script>
import UnitDetail from '@/components/templates/UnitDetail.vue';

export default {
  name: 'unit-detail',
  components: {
    UnitDetail,
  },
  data() {
    return {
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/NormandySupply_edit.jpg/1200px-NormandySupply_edit.jpg',
    };
  },
};
</script>