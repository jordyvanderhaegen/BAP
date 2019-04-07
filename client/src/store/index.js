import Vuex from 'vuex';
import Vue from 'vue';
import ui from './modules/ui';
import chapters from './modules/chapters';
import troops from './modules/troops';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui,
    chapters,
    troops,
  },
});
