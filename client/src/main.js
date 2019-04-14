import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import moment from 'moment';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

/**
 * Global date formatter
 */
Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value), 'DD-MM-YYYY').format('MMM Do YY');
  }
})

/**
 * Global css reset
 */
import '@/assets/styles/vendors/_reset.scss'