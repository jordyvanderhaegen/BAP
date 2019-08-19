<template>
  <BaseActionButton>
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 20.8 20.8"
      style="enable-background:new 0 0 20.8 20.8;"
      xml:space="preserve"
      class="a-icon__next"
    >
      <line class="arrow-line" id="Line_26" x1="13" y1="10.6" x2="0" y2="10.6" />
      <path class="arrow-head" id="play" d="M13,10.4V5.9l3.9,2.3l3.9,2.3l-3.9,2.3L13,14.9V10.4z" />
    </svg>
  </BaseActionButton>
</template>

<style lang="scss">
.a-icon__next {
    padding: 7px;
    width: 100%;
    height: 100%;
    stroke: white;
    fill: white;
    transition: 0.3s all cubic-bezier(0.694, 0, 0.335, 1);
    .arrow-line {
        stroke-width: 2;
        stroke-miterlimit: 10;
    }
}
</style>


<script>
import BaseActionButton from "@/components/atoms/BaseActionButton.vue";

export default {
  name: "a-btn-next",
  components: {
    BaseActionButton
  }
};
</script>
