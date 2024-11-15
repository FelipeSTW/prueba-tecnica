import { defineStore } from 'pinia';
import axios from 'axios';

export const useInstrumentStore = defineStore('instrument', {
  state: () => ({
    selectedInstrument: null,
    selectedIndex: 'IPSA',
    period: '1A', // Mostrar 1 año inicialmente
    instruments: [],
    summaryData: null, // Resumen del instrumento seleccionado
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
            amount: instrument.volumeMoney / 1000000,
            varDay: instrument.pctDay,
            var30d: instrument.pct30D,
            varYear: instrument.pctCY,
            var12m: instrument.pct1Y,
          }));

          // Si la lista de instrumentos tiene al menos un elemento, selecciona el primero
          if (this.instruments.length > 0) {
            this.setSelectedInstrument(this.instruments[0]);
          }
        }
      } catch (error) {
        console.error('Error al cargar los instrumentos:', error);
      }
    },
    async fetchSummary(instrumentId) {
      try {
        const response = await axios.get(`/src/servicios/resumen/${instrumentId}.json`);
        if (response.data.success) {
          const data = response.data.data.price;
          this.summaryData = {
            date: data.datetimeLastPrice,
            marketName: response.data.data.info.marketName,
            openPrice: data.openPrice,
            closePrice: data.closePrice,
            maxDay: data.maxDay,
            minDay: data.minDay,
            max52W: data.max52W,
            min52W: data.min52W,
            variations: {
              "1 MES": data.pct30D,
              "1 AÑO": data.pctRelW52,
              "AÑO A LA FECHA": data.pctRelCY,
            },
          };
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
      // Llamar a las acciones para cargar los datos necesarios
      this.fetchSummary(instrument.id);
      this.fetchHistory(instrument.id);
    },
    setPeriod(newPeriod) {
      this.period = newPeriod;
    },
    setSelectedIndex(newIndex) {
      this.selectedIndex = newIndex;
    },
  },
});
