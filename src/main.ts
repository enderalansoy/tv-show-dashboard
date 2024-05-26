import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import toast from './plugins/toast';
import ToastContainer from './components/ToastContainer.vue';
import { FontAwesomeIcon } from './plugins/font-awesome';

const app = createApp(App);

app.use(router);
app.use(toast);

app.component('ToastContainer', ToastContainer);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
