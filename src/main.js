import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue';

const app = createApp(App);

// Crear y usar Pinia
const pinia = createPinia();
app.use(pinia);

// Crear y usar Vuetify
const vuetify = createVuetify();
app.use(vuetify);

// Montar la aplicación
app.mount('#app');


