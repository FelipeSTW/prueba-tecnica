<template>
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        @input="onSearch"
        placeholder="Buscar un instrumento"
        class="search-input"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchBarComponent',
    data() {
      return {
        searchQuery: '',
      };
    },
    methods: {
      onSearch() {
        // Emitimos un evento llamado 'search' y pasamos el término de búsqueda
        this.$emit('search', this.searchQuery);
      },
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
  </style>
  