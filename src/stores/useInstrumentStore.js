import { defineStore } from 'pinia';
import axios from 'axios'; // Asegúrate de instalar axios

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
    async fetchInstruments() {
      try {
        const response = await axios.get('/src/servicios/constituyentes/constituensList.json');
        if (response.data.success) {
          this.instruments = response.data.data.constituents;
        }
      } catch (error) {
        console.error('Error al cargar los instrumentos:', error);
      }
    },
    setSelectedInstrument(instrument) {
      this.selectedInstrument = instrument;
    },
    setPeriod(newPeriod) {
      this.period = newPeriod;
    },
    setSelectedIndex(newIndex) {
      this.selectedIndex = newIndex;
    }
  }
});

