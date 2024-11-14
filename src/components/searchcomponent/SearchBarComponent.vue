<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      @input="emitSearch"
      placeholder="Buscar un instrumento"
      class="search-input"
    />
    <ul v-if="searchQuery.length >= 2" class="list-result">
      <li v-for="instrument in filteredInstruments" :key="instrument.codeInstrument" @click="selectInstrument(instrument)">
        {{ instrument.name }} - Último: {{ formatLastPrice(instrument.lastPrice) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useInstrumentStore } from '../../stores/useInstrumentStore';
import { computed, ref, onMounted } from 'vue';

export default {
  name: 'SearchBarComponent',
  setup() {
    // Asegúrate de que Pinia ya esté configurada antes de usar el store
    const instrumentStore = useInstrumentStore();

    // Aquí puedes llamar a métodos del store, como fetchInstruments
    onMounted(() => {
      instrumentStore.fetchInstruments();
    });

    const searchQuery = ref('');

    const filteredInstruments = computed(() => {
      if (!searchQuery.value) {
        return instrumentStore.instruments;
      }
      return instrumentStore.instruments.filter((instrument) =>
        instrument.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const emitSearch = () => {
      console.log('Buscar instrumento:', searchQuery.value);
    };

    const selectInstrument = (instrument) => {
      instrumentStore.setSelectedInstrument(instrument);
      searchQuery.value = ''; // Limpiar la búsqueda después de seleccionar un instrumento
    };

    // Formatear el precio del instrumento de forma segura
    const formatLastPrice = (price) => {
      if (price === null || price === undefined) {
        return '-';
      }
      return `$${Number(price).toFixed(2)}`;
    };

    return {
      searchQuery,
      filteredInstruments,
      emitSearch,
      selectInstrument,
      formatLastPrice,
    };
  },
};
</script>

<style scoped>
.search-bar {
  padding: 10px;
  background-color: #333;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  outline: none;
  color: #fff;
  background-color: #555;
}

.search-input::placeholder {
  color: #aaa;
}

.list-result {
  display: inline-block;
  position: absolute;
  top: 54px;
  width: 100%;
  text-align: center;
  background: var(--vt-c-black-mute);
  padding: 15px 0;
  border-radius: 8px;
}

.list-result li {
  list-style-type: none;
  cursor: pointer;
  padding: 5px 0;
}

.list-result li:hover {
  background-color: #444;
}
</style>
