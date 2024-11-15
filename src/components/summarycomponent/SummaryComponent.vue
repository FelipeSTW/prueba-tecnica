<template>
  <div class="summary-component" v-if="summaryData">
    <div class="header">
      <span>Cotización</span>
      <span>{{ summaryData.date }}</span>
    </div>
    <div class="market-details">
      <div class="detail">
        <span>MERCADO</span>
        <span>{{ summaryData.marketName }}</span>
      </div>
      <div class="detail">
        <span>APERTURA</span>
        <span>{{ formatCurrency(summaryData.openPrice) }}</span>
      </div>
      <div class="detail">
        <span>CIERRE ANTERIOR</span>
        <span>{{ formatCurrency(summaryData.closePrice) }}</span>
      </div>
      <div class="detail">
        <span>MÁXIMO DIARIO</span>
        <span>{{ formatCurrency(summaryData.maxDay) }}</span>
      </div>
      <div class="detail">
        <span>MÍNIMO DIARIO</span>
        <span>{{ formatCurrency(summaryData.minDay) }}</span>
      </div>
      <div class="detail">
        <span>MÁXIMO 52 SEMANAS</span>
        <span>{{ formatCurrency(summaryData.max52W) }}</span>
      </div>
      <div class="detail">
        <span>MÍNIMO 52 SEMANAS</span>
        <span>{{ formatCurrency(summaryData.min52W) }}</span>
      </div>
    </div>
    <div class="variation-section">
      <div class="variation-header">Variación**</div>
      <div class="variation-details">
        <div
          class="variation-item"
          v-for="(value, label) in summaryData.variations"
          :key="label"
        >
          <span>{{ label }}</span>
          <span :class="{ positive: value >= 0, negative: value < 0 }">{{ formatPercentage(value) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useInstrumentStore } from '../../stores/useInstrumentStore';
import { computed } from 'vue';

export default {
  name: "SummaryComponent",
  setup() {
    const instrumentStore = useInstrumentStore();

    const summaryData = computed(() => {
      return instrumentStore.summaryData;
    });

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
  width: 550px;
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
.detail {
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
}
.variation-section {
  margin-top: 16px;
}
.variation-header {
  font-weight: bold;
  margin-bottom: 8px;
}
.variation-details {
  display: flex;
  flex-direction: column;
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
