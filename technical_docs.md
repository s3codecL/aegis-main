# 📚 Documentación Técnica - Aegis Dashboard

## Estructura de Carpetas

```
osint-main/
├── index.html                 # Página principal
├── quickstart.html            # Guía rápida
├── style.css                  # Estilos globales
├── README.md                  # Documentación principal
├── changelog.md               # Registro de cambios
├── usage_examples.js          # Ejemplos de uso
├── technical_docs.md          # Este archivo
├── js/                        # 📁 Carpeta centralizada de JavaScript
│   ├── app.js                # Lógica principal de la aplicación
│   ├── script.js             # Scripts adicionales
│   ├── tools-config.js       # Configuración de herramientas
│   └── translations.js       # Archivos de traducción (ES/EN)
├── PLUGINS/                  # Extensiones para navegadores
│   ├── chrome/
│   │   ├── background.js
│   │   └── manifest.json
│   ├── edge/
│   │   ├── background.js
│   │   └── manifest.json
│   └── OSINT Favorites - Chrome/
│       ├── background.js
│       ├── content.js
│       └── manifest.json
```

## Arquitectura de la Aplicación

### Diagrama de Flujo

```
┌─────────────────────────────────────────────────┐
│         Aegis Dashboard - Arquitectura          │
└─────────────────────────────────────────────────┘

    HTML (index.html)
         ↓
    ┌────────────────────────────┐
    │   CSS (style.css)          │
    │  - Variables CSS           │
    │  - Responsive Design       │
    │  - Temas (Light/Dark)      │
    └────────────────────────────┘
         ↓
    ┌──────────────────────────────────────────────────┐
    │   Carpeta js/ - Módulos JavaScript              │
    │  ┌────────────────────────────────────────────┐  │
    │  │  app.js                                    │  │
    │  │  - App Object (Estado Global)              │  │
    │  │  - Manejo de Eventos                       │  │
    │  │  - Lógica de Búsqueda                      │  │
    │  │  - Gestión de Storage                      │  │
    │  └────────────────────────────────────────────┘  │
    │  ┌────────────────────────────────────────────┐  │
    │  │  tools-config.js                           │  │
    │  │  - Array de herramientas AEGIS             │  │
    │  │  - Categorías                              │  │
    │  │  - URLs y Templates                        │  │
    │  └────────────────────────────────────────────┘  │
    │  ┌────────────────────────────────────────────┐  │
    │  │  translations.js                           │  │
    │  │  - Diccionarios (Español/English)          │  │
    │  │  - Función t() para traducciones           │  │
    │  └────────────────────────────────────────────┘  │
    │  ┌────────────────────────────────────────────┐  │
    │  │  script.js                                 │  │
    │  │  - Funciones auxiliares                    │  │
    │  └────────────────────────────────────────────┘  │
    └──────────────────────────────────────────────────┘
```

## Componentes Principales

### 1. **App Object** (js/app.js)

El objeto principal que gestiona toda la lógica de la aplicación.

#### Propiedades:
```javascript
App.config = {
  storageVersion: "v1",
  currentLanguage: "es|en",
  currentTheme: "dark|light"
}

App.state = {
  tools: [],           // Array de herramientas
  favorites: [],       // IDs de favoritos
  searchHistory: [],   // Historial de búsquedas
  searches: 0          // Contador de búsquedas
}
```

#### Métodos Principales:
- `init()` - Inicializa la aplicación
- `loadTools()` - Carga herramientas desde config
- `handleSearch(e)` - Procesa búsquedas
- `detectQueryType(query)` - Detecta tipo de búsqueda (IP, domain, hash, email)
- `filterTools(query)` - Filtra herramientas por nombre/descripción
- `renderTools()` - Renderiza la cuadrícula de herramientas
- `toggleFavorite()` - Alterna estado de favorito
- `toggleTheme()` - Cambia tema oscuro/claro
- `toggleLanguage()` - Cambia idioma
- `switchView()` - Cambia entre vistas (Tools, Results, History)

