<template>
  <div class="summary-component">
    <div class="header">
      <span>Cotización</span>
      <span>{{ date }}</span>
    </div>
    <div class="market-details">
      <div class="detail">
        <span>MERCADO</span>
        <span>Bola de Santiago</span>
      </div>
      <div class="detail">
        <span>APERTURA</span>
        <span>{{ formatCurrency(opening) }}</span>
      </div>
      <div class="detail">
        <span>CIERRE ANTERIOR</span>
        <span>{{ formatCurrency(previousClose) }}</span>
      </div>
      <div class="detail">
        <span>MÁXIMO DIARIO</span>
        <span>{{ formatCurrency(dailyHigh) }}</span>
      </div>
      <div class="detail">
        <span>MÍNIMO DIARIO</span>
        <span>{{ formatCurrency(dailyLow) }}</span>
      </div>
      <div class="detail">
        <span>MÁXIMO 52 SEMANAS</span>
        <span>{{ formatCurrency(weekly52High) }}</span>
      </div>
      <div class="detail">
        <span>MÍNIMO 52 SEMANAS</span>
        <span>{{ formatCurrency(weekly52Low) }}</span>
      </div>
    </div>
    <div class="variation-section">
      <div class="variation-header">Variación**</div>
      <div class="variation-details">
        <div
          class="variation-item"
          v-for="(value, label) in variations"
          :key="label"
        >
          <span>{{ label }}</span>
          <span :class="{ positive: value >= 0, negative: value < 0 }">{{
            formatPercentage(value)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SummaryComponent",
  props: {
    date: {
      type: String,
      default: "06/11/2024 - 12:02:07 p. m.",
    },
    opening: {
      type: Number,
      default: 6525.38,
    },
    previousClose: {
      type: Number,
      default: 6525.38,
    },
    dailyHigh: {
      type: Number,
      default: 6526.38,
    },
    dailyLow: {
      type: Number,
      default: 6469.32,
    },
    weekly52High: {
      type: Number,
      default: 6839.39,
    },
    weekly52Low: {
      type: Number,
      default: 5589.23,
    },
    variations: {
      type: Object,
      default: () => ({
        "1 MES": 0.03,
        "1 AÑO": 16.16,
        "AÑO A LA FECHA": 5.29,
      }),
    },
  },
  methods: {
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },
    formatPercentage(value) {
      return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
    },
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
  width: 250px;
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
