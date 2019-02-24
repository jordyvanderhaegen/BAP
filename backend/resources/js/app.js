
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './views/App';

/**
 * View components
 */
import EventDetailComponent from './components/EventDetailComponent';
import Home from './views/Home';
import Map from './views/Map';
import Intro from './views/Intro';

/**
 * Components
 */
import Flickity from 'vue-flickity';
import MapComponent from './components/MapComponent';
import MapOverlayComponent from './components/MapOverlayComponent';
import EventDetailSidebarComponent from './components/EventDetailSidebarComponent';

Vue.use(VueRouter);
Vue.component('map-component', MapComponent);
Vue.component('map-overlay-component', MapOverlayComponent);
Vue.component('event-detail-sidebar-component', EventDetailSidebarComponent);
Vue.component('flickity', Flickity);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Intro
        },
        {
            path: '/home',
            component: Home
        }, 
        {
            path: '/map',
            component: Map,
        }
    ]
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});

/* window.Vue = require('vue'); */

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/* Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('timeline-component', require('./components/TimelineComponent.vue').default);
Vue.component('map-component', require('./components/MapComponent.vue').default);
Vue.component('map-overlay-component', require('./components/MapOverlayComponent.vue').default);
Vue.component('event-detail-component', require('./components/EventDetailComponent.vue').default); */

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

/* const app = new Vue({
    el: '#app'
}); */