### 2. **Detección de Tipos de Búsqueda**

```javascript
detectQueryType(query) {
  // Regex para detección:
  // IP: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
  // Domain: /^[a-zA-Z0-9-]{1,63}(\.[a-zA-Z0-9-]{1,63})*\.[a-zA-Z]{2,}$/
  // Hash: /^[a-f0-9]{32}$|^[a-f0-9]{40}$|^[a-f0-9]{64}$/
  // Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}
```

### 3. **Datos Persistentes (LocalStorage)**

La aplicación usa localStorage para guardar:

```javascript
// Formato de almacenamiento:
{
  "aegisFavorites": "[\"vt\", \"shodan\"]",
  "aegisHistory": "[{query: \"8.8.8.8\", date: \"2024-01-01\"}]",
  "aegisSearches": "42",
  "aegisLanguage": "es",
  "aegisTheme": "dark",
  "toolConfigVersion": "v1"
}
```

## Estructura HTML

### Componentes Principales:

1. **Navbar**
   - Logo y branding
   - Barra de búsqueda
   - Filtro de herramientas
   - Dropdown de categorías
   - Controles (tema, idioma, historial, favoritos)

2. **Main Container**
   - Sidebar izquierdo (categorías y estadísticas)
   - Contenido principal (vistas)
   - Panel lateral derecho (historial/favoritos)

3. **Vistas**
   - Tools View: Cuadrícula de herramientas
   - Results View: Resultados de búsqueda
   - History View: Historial de búsquedas

4. **Modales**
   - Error Modal
   - Success Modal

## Estilos CSS

### Variables CSS Principales:

```css
:root {
  --color-primary: #3b82f6;      /* Azul */
  --color-success: #10b981;       /* Verde */
  --color-warning: #f59e0b;       /* Ámbar */
  --color-danger: #ef4444;        /* Rojo */
  
  --spacing-md: 1rem;
  --radius-lg: 0.75rem;
  --transition: all 0.3s cubic-bezier(...);
  --shadow-md: 0 4px 6px -1px rgba(...);
}
```

### Temas:

**Dark Theme (por defecto):**
```css
[data-bs-theme="dark"] {
  --bg-primary: #0f172a;          /* Fondo oscuro */
  --bg-secondary: #1e293b;        /* Fondo secundario */
  --text: #f1f5f9;                /* Texto claro */
  --text-muted: #cbd5e1;          /* Texto tenue */
  --border: #334155;              /* Bordes */
}
```

**Light Theme:**
```css
[data-bs-theme="light"] {
  --bg-primary: #f8fafc;          /* Fondo claro */
  --bg-secondary: #f1f5f9;        /* Fondo secundario */
  --text: #1e293b;                /* Texto oscuro */
  --text-muted: #64748b;          /* Texto tenue */
  --border: #e2e8f0;              /* Bordes */
}
```

### Responsive Breakpoints:

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Laptop**: 768px - 1024px
- **Desktop**: > 1024px

## Flujo de Búsqueda

```
Usuario ingresa búsqueda
    ↓
handleSearch() valida entrada
    ↓
addToHistory() guarda en historial
    ↓
detectQueryType() identifica tipo
    ↓
filterRelevantTools() obtiene herramientas
    ↓
buildToolUrl() construye URLs con query
    ↓
renderResults() muestra resultados
    ↓
Usuario hace clic en herramienta
    ↓
Abre URL en nueva ventana
```

## LocalStorage API

### Funciones de Almacenamiento:

```javascript
// Guardar favoritos
localStorage.setItem(
  "aegisFavorites",
  JSON.stringify(App.state.favorites)
);

// Cargar favoritos
App.state.favorites = JSON.parse(
  localStorage.getItem("aegisFavorites")
) || [];

// Similar para historial, búsquedas, tema e idioma
```

## Extensiones de Navegador

