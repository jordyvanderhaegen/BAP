<template>
  <BaseActionButton>
    <svg
      version="1.1"
      class="a-icon__pause"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 139.7 200"
      style="enable-background:new 0 0 139.7 200;"
      xml:space="preserve"
    >
      <g>
        <line class="st0" x1="29.5" y1="0" x2="29.5" y2="200"></line>
        <line class="st0" x1="110.1" y1="0" x2="110.1" y2="200"></line>
      </g>
    </svg>
  </BaseActionButton>
</template>

<style lang="scss">
.a-icon__pause {
  padding: 9px;
  width: 100%;
  height: 100%;
  stroke: white;
  transition: .3s stroke cubic-bezier(.694,0,.335,1);
  .st0 {
    stroke-width: 25;
    stroke-miterlimit: 10;
  }
}
</style>


<script>
import BaseActionButton from "@/components/atoms/BaseActionButton.vue";

export default {
  name: "a-btn-pause",
  components: {
    BaseActionButton
  }
};
</script>
