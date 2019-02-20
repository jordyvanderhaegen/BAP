<template>
  <div class="cont">
    <div class="timeline container">
      <div class="timeline__item row" v-for="(year, index) in years" :key="index">
        <div class="timeline__item__year col-1">
          <h3 class="year">{{year}}</h3>
        </div>
        <div class="col-11">
          <div class="row" v-for="(month, index) in months" :key="index">
            <div class="col-1">
              <h3 class="month">{{month}}</h3>
            </div>
            <div class="timeline__item__events col-9">
              <div class="row testerino" v-for="(number, index) in 5" :key="index">
                <div class="line"></div>
                <div class="dot" v-bind:class="{ 'dot-active': number > 2 }"></div>
                <div class="col-10">
                  <p
                    class="events__item"
                  >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis inventore quasi aliquam numquam laboriosam nam.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stickybits from "stickybits";
export default {
  data: () => {
    return {
      years: [2019, 2018, 2017],
      months: ["JAN", "FEB", "MAR"]
    };
  },
  mounted() {
    stickybits(".year", { useStickyClasses: true, /* stickyBitStickyOffset: 20 */ });
    stickybits(".month", { useStickyClasses: true });
    console.log("Component mounted.");
  }
};
</script>