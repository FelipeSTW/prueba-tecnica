<template>
    <div class="instrument-item">
      <div class="instrument-name">{{ instrument.name }}</div>
      <div class="instrument-last">{{ formatCurrency(instrument.last) }}</div>
      <div class="instrument-amount">{{ formatCurrency(instrument.amount) }}</div>
      <div :class="['instrument-change', { positive: instrument.varDay >= 0, negative: instrument.varDay < 0 }]">
        {{ formatPercentage(instrument.varDay) }}
      </div>
      <div :class="['instrument-change', { positive: instrument.var30d >= 0, negative: instrument.var30d < 0 }]">
        {{ formatPercentage(instrument.var30d) }}
      </div>
      <div :class="['instrument-change', { positive: instrument.varYear >= 0, negative: instrument.varYear < 0 }]">
        {{ formatPercentage(instrument.varYear) }}
      </div>
      <div :class="['instrument-change', { positive: instrument.var12m >= 0, negative: instrument.var12m < 0 }]">
        {{ formatPercentage(instrument.var12m) }}
      </div>
    </div>
  </template>
  
  <script>
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
    },
  };
  </script>
  
  <style scoped>
  .instrument-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    border-bottom: 1px solid #333;
  }
  .instrument-name {
    width: 14%;
    font-weight: bold;
    text-align: left;
  }
  .instrument-last, .instrument-amount, .instrument-change {
    width: 14%;
    text-align: right;
  }
  .instrument-change.positive {
    color: #4CAF50; /* Verde para cambios positivos */
  }
  .instrument-change.negative {
    color: #F44336; /* Rojo para cambios negativos */
  }
  </style>
  