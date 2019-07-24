<template>
  <div class="o-content-container">
    <slot />
  </div>
</template>

<style lang="scss">
.o-content-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}
</style>

<script>
export default {
  name: 'o-content-container',

}
</script>
