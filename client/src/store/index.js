import Vuex from 'vuex';
import Vue from 'vue';
import ui from './modules/ui';
import chapters from './modules/chapters';
import timeline from './modules/timeline';
import modal from './modules/modal';
import unit from './modules/unit';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui,
    chapters,
    timeline,
    modal,
    unit,
  },
});
