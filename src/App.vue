<script setup>
import { ref, onMounted } from 'vue';
import { useInstrumentStore } from './stores/useInstrumentStore';
import SearchBarComponent from './components/searchcomponent/SearchBarComponent.vue';
import TabComponent from './components/tabcomponent/TabComponent.vue';
import HeaderComponent from './components/headercomponent/HeaderComponent.vue';
import ChartComponent from './components/chartcomponent/ChartComponent.vue';
import InstrumentListComponent from './components/instrumentlistcomponent/InstrumentListComponent.vue';
import SummaryComponent from './components/summarycomponent/SummaryComponent.vue';

// Utilizamos el store de Pinia
const instrumentStore = useInstrumentStore();

// Llamamos a la acción para obtener los instrumentos desde el archivo JSON
onMounted(() => {
  instrumentStore.fetchInstruments();
});

// Métodos para manejar eventos
function handleSearch(query) {
  console.log('Buscar instrumento:', query);
  instrumentStore.searchQuery = query;
}

function handleTabSelected(index) {
  console.log('Índice seleccionado:', index);
  instrumentStore.setSelectedIndex(index);
}

function handlePeriodChanged(period) {
  console.log('Período seleccionado:', period);
  instrumentStore.setPeriod(period);
}

function handleInstrumentSelected(instrument) {
  console.log('Instrumento seleccionado:', instrument);
  instrumentStore.setSelectedInstrument(instrument);
}
</script>

<template>
  <v-app>
    <v-container>
      <!-- Aquí aseguramos que el evento esté correctamente vinculado -->
      <SearchBarComponent @search="handleSearch" />
    </v-container>

    <v-main>
      <!-- Componente de Tabs para cambiar el índice -->
      <p>Índice actual: {{ instrumentStore.selectedIndex }}</p>

      <!-- Header que muestra el índice seleccionado -->
      <HeaderComponent
        :indexName="instrumentStore.selectedIndex"
        :currentValue="instrumentStore.currentValue"
        :variationPercent="instrumentStore.variationPercent"
        :variationPoints="instrumentStore.variationPoints"
      />

      <!-- Contenedor que alinea el gráfico y el resumen en fila -->
      <div class="chart-summary-container">
        <!-- Gráfico del índice -->
        <ChartComponent
          :chartData="instrumentStore.chartData"
          :selectedPeriod="instrumentStore.period"
          @period-changed="handlePeriodChanged"
        />

        <!-- Resumen de la cotización a la derecha del gráfico -->
        <SummaryComponent :summaryData="instrumentStore.summaryData" />
      </div>

      <TabComponent @tab-selected="handleTabSelected" />

      <!-- Lista de instrumentos -->
      <InstrumentListComponent
        :instruments="instrumentStore.instruments"
        @instrument-selected="handleInstrumentSelected"
      />
    </v-main>
  </v-app>
</template>

<style scoped>
.chart-summary-container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: 20px;
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
