import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import axios from 'axios';
import App from './App.vue';

const vuetify = createVuetify();
const pinia = createPinia();

const app = createApp(App);
app.use(vuetify);
app.use(pinia);
app.config.globalProperties.$axios = axios; // Hace que axios esté disponible globalmente
app.mount('#app');

