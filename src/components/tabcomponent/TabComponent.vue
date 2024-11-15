<template>
    <div class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-button', { active: tab === selectedTab }]"
        @click="selectTab(tab)"
      >
        {{ tab }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TabComponent',
    props: {
      initialTab: {
        type: String,
        default: 'IPSA',
      },
    },
    data() {
      return {
        tabs: ['IPSA', 'IGPA', 'NASDAQ', 'DOW JONES', 'SP/BVL'],
        selectedTab: this.initialTab,
      };
    },
    methods: {
      selectTab(tab) {
        this.selectedTab = tab;
        //  evento 'tab-selected' con el nombre del índice seleccionado
        this.$emit('tab-selected', tab);
      },
    },
  };
  </script>
  
  <style scoped>
  .tabs {
    display: flex;
    justify-content: space-around;
    background-color: #333;
    padding: 10px;
    border-radius: 4px;
  }
  
  .tab-button {
    padding: 8px 16px;
    color: #fff;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
  
  .tab-button.active {
    font-weight: bold;
    border-bottom: 2px solid #fff;
  }
  
  .tab-button:hover {
    color: #aaa;
  }
  </style>
  