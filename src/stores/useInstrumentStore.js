import { defineStore } from 'pinia';

export const useInstrumentStore = defineStore('instrument', {
  state: () => ({
    selectedInstrument: null,
    selectedIndex: 'IPSA',
    period: '1D',
    instruments: [], // Lista de instrumentos
    summaryData: {}, // Detalle del instrumento seleccionado
    chartData: [] // Datos del gráfico
  }),
  actions: {
    setSelectedInstrument(instrument) {
      this.selectedInstrument = instrument;
      // Aquí podrías llamar un servicio para actualizar `summaryData` y `chartData`
    },
    setPeriod(newPeriod) {
      this.period = newPeriod;
    },
    setSelectedIndex(newIndex) {
      this.selectedIndex = newIndex;
      // Llama al servicio para obtener datos del nuevo índice
    }
  }
});
