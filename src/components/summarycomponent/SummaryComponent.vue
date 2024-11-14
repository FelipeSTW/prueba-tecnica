<template>
  <v-container v-if="summaryData">
    <v-row class="summary-header">
      <v-col>
        <span>Cotización: {{ summaryData.date }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="market-details">
          <v-card-title>{{ summaryData.marketName }}</v-card-title>
          <v-card-text>
            <div>
              <span>Apertura: {{ formatCurrency(summaryData.openPrice) }}</span>
            </div>
            <div>
              <span>Cierre Anterior: {{ formatCurrency(summaryData.closePrice) }}</span>
            </div>
            <div>
              <span>Máximo Diario: {{ formatCurrency(summaryData.maxDay) }}</span>
            </div>
            <div>
              <span>Mínimo Diario: {{ formatCurrency(summaryData.minDay) }}</span>
            </div>
            <div>
              <span>Máximo 52 Semanas: {{ formatCurrency(summaryData.max52W) }}</span>
            </div>
            <div>
              <span>Mínimo 52 Semanas: {{ formatCurrency(summaryData.min52W) }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="variation-section">
          <v-card-title>Variación</v-card-title>
          <v-card-text>
            <div
              class="variation-item"
              v-for="(value, label) in summaryData.variations"
              :key="label"
            >
              <span>{{ label }}</span>
              <span :class="{ positive: value >= 0, negative: value < 0 }">{{ formatPercentage(value) }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useInstrumentStore } from '../../stores/useInstrumentStore';
import { computed } from 'vue';

export default {
  name: "SummaryComponent",
  setup() {
    const instrumentStore = useInstrumentStore();

    const summaryData = computed(() => instrumentStore.summaryData);

    const formatCurrency = (value) => {
      if (value === null || value === undefined) return '-';
      return `$${value.toFixed(2)}`;
    };

    const formatPercentage = (value) => {
      if (value === null || value === undefined) return '-';
      return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
    };

    return {
      summaryData,
      formatCurrency,
      formatPercentage,
    };
  },
};
</script>

<style scoped>
.summary-component {
  background-color: #111;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 16px;
}
.market-details {
  border-bottom: 1px solid #444;
  padding-bottom: 16px;
  margin-bottom: 16px;
}
.variation-section {
  margin-top: 16px;
}
.variation-item {
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
}
.positive {
  color: #4caf50; /* Verde para valores positivos */
}
.negative {
  color: #f44336; /* Rojo para valores negativos */
}
</style>
