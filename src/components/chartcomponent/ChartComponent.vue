<template>
    <div class="chart-summary-left">
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
      </div>
      <div class="period-buttons">
          <button
            v-for="period in periods"
            :key="period"
            :class="{ active: period === selectedPeriod }"
            @click="changePeriod(period)"
          >
            {{ period }}
          </button>
        </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'ChartComponent',
    props: {
      chartData: {
        type: Array,
        default: () => [
          { date: '2023-01-01', value: 6400 },
          { date: '2023-02-01', value: 6450 },
          { date: '2023-03-01', value: 6600 },
          { date: '2023-04-01', value: 6700 },
          { date: '2023-05-01', value: 6800 },
          { date: '2023-06-01', value: 6900 },
        ],
      },
      selectedPeriod: {
        type: String,
        default: '1D',
      },
    },
    setup(props, { emit }) {
      const chartCanvas = ref(null);
      const chartInstance = ref(null);
      const periods = ['1D', '1S', '1M', '3M', '6M', '1A', '5A'];
  
      const initializeChart = () => {
        if (chartInstance.value) {
          chartInstance.value.destroy();
        }
        chartInstance.value = new Chart(chartCanvas.value, {
          type: 'line',
          data: {
            labels: props.chartData.map(data => data.date),
            datasets: [
              {
                label: 'Evolución del Índice',
                data: props.chartData.map(data => data.value),
                borderColor: '#4CAF50', // Color de la línea del gráfico
                backgroundColor: 'rgba(76, 175, 80, 0.2)', // Fondo debajo de la línea
                fill: true,
                tension: 0.4, // Suavidad de la curva
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'month', // Escala de tiempo en meses
                  tooltipFormat: 'MMM yyyy', // Formato de la fecha en el tooltip
                },
                grid: {
                  display: false, // Quita líneas de cuadrícula en X
                },
                ticks: {
                  color: '#AAA', // Color del texto en X
                },
              },
              y: {
                grid: {
                  color: '#444', // Color de las líneas de cuadrícula en Y
                },
                ticks: {
                  color: '#AAA', // Color del texto en Y
                },
              },
            },
            plugins: {
              legend: {
                display: false, // Oculta la leyenda
              },
              tooltip: {
                callbacks: {
                  label: (context) => `Valor: ${context.parsed.y}`, // Formato del tooltip para el valor
                },
              },
            },
            elements: {
              point: {
                radius: 0, // Oculta los puntos de datos para que la línea sea continua
              },
            },
          },
        });
      };
  
      const changePeriod = (period) => {
        emit('period-changed', period);
      };
  
      onMounted(() => {
        initializeChart();
      });
  
      watch(() => props.chartData, () => {
        initializeChart();
      });
  
      return {
        chartCanvas,
        periods,
        selectedPeriod: ref(props.selectedPeriod),
        changePeriod,
      };
    },
  };
  </script>
  
  <style scoped>
  .chart-summary-container {
    display: flex;
  }

  .chart-summary-left {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .chart-container {
    position: relative;
    height: 400px;
    width: 700px;
    background-color: #222; /* Fondo oscuro del contenedor */
    padding: 10px;
    border-radius: 8px;
  }
  
  .period-buttons {
    display: flex;
    margin-top: 10px;
  }
  
  .period-buttons button {
    background: #333; /* Fondo oscuro para los botones */
    border: 1px solid #555; /* Bordes de los botones */
    color: #fff;
    margin: 0 5px;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    transition: background-color 0.3s, border-color 0.3s;
  }
  
  .period-buttons button.active {
    background-color: #4CAF50; /* Verde para el botón activo */
    color: #fff;
    border-color: #4CAF50;
  }
  
  .period-buttons button:hover {
    background-color: #4CAF50;
    color: #fff;
  }
  </style>
  