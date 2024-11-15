# Configuración de Pruebas con Vue 3 + Jest

Esta guía te ayudará a configurar un entorno de pruebas para un proyecto de Vue 3 usando Jest. Sigue estos pasos cuidadosamente para asegurar que todo funcione correctamente.

## Prerrequisitos
- Node.js >= 14
- npm o yarn

## Instalación Paso a Paso

1. **Inicializa el Proyecto**
   
   Asegúrate de tener un proyecto de Vue configurado. Puedes crear uno usando Vue CLI o Vite.
   
   ```bash
   vue create mi-proyecto-vue3
   # O usando Vite
   npm create vite@latest mi-proyecto-vue3 --template vue
   ```

2. **Navega al Directorio del Proyecto**
   
   ```bash
   cd mi-proyecto-vue3
   ```

3. **Instala Dependencias**
   
   Instala Jest y los paquetes relacionados para Vue 3.
   
   ```bash
   npm install --save-dev jest @vue/test-utils@next @vue/vue3-jest babel-jest @babel/preset-env
   ```

   > **Nota**: Usar `@next` asegura que obtengas la última versión de `@vue/test-utils` que soporta Vue 3.

4. **Configura Babel**

   Crea un archivo `babel.config.js` en la raíz de tu proyecto con el siguiente contenido:

   ```js
   module.exports = {
     presets: [
       '@babel/preset-env'
     ]
   };
   ```

5. **Configura Jest**

   Crea un archivo `jest.config.cjs` en la raíz de tu proyecto con el siguiente contenido:

   ```js
   module.exports = {
     preset: '@vue/cli-plugin-unit-jest',
     testEnvironment: 'jsdom',
     transform: {
       '^.+\.vue$': '@vue/vue3-jest',
       '^.+\.js$': 'babel-jest'
     },
     moduleFileExtensions: ['js', 'vue'],
     testMatch: [
       '**/__tests__/**/*.spec.[jt]s?(x)',
       '**/tests/unit/**/*.spec.[jt]s?(x)'
     ]
   };
   ```

6. **Agrega Scripts de Pruebas**

   Abre `package.json` y agrega el siguiente script bajo "scripts":

   ```json
   "scripts": {
     "test": "jest --passWithNoTests"
   }
   ```

7. **Ejecuta las Pruebas**

   Finalmente, ejecuta tus pruebas:

   ```bash
   npm run test
   ```

   Si todo está configurado correctamente, las pruebas deberían pasar sin errores.

## Problemas Comunes

- **Conflictos de Dependencias**: Si encuentras errores de resolución de dependencias, intenta usar `npm install --legacy-peer-deps`.
- **Vue No Definido**: Asegúrate de estar usando `@vue/test-utils@next` y `@vue/vue3-jest` para soportar correctamente Vue 3.
- **Configuración de Babel**: Asegúrate de que `babel.config.js` esté correctamente configurado para evitar problemas con la transpilación.

## Estructura de Carpetas
- `__tests__/`: Contiene todas tus pruebas unitarias e integradas.
  - `unit/`: Pruebas unitarias para componentes y funciones individuales.
  - `integration/`: Pruebas de integración para combinar diferentes módulos o componentes.
- `components/`: Componentes de Vue.
- `views/`: Vistas de Vue si corresponde.

## Consejos Adicionales
- Mantén siempre tus dependencias actualizadas.
- Asegúrate de que tus pruebas estén ubicadas dentro del directorio correcto para que Jest pueda encontrarlas.

## Enlaces Útiles
- [Documentación de Jest](https://jestjs.io/docs/getting-started)
- [Documentación de Vue Test Utils](https://next.vue-test-utils.vuejs.org/guide/)
- [Documentación de Babel](https://babeljs.io/docs/en/)

## Conclusión
Esta guía debería ayudarte a comenzar con las pruebas en Vue 3 usando Jest. Si aún enfrentas problemas, considera revisar nuevamente tu configuración y la compatibilidad de las versiones, o consulta la documentación oficial enlazada arriba.
