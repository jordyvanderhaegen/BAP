<template>
  <BaseActionButton>
    <svg
      version="1.1"
      class="a-icon__close"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 200 200"
      style="enable-background:new 0 0 200 200;"
      xml:space="preserve"
    >
      <line class="st0" x1="0" y1="0" x2="200" y2="200"></line>
      <line class="st0" x1="200" y1="0" x2="0" y2="200"></line>
    </svg>
  </BaseActionButton>
</template>

<style lang="scss">
.a-icon__close {
  padding: 10px;
  width: 100%;
  height: 100%;
  stroke: white;
  transition: 0.3s cubic-bezier(0.694, 0, 0.335, 1);
  transition-property: transform, stroke;
  .st0 {
    stroke-width: 25;
    stroke-miterlimit: 10;
  }
}
</style>


<script>
import BaseActionButton from "@/components/atoms/BaseActionButton.vue";

export default {
  name: "a-btn-close",
  components: {
    BaseActionButton
  }
};
</script>
