<template>
    <div class="header">
      <div class="header-title">
        <h1>{{ indexName }}</h1>
        <span class="current-value">{{ currentValue }}</span>
      </div>
      <div class="variations">
        <div class="variation">
          <span>Var. % Actual:</span>
          <span :class="getVariationClass(variationPercent)">{{ variationPercent }}%</span>
        </div>
        <div class="variation">
          <span>Var. Puntos Actual:</span>
          <span :class="getVariationClass(variationPoints)">{{ variationPoints }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
    props: {
      indexName: {
        type: String,
        default: 'IPSA',
      },
      currentValue: {
        type: Number,
        default: 0,
      },
      variationPercent: {
        type: Number,
        default: 0,
      },
      variationPoints: {
        type: Number,
        default: 0,
      },
    },
    methods: {
      getVariationClass(value) {
        return value > 0 ? 'positive' : value < 0 ? 'negative' : '';
      },
    },
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #222;
    color: #fff;
    border-radius: 4px;
    margin: 0;
  }
  
  .header-title {
    display: flex;
    flex-direction: column;
  }
  
  .current-value {
    font-size: 24px;
    font-weight: bold;
  }
  
  .variations {
    display: flex;
    gap: 20px;
  }
  
  .variation {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .positive {
    color: #4caf50; /* Verde */
  }
  
  .negative {
    color: #f44336; /* Rojo */
  }
  </style>
  