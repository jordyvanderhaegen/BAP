<template>
  <header class="menu">
    <h1 class="menu__title">Menu</h1>
  </header>
</template>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 108px;
  height: 100vh;
  background: rgba(31,35,43,0.94);
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu__title {
  color: $text-color-secondary;
  font-size: rem(30px);
  transform: rotate(-90deg);
}
</style>

<script>
export default {
  name: 'app-menu',
};
</script>
