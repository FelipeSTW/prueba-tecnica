<script setup>
import { ref } from 'vue';
import SearchBarComponent from './components/searchcomponent/SearchBarComponent.vue';
import TabComponent from './components/tabcomponent/TabComponent.vue';
import HeaderComponent from './components/headercomponent/HeaderComponent.vue';
import ChartComponent from './components/chartcomponent/ChartComponent.vue';
import InstrumentListComponent from './components/instrumentlistcomponent/InstrumentListComponent.vue';
import SummaryComponent from './components/summarycomponent/SummaryComponent.vue';

// Estado de búsqueda
const searchQuery = ref('');
function handleSearch(query) {
  searchQuery.value = query;
  console.log('Buscar instrumento:', query);
}

// Estado para el índice seleccionado en Tab
const selectedIndex = ref('IPSA');
function handleTabSelected(index) {
  selectedIndex.value = index;
  console.log('Índice seleccionado:', index);
}

// Variables para los datos del índice en el Header
const indexName = ref('IPSA');
const currentValue = ref(6474.37);
const variationPercent = ref(-0.78);
const variationPoints = ref(-51.01);

// Datos simulados para el gráfico en ChartComponent
const chartData = ref([
  { date: '2023-01-01', value: 6500 },
  { date: '2023-02-01', value: 6600 },
  { date: '2023-03-01', value: 6700 },
  { date: '2023-04-01', value: 6800 },
]);

// Período seleccionado para ChartComponent
const selectedPeriod = ref('1D');
function handlePeriodChanged(period) {
  selectedPeriod.value = period;
  console.log('Período seleccionado:', period);
}

// Datos de ejemplo para los instrumentos
const instruments = ref([
  { id: 1, name: 'AGUAS-A', last: 272.00, amount: 104.47, varDay: 0.08, var30d: 0.37, varYear: -4.63, var12m: 1.52 },
  { id: 2, name: 'ANDINA-B', last: 2802.00, amount: 274.29, varDay: -0.65, var30d: 3.24, varYear: 20.65, var12m: 15.98 },
  { id: 3, name: 'BCI', last: 28400.00, amount: 469.12, varDay: 0.85, var30d: 5.6, varYear: 25.67, var12m: 12.34 },
  { id: 1, name: 'SANTANDER', last: 272.00, amount: 104.47, varDay: 0.08, var30d: 0.37, varYear: -4.63, var12m: 1.52 },
  { id: 2, name: 'CAP', last: 2802.00, amount: 274.29, varDay: -0.65, var30d: 3.24, varYear: 20.65, var12m: 15.98 },
  { id: 3, name: 'CCU', last: 28400.00, amount: 469.12, varDay: 0.85, var30d: 5.6, varYear: 25.67, var12m: 12.34 },
  { id: 1, name: 'CENCOMALLS', last: 272.00, amount: 104.47, varDay: 0.08, var30d: 0.37, varYear: -4.63, var12m: 1.52 },
  { id: 2, name: 'CENCOSUD', last: 2802.00, amount: 274.29, varDay: -0.65, var30d: 3.24, varYear: 20.65, var12m: 15.98 },
  { id: 3, name: 'CHILE', last: 28400.00, amount: 469.12, varDay: 0.85, var30d: 5.6, varYear: 25.67, var12m: 12.34 },
  // Agrega más instrumentos según sea necesario
]);

// Función para manejar el evento cuando se selecciona un instrumento
function handleInstrumentSelected(instrument) {
  console.log('Instrumento seleccionado:', instrument);
  // Aquí puedes actualizar el estado global o realizar alguna acción con el instrumento seleccionado
}
</script>

<template>
  <div>
    <!-- Barra de búsqueda -->
    <SearchBarComponent @search="handleSearch" />
    <p v-if="searchQuery">Mostrando resultados para: "{{ searchQuery }}"</p>

    <!-- Componente de Tabs para cambiar el índice -->
    <TabComponent @tab-selected="handleTabSelected" />
    <p>Índice actual: {{ selectedIndex }}</p>

    <!-- Header que muestra el índice seleccionado -->
    <HeaderComponent
      :indexName="indexName"
      :currentValue="currentValue"
      :variationPercent="variationPercent"
      :variationPoints="variationPoints"
    />

    <!-- Contenedor que alinea el gráfico y el resumen en fila -->
    <div class="chart-summary-container">
      <!-- Gráfico del índice -->
      <ChartComponent
        :chartData="chartData"
        :selectedPeriod="selectedPeriod"
        @period-changed="handlePeriodChanged"
      />

      <!-- Resumen de la cotización a la derecha del gráfico -->
      <SummaryComponent />
    </div>

    <!-- Lista de instrumentos -->
    <InstrumentListComponent
      :instruments="instruments"
      @instrument-selected="handleInstrumentSelected"
    />
  </div>
</template>

<style scoped>
.chart-summary-container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.ChartComponent {
  flex: 3; /* Da más espacio al gráfico */
}

.SummaryComponent {
  flex: 1; /* Da menos espacio al resumen */
}

div {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
