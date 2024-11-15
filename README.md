# Finmarkets - Visualizador de Instrumentos Financieros

## Descripción
Aplicación web desarrollada en Vue 3 para visualizar y analizar instrumentos financieros. Permite monitorear índices bursátiles, mostrar gráficos interactivos y analizar datos históricos.

## Características
- Visualización de índices bursátiles en tiempo real
- Gráficos interactivos con diferentes períodos temporales
- Lista de instrumentos financieros con datos relevantes
- Búsqueda y filtrado de instrumentos
- Análisis de variaciones y tendencias
- Resumen detallado de instrumentos seleccionados

## Tecnologías
- Vue 3
- Pinia
- Vuetify
- ECharts
- Jest
- Axios

## Requisitos
- Node.js 16.x o superior
- npm 8.x o superior

## Instalación
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/finmarkets.git

# Instalar dependencias
cd finmarkets
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Pruebas
```bash
# Ejecutar pruebas unitarias
npm run test

# Ejecutar pruebas con cobertura
npm run test:coverage
```

## Estructura del Proyecto
```
finmarkets/
├── src/
│   ├── components/       # Componentes Vue
│   ├── stores/          # Stores de Pinia
│   ├── services/        # Servicios y APIs
│   └── assets/          # Recursos estáticos
├── tests/
│   ├── unit/           # Pruebas unitarias
│   └── integration/    # Pruebas de integración
└── public/             # Archivos públicos
```

## Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Compila el proyecto para producción
- `npm run test`: Ejecuta pruebas unitarias
- `npm run preview`: Vista previa de la build de producción

## Contribuir
1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## Licencia
MIT