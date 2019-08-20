<template>
  <div
    class="p-home"
    :style="{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${require('@/assets/img/46.jpg')}) `}"
  >
    <div class="u-container p-home__content">
      <h1 class="p-home__title">Landing in Normandië</h1>
      <p class="p-home__description">Ontdek de succesvolle invasie tijdens de Tweede Wereldoorlog door de westerse geallieerden in het door Duitsland bezette West-Europa.
        Deze operatie, verspreid over 85 dagen, toont het verloop van alle betrokken troepen. 
        Kijk naar hoe dit verhaal ontplooit of ontdek zelf hoe verschillende troepen zich van dag tot dag verplaatsen.
      </p>
      <div class="p-home__actions">
        <router-link to="/discover" class="a-btn--primary">Discover</router-link>
        <router-link to="/adventure" class="a-btn--primary">Storytelling</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.p-home {
  display: flex;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
}
.p-home__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: $white;
}

.p-home__title {
  font-size: 5em;
  margin-bottom: 0;
}

.p-home__description {
  line-height: 1.9;
  font-weight: 600;
}

.p-home__actions {
  margin-top: rem(30px);
  a {
    margin-right: $space-sm;
  }
}
</style>


<script>
export default {
  name: "home"
};
</script>
