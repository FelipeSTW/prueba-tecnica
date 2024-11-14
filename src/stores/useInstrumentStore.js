import { defineStore } from 'pinia';
import axios from 'axios';

export const useInstrumentStore = defineStore('instrument', {
  state: () => ({
    selectedInstrument: null,
    selectedIndex: 'IPSA',
    period: '1D',
    instruments: [], // Lista de instrumentos
    summaryData: {}, // Detalle del instrumento seleccionado
    chartData: [], // Datos del gráfico
  }),
  actions: {
    async fetchInstruments() {
      try {
        const response = await axios.get('/src/servicios/constituyentes/constituensList.json');
        if (response.data.success) {
          this.instruments = response.data.data.constituents.map(instrument => ({
            id: instrument.codeInstrument,
            name: instrument.shortName,
            last: instrument.lastPrice,
            amount: instrument.volumeMoney / 1000000, // Suponiendo que 'amount' es 'volumeMoney' en millones
            varDay: instrument.pctDay,
            var30d: instrument.pct30D,
            varYear: instrument.pctCY,
            var12m: instrument.pct1Y,
          }));
        }
      } catch (error) {
        console.error('Error al cargar los instrumentos:', error);
      }
    },
    async fetchSummary(instrumentId) {
      try {
        const response = await axios.get(`/src/servicios/resumen/${instrumentId}.json`);
        if (response.data.success) {
          this.summaryData = response.data.data;
        }
      } catch (error) {
        console.error('Error al cargar el resumen del instrumento:', error);
      }
    },
    async fetchHistory(instrumentId) {
      try {
        const response = await axios.get(`/src/servicios/history/history-${instrumentId}.json`);
        if (response.data.success) {
          this.chartData = response.data.data.chart.map(dataPoint => ({
            date: dataPoint.datetimeLastPrice,
            value: dataPoint.lastPrice,
          }));
        }
      } catch (error) {
        console.error('Error al cargar los datos del historial del instrumento:', error);
      }
    },
    setSelectedInstrument(instrument) {
      this.selectedInstrument = instrument;
      this.fetchSummary(instrument.id); // Llamar a la API para el resumen del instrumento seleccionado
      this.fetchHistory(instrument.id); // Llamar a la API para el historial del gráfico
    },
    setPeriod(newPeriod) {
      this.period = newPeriod;
    },
    setSelectedIndex(newIndex) {
      this.selectedIndex = newIndex;
    }
  }
});
