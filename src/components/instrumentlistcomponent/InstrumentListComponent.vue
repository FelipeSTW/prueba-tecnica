<template>
    <div class="instrument-list">
      <!-- Encabezado de la tabla -->
      <div class="instrument-header">
        <div>Nombre</div>
        <div>Último</div>
        <div>Monto (MM)</div>
        <div>Var día</div>
        <div>Var 30d</div>
        <div>Año Actual</div>
        <div>12 Meses</div>
      </div>
  
      <!-- Lista de instrumentos -->
      <InstrumentItemComponent
        v-for="instrument in instruments"
        :key="instrument.id"
        :instrument="instrument"
        @click.native="selectInstrument(instrument)"
      />
    </div>
  </template>
  
  <script>
  import InstrumentItemComponent from '../instrumentitemcomponent/InstrumentItemComponent.vue';

  
  export default {
    name: 'InstrumentListComponent',
    components: {
      InstrumentItemComponent,
    },
    props: {
      instruments: {
        type: Array,
        required: true,
      },
    },
    methods: {
      selectInstrument(instrument) {
        this.$emit('instrument-selected', instrument); // Emitimos el evento al componente padre
      },
    },
  };
  </script>
  
  <style scoped>
  .instrument-list {
    display: flex;
    flex-direction: column;
    border: 1px solid #444;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 50px;
  }
  .instrument-header {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    background-color: #222;
    font-weight: bold;
    color: white;
  }
  .instrument-header div {
    width: 14%;
    text-align: right;
  }
  .instrument-header div:first-child {
    text-align: left;
  }
  </style>
  