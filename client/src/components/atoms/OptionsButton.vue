<template>
  <BaseActionButton :active="active">
    <svg
      version="1.1"
      :class="['a-icon__options', {'a-icon__options--active': active}]"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 200 53.8"
      style="enable-background:new 0 0 200 53.8;"
      xml:space="preserve"
    >
      <circle cx="26.9" cy="26.9" r="26.9"></circle>
      <circle cx="100" cy="26.9" r="26.9"></circle>
      <circle cx="173.1" cy="26.9" r="26.9"></circle>
    </svg>
  </BaseActionButton>
</template>

<style lang="scss">
.a-icon__options {
  padding: 6px;
  width: 100%;
  height: 100%;
  fill: white;
  transition: 0.3s cubic-bezier(0.694, 0, 0.335, 1);
  transition-property: transform, fill;
  &:hover {
    transform: rotate(90deg);
  }
}
.a-icon__options--active {
  transform: rotate(90deg);
}
</style>


<script>
import BaseActionButton from "@/components/atoms/BaseActionButton.vue";

export default {
  name: "a-btn-options",
  components: {
    BaseActionButton
  },
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
};
</script>
