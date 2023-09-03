import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import './vue3-burger-menu.css';
import store from '@/store'; 


const app = createApp(App).use(router);
app.use(router);
app.mount('#app');
app.use(store); 