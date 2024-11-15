<template>
  <div class="instrument-item">
    <div class="instrument-name" @click="selectInstrument">{{ instrument.name }}</div>
    <div class="instrument-last">{{ formatCurrency(instrument.last) }}</div>
    <div class="instrument-amount">{{ formatCurrency(instrument.amount) }}</div>
    <div :class="['instrument-change', getChangeClass(instrument.varDay)]">
      {{ formatPercentage(instrument.varDay) }}
    </div>
    <div :class="['instrument-change', getChangeClass(instrument.var30d)]">
      {{ formatPercentage(instrument.var30d) }}
    </div>
    <div :class="['instrument-change', getChangeClass(instrument.varYear)]">
      {{ formatPercentage(instrument.varYear) }}
    </div>
    <div :class="['instrument-change', getChangeClass(instrument.var12m)]">
      {{ formatPercentage(instrument.var12m) }}
    </div>
  </div>
</template>

<script>
import { useInstrumentStore } from '../../stores/useInstrumentStore';

export default {
  name: 'InstrumentItemComponent',
  props: {
    instrument: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatCurrency(value) {
      return `$${value.toFixed(2)}`;
    },
    formatPercentage(value) {
      return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
    },
    getChangeClass(value) {
      if (value > 0) return 'positive';
      if (value < 0) return 'negative';
      return 'neutral';
    },
    selectInstrument() {
      const instrumentStore = useInstrumentStore();
      instrumentStore.setSelectedInstrument(this.instrument);
    },
  },
};
</script>

<style scoped>
.instrument-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #333;
  cursor: pointer;
}
.instrument-item:hover {
  background-color: #444; /* Color de fondo al pasar el ratón */
}
.instrument-name {
  width: 14%;
  font-weight: bold;
  text-align: left;
  color: white;
}
.instrument-last,
.instrument-amount,
.instrument-change {
  width: 14%;
  text-align: right;
}
.instrument-change.positive {
  color: #4CAF50; /* Verde para cambios positivos */
}
.instrument-change.negative {
  color: #F44336; /* Rojo para cambios negativos */
}
.instrument-change.neutral {
  color: #FFFFFF; /* Blanco para cambios neutros (0) */
}
</style>
