<template>
  <div class="o-content-container">
    <slot />
  </div>
</template>

<style lang="scss">
.o-content-container {
  flex-grow: 1;
  max-height: 100vh;
  display: flex;
  align-items: flex-end;
}
</style>

<script>
export default {
  name: 'o-content-container',

}
</script>
