<template>
  <div class="chart-summary-left">
    <div class="chart-container">
      <v-chart :option="chartOptions" autoresize></v-chart>
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
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useInstrumentStore } from '../../stores/useInstrumentStore';
import { use } from 'echarts/core';
import VChart from 'vue-echarts';
import {
  CanvasRenderer
} from 'echarts/renderers';
import {
  LineChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent
} from 'echarts/components';

// Registrar los componentes de ECharts necesarios
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
]);

export default defineComponent({
  name: 'ChartComponent',
  components: {
    VChart,
  },
  setup() {
    const instrumentStore = useInstrumentStore();
    const periods = ['1D', '1S', '1M', '3M', '6M', '1A', '5A'];
    const chartOptions = ref({
      title: {
        text: 'Evolución del Índice',
        left: 'center',
        textStyle: {
          color: '#ffffff'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLabel: {
          color: '#AAA',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#AAA',
        },
      },
      series: [
        {
          name: 'Valor',
          type: 'line',
          smooth: true,
          data: [],
          lineStyle: {
            color: '#4CAF50',
          },
          areaStyle: {
            color: 'rgba(76, 175, 80, 0.2)',
          },
        },
      ],
    });

    const initializeChart = () => {
      chartOptions.value.xAxis.data = instrumentStore.chartData.map(data => data.date);
      chartOptions.value.series[0].data = instrumentStore.chartData.map(data => data.value);
    };

    watch(
      () => instrumentStore.chartData,
      () => {
        initializeChart();
      },
      { deep: true }
    );

    onMounted(() => {
      initializeChart();
    });

    const changePeriod = (period) => {
      instrumentStore.setPeriod(period);
    };

    return {
      chartOptions,
      periods,
      selectedPeriod: ref(instrumentStore.period),
      changePeriod,
    };
  },
});
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
  background-color: #222;
  padding: 10px;
  border-radius: 8px;
}

.period-buttons {
  display: flex;
  margin-top: 10px;
}

.period-buttons button {
  background: #333;
  border: 1px solid #555;
  color: #fff;
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s, border-color 0.3s;
}

.period-buttons button.active {
  background-color: #4CAF50;
  color: #fff;
  border-color: #4CAF50;
}

.period-buttons button:hover {
  background-color: #4CAF50;
  color: #fff;
}
</style>
