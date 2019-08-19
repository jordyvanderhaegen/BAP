<template>
  <BaseActionButton>
    <svg
      version="1.1"
      class="a-icon__restart"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 200 200"
      style="enable-background:new 0 0 200 200;"
      xml:space="preserve"
    >
      <path
        class="st0"
        d="M186.7,100L200,35.6l-21,6.9c-18.5-26-47.9-41.4-80.2-41.4C44.3,1.2,0,45.5,0,100s44.3,98.8,98.8,98.8
		c20.2,0,39.6-6,56.1-17.5l-12.5-18c-12.9,8.9-27.9,13.6-43.6,13.6C56.4,176.9,22,142.4,22,100s34.5-76.9,76.9-76.9
		c22.8,0,43.7,9.9,58.2,26.8l-19.4,6.4L186.7,100z"
      ></path>
    </svg>
  </BaseActionButton>
</template>

<style lang="scss">
.a-icon__restart {
  padding: 9px;
  width: 100%;
  height: 100%;
  fill: white;
  transition: 0.3s cubic-bezier(0.694, 0, 0.335, 1);
  transition-property: fill, transform;
  &:hover {
    transform: rotate(90deg);
  }
}
</style>


<script>
import BaseActionButton from "@/components/atoms/BaseActionButton.vue";

export default {
  name: "a-btn-restart",
  components: {
    BaseActionButton
  }
};
</script>
