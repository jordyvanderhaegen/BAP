<template>
  <BaseActionButton>
    <svg
      version="1.1"
      class="a-icon a-icon__play"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 173.2 200"
      style="enable-background:new 0 0 173.2 200;"
      xml:space="preserve"
    >
      <polygon points="0,100 0,0 86.6,50 173.2,100 86.6,150 0,200"></polygon>
    </svg>
  </BaseActionButton>
</template>

<style lang="scss">
.a-icon__play {
  padding: 8px;
  width: 100%;
  height: 100%;
  padding-right: 5px;
  fill: white;
  transition: .3s fill cubic-bezier(.694,0,.335,1);
}

</style>


<script>
import BaseActionButton from '@/components/atoms/BaseActionButton.vue';

export default {
  name: 'a-btn-play',
  components: {
    BaseActionButton,
  }
};
</script>
