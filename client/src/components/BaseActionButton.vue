<template>
  <div class="btn btn__action" />
</template>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
}
.btn__action {
  border: 1px solid $background-color-secondary;
  box-shadow: 0 0 1px 0px white inset, 0 0 1px 0px white;
  border-radius: 50%;
  @include square(30px);
  transition: .3s background-color cubic-bezier(.694,0,.335,1);
  &:hover {
    background-color: $background-color-secondary;
  }
}
</style>
