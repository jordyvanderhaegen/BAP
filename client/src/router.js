import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import EventDetail from './views/EventDetail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/event/:id',
      name: 'event',
      component: EventDetail,
    },
    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/About.vue'),
    }, */
  ],
});
