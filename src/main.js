import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa los estilos globales de Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Importa los íconos de Material Design

// Importa todos los componentes y directivas de Vuetify
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import axios from 'axios';
import App from './App.vue';

// Inicializa Vuetify con componentes y directivas
const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

// Crea la instancia de Vue
const app = createApp(App);

// Utiliza Pinia y Vuetify
app.use(vuetify);
app.use(pinia);

// Hace que axios esté disponible globalmente
app.config.globalProperties.$axios = axios;

// Monta la aplicación
app.mount('#app');
