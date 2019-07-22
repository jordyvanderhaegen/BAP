import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/HomeView.vue'),
      children: [
        {
          path: '/unitp/:id',
          name: 'unitp',
          components: {
            page: () => import('./views/HomeView.vue'),
            unit: () => import('./views/UnitDetail.vue'),
          },
          meta: {
            showModal: true
          }
        },
        {
          path: '/timeline/story/:id',
          name: 'story',
          components: {
            page: () => import('./views/HomeView.vue'),
            story: () => import('./components/molecules/TimelineStory.vue'),
          },
          meta: {
            showModal: true
          }
        },
        {
          path: '/timeline/chapter/:id',
          name: 'chapter',
          components: {
            page: () => import('./views/HomeView.vue'),
            story: () => import('./components/molecules/TimelineChapter.vue'),
          },
          meta: {
            showModal: true
          }
        }
      ]
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
