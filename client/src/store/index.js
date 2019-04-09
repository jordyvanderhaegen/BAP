import Vuex from 'vuex';
import Vue from 'vue';
import ui from './modules/ui';
import chapters from './modules/chapters';
import timeline from './modules/timeline';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui,
    chapters,
    timeline,
  },
});
