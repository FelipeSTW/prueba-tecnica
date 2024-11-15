<template>
  <div class="instrument-list">
    <div class="instrument-columns">
      <!-- Primera columna (16 instrumentos) -->
      <div class="instrument-column">
        <div class="instrument-header">
          <div>Nombre</div>
          <div>Último</div>
          <div>Monto (MM)</div>
          <div>Var día</div>
          <div>Var 30d</div>
          <div>Año Actual</div>
          <div>12 Meses</div>
        </div>

        <!-- Lista para la primera columna -->
        <InstrumentItemComponent
          v-for="(instrument, index) in instruments.slice(0, 16)"
          :key="instrument.id"
          :instrument="instrument"
          @click.native="selectInstrument(instrument)"
        />
      </div>
      
      <!-- Segunda columna (16 instrumentos) -->
      <div class="instrument-column">
       
        <div class="instrument-header">
          <div>Nombre</div>
          <div>Último</div>
          <div>Monto (MM)</div>
          <div>Var día</div>
          <div>Var 30d</div>
          <div>Año Actual</div>
          <div>12 Meses</div>
        </div>

        <!-- Lista de instrumentos para la segunda columna -->
        <InstrumentItemComponent
          v-for="(instrument, index) in instruments.slice(16, instruments.length)"
          :key="instrument.id"
          :instrument="instrument"
          @click.native="selectInstrument(instrument)"
        />
      </div>
    </div>
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
        this.$emit('instrument-selected', instrument); // Emito el evento al componente padre
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
  
  /* Estilos para las columnas */
  .instrument-columns {
    display: flex;
    gap: 20px; 
    margin-top: 20px;
  }
  
  .instrument-column {
    flex: 1; 
    display: flex;
    flex-direction: column;
    gap: 10px; 
  }
  </style>
  