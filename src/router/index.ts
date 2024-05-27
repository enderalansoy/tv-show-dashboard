import { createRouter, createWebHistory } from 'vue-router';
import Details from '../views/Details.vue';
import Home from '../views/Home.vue';

/**
 * Defining an array of route objects.
 * Each object represents a route in the application.
 * @property {string} path - The path for the route.
 * @property {string} name - The name of the route.
 * @property {typeof import("vue").default} component - The component to be rendered for the route.
 * @property {boolean} props - Indicates whether route props should be passed to the component.
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/show/:id',
    name: 'Details',
    component: Details,
    props: true,
  },
];

/**
 * Creating a new router instance using the createRouter function.
 * @param {Object} options - The options for the router instance.
 * @param {import("vue-router").History} options.history - The history implementation for the router.
 * @param {import("vue-router").RouteRecordRaw[]} options.routes - The array of route objects.
 * @returns {import("vue-router").Router} - The created router instance.
 */

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
