import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/event/:id',
      name: 'event',
      component: () => import('./views/EventDetail.vue'),
    },
    {
      path: '/unit/:id',
      name: 'unit',
      component: () => import('./views/UnitDetail.vue'),
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('./views/Discover.vue'),
    },
    {
      path: '/adventure',
      name: 'adventure',
      component: () => import('./views/Adventure.vue'),
    },
    {
      path: "*",
      name: 'not-found',
      component: () => import('./views/PageNotFoundView.vue'),
    }
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