La carpeta `PLUGINS/` contiene extensiones para:
- **Chrome**: Integración con context menu
- **Edge**: Compatibilidad con Chromium Edge
- **AEGIS Favorites**: Acceso rápido a favoritos

### Manifest v3 (Chrome/Edge):
```json
{
  "manifest_version": 3,
  "name": "AEGIS Dashboard",
  "permissions": ["contextMenus"],
  "background": { "service_worker": "background.js" }
}
```

## Seguridad

### Consideraciones:

1. **CORS**: La aplicación respeta políticas de mismo origen
2. **localStorage**: Datos locales del navegador, sin sincronización
3. **URLs externas**: Se abren en ventanas nuevas
4. **Validación**: Todas las entradas se validan

### Best Practices Implementadas:

- ✅ No se ejecuta código remoto
- ✅ Sin referencias a datos de usuario
- ✅ Métodos seguros de URL construction
- ✅ Sanitización de entrada (URL encoding)

## Performance

### Optimizaciones:

1. **CSS Variables**: Cambios de tema sin repintado completo
2. **Event Delegation**: Fewer event listeners
3. **LocalStorage Caching**: Datos sin llamadas a servidor
4. **Lazy Rendering**: Las vistas se renderizen solo cuando se necesitan
5. **DOM Minimization**: Manipulación eficiente del DOM

### Métricas:

- Tiempo de carga: < 1s
- Tamaño total: < 500KB (sin dependencias externas)
- FCP (First Contentful Paint): < 800ms
- LCP (Largest Contentful Paint): < 1.5s

## Internacionalización (i18n)

### Sistema de Traducción:

```javascript
// js/translations.js
const translations = {
  "es": {
    "YOUR_FAVORITES": "TUS FAVORITOS",
    "SEARCH_TOOLS": "HERRAMIENTAS DE BÚSQUEDA",
    // ... más traducciones
  },
  "en": {
    "YOUR_FAVORITES": "YOUR FAVORITES",
    "SEARCH_TOOLS": "SEARCH TOOLS",
    // ... más traducciones
  }
}
```

### Proceso de Cambio de Idioma:

```
Usuario hace clic en botón idioma
    ↓
App.toggleLanguage() actualiza config
    ↓
localStorage se actualiza
    ↓
applyLanguage() actualiza UI
```

## Mantenimiento y Extensión

### Agregar Nueva Herramienta:

1. Edita `js/tools-config.js`
2. Agrega nuevo objeto con estructura correcta
3. Categoriza según categoría existente

### Agregar Nueva Categoría:

1. Crea herramientas con nueva categoría
2. Agrega traducción en `js/translations.js`
3. La UI se actualiza automáticamente

### Actualizar Temas de Color:

1. Edita variables CSS en `:root`
2. Los cambios se aplican globalmente

## Troubleshooting de Desarrollo

### Consola JavaScript Errors:

```javascript
// Error común: tools no cargadas
// Solución: Verifica que js/tools-config.js se carga antes de js/app.js

// Error: localStorage quote exceeded
// Solución: Implementa limpieza periódica de historial antiguo

// Error: Urls inválidas
// Solución: Valida templates en js/tools-config.js
```

### Checklist de Debugging:

- [ ] ¿Se carga index.html?
- [ ] ¿Se cargan todos los scripts?
- [ ] ¿localStorage está habilitado?
- [ ] ¿Las URLs son válidas?
- [ ] ¿Los templates usan `{{query}}`?

## Próximas Mejoras Sugeridas

1. **Backend Sync**: Sincronizar favoritos con servidor
2. **API Integration**: Resultados de API en lugar de URLs
3. **Analytics**: Tracking de herramientas más usadas
4. **Dark Mode Timer**: Cambio automático según hora
5. **Custom Categories**: Crear categorías personalizadas
6. **Export/Import**: Exportar e importar configuración
7. **Keyboard Shortcuts**: Accesos rápidos de teclado
8. **Progressive Web App (PWA)**: Instalable como app

---

**Última actualización**: Diciembre 2024
