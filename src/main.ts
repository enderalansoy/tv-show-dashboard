import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import toast from './plugins/toast';
import ToastContainer from './components/ToastContainer.vue';
import { FontAwesomeIcon } from './plugins/font-awesome';

/**
 * Creates and configures a new Vue.js application instance.
 *
 * @param {import('vue').Component} App - The main Vue.js component.
 * @returns {import('vue').App<Element>} - The configured Vue.js application instance.
 */
const app = createApp(App);

/**
 * Installs the Vue Router plugin into the Vue.js application instance.
 *
 * @param {import('vue-router').Router} router - The Vue Router instance.
 */
app.use(router);

/**
 * Installs the custom toast plugin into the Vue.js application instance.
 *
 * @param {import('./plugins/toast').default} toast - The custom toast plugin.
 */
app.use(toast);

/**
 * Registers a global component 'ToastContainer' in the Vue.js application instance.
 *
 * @param {typeof import('./components/ToastContainer.vue').default} ToastContainer - The ToastContainer component.
 */
app.component('ToastContainer', ToastContainer);

/**
 * Registers a global component 'FontAwesomeIcon' in the Vue.js application instance.
 *
 * @param {typeof import('./plugins/font-awesome').FontAwesomeIcon} FontAwesomeIcon - The FontAwesomeIcon component.
 */
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
