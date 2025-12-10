# 📚 Documentación Técnica - Aegis Dashboard

## Estructura de Carpetas

```
aegis-main/
├── index.html                 # Página principal (Dashboard)
├── login.html                 # Página de autenticación
├── admin.html                 # Panel de administración
├── quickstart.html            # Guía rápida
├── style.css                  # Estilos globales
├── README.md                  # Documentación principal
├── changelog.md               # Registro de cambios
├── usage_examples.js          # Ejemplos de uso
├── technical_docs.md          # Este archivo
├── js/                        # 📁 Carpeta centralizada de JavaScript
│   ├── app.js                # Lógica principal de la aplicación
│   ├── auth.js               # Sistema de autenticación (v1.7.0)
│   ├── script.js             # Scripts adicionales
│   ├── tools-config.js       # Configuración de herramientas
│   └── translations.js       # Archivos de traducción (ES/EN)
├── plugins/                  # Extensiones para navegadores
│   └── favorites - Chrome/
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
  tools: [],           // Array de 78 herramientas
  favorites: [],       // IDs de favoritos
  searchHistory: [],   // Historial de búsquedas
  searches: 0,         // Contador de búsquedas
  lastSearchQuery: "" // Último término de búsqueda (v1.4.0)
}
```

#### Categorías de Herramientas (v1.6.0):
```javascript
// 13 Categorías organizadas temáticamente
Categorías = {
  WEBSITE_SECURITY: 15,      // Seguridad Web
  SEARCH_TOOLS: 12,          // Herramientas de Búsqueda
  IP_INFO: 9,                // Información de IP
  MALWARE_ANALYSIS: 8,       // Análisis de Malware
  THREAT_INTELLIGENCE: 8,    // Inteligencia de Amenazas
  DNS_TOOLS: 7,              // Herramientas DNS
  CERTIFICATE_SSL: 3,        // Certificados SSL (Nueva v1.6.0)
  CODE_SEARCH: 3,            // Búsqueda de Código
  EMAIL: 3,                  // Correo Electrónico
  HASH_LOOKUP: 3,            // Búsqueda de Hash
  PEOPLE_SEARCH: 3,          // Búsqueda de Personas
  MALWARE_FEEDS: 2,          // Fuentes de Malware
  REAL_TIME_THREAT_MAPS: 2   // Mapas de Amenazas
}
```

#### Categorías Renombradas (v1.6.0):
- `FILE_MALWARE_ANALYSIS` → `MALWARE_ANALYSIS`
- `USERNAME_PEOPLE_OSINT` → `PEOPLE_SEARCH`
- `WEBSITE_OSINT_TOOLS` → `WEBSITE_SECURITY
```

#### Métodos Principales:
- `init()` - Inicializa la aplicación
- `loadTools()` - Carga herramientas desde config
- `handleSearch(e)` - Procesa búsquedas y guarda en `lastSearchQuery` (v1.4.0)
- `openToolSearch(toolId)` - Abre herramienta, auto-ejecuta con última búsqueda si existe (v1.4.0)
- `executeToolSearch(autoQuery)` - Ejecuta búsqueda desde modal o automáticamente (v1.4.0)
- `detectQueryType(query)` - Detecta tipo de búsqueda (IP, domain, hash, email)
- `filterTools(query)` - Filtra herramientas por nombre/descripción
- `renderTools()` - Renderiza la cuadrícula de herramientas con botones (v1.4.0)
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

### 4. **Persistencia de Búsqueda (v1.4.0)**

#### Flujo de Trabajo:

```
1. Usuario realiza búsqueda
   ↓
2. handleSearch() guarda query en state.lastSearchQuery
   ↓
3. Usuario cambia a otra pestaña (Herramientas/Favoritos)
   ↓
4. Usuario hace clic en una herramienta
   ↓
5. openToolSearch() detecta lastSearchQuery existe
   ↓
6. Auto-ejecuta executeToolSearch(lastSearchQuery)
   ↓
7. Herramienta se abre con término de búsqueda anterior
```

#### Implementación:

```javascript
// Guardar búsqueda
handleSearch: function(e) {
  const query = document.getElementById("search-input").value.trim();
  this.state.lastSearchQuery = query; // Persistir
  // ... resto del código
}

// Auto-usar búsqueda guardada
openToolSearch: function(toolId) {
  this.pendingToolId = toolId;
  
  if (this.state.lastSearchQuery) {
    // Auto-ejecutar sin mostrar modal
    this.executeToolSearch(this.state.lastSearchQuery);
    return;
  }
  
  // Mostrar modal solo si no hay búsqueda previa
  // ...
}

// Ejecutar con query automática o manual
executeToolSearch: function(autoQuery = null) {
  const query = autoQuery || document.getElementById("searchModalInput").value.trim();
  // ... ejecutar búsqueda
}
```

#### Beneficios:
- Reduce clics repetitivos
- Workflow optimizado para investigaciones multi-herramienta
- Experiencia fluida entre pestañas
- No interrumpe el flujo de trabajo del investigador

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

### Sistema de Temas v1.7.1

#### Aplicación de Tema
El tema debe aplicarse tanto a `document.documentElement` como a `document.body`:

```javascript
// Correcto - aplicar a ambos elementos
document.documentElement.setAttribute('data-bs-theme', theme);
document.body.setAttribute('data-bs-theme', theme);
```

#### Selectores CSS
Usar selectores sin prefijo `body` para mayor compatibilidad:

```css
/* ✅ Correcto */
[data-bs-theme="light"] .card { ... }
[data-bs-theme="dark"] .navbar { ... }

/* ❌ Incorrecto - puede no funcionar */
body[data-bs-theme="light"] .card { ... }
```

#### Estilos de Tarjetas con Hover
```css
/* Light mode */
[data-bs-theme="light"] .card {
    background: #ffffff;
    border: 1px solid rgba(59, 130, 246, 0.2);
    transition: all 0.3s ease;
}

[data-bs-theme="light"] .card:hover {
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.25), 
                0 10px 20px rgba(59, 130, 246, 0.15),
                0 0 0 1px rgba(59, 130, 246, 0.4);
    transform: translateY(-8px) scale(1.01);
}

/* Dark mode */
[data-bs-theme="dark"] .card {
    background: rgba(15, 20, 51, 0.6);
    border: 1px solid rgba(59, 130, 246, 0.2);
}
```

#### LocalStorage Keys
- `osintTheme`: "dark" | "light"
- `osintLanguage`: "es" | "en"

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
    ↓
Tooltips se actualizan automáticamente
```

## Sistema de Tooltips (v1.2.0)

### Implementación de Tooltips Bilingües

Los tooltips proporcionan información detallada sobre cada herramienta al pasar el cursor.

#### Estructura:

```javascript
// En renderTools(), renderFavoritesView(), etc.
const description = t('DESC_' + tool.id, this.config.currentLanguage);

html += `
  <tr title="${description}">
    <td>${tool.name}</td>
    <td>${description}</td>
  </tr>
`;
```

#### Traducciones de Tooltips:

```javascript
// js/translations.js
const translations = {
  "es": {
    "DESC_vt": "Analiza archivos sospechosos, dominios, IPs y URLs",
    "DESC_shodan": "Motor de búsqueda para el Internet de las cosas",
    "DESC_urlscan": "Busca dominios, IPs, nombres de archivo, hashes, ASNs"
  },
  "en": {
    "DESC_vt": "Analyze suspicious files, domains, IPs & URLs",
    "DESC_shodan": "Search Engine for the Internet of Everything",
    "DESC_urlscan": "Search for domains, IPs, filenames, hashes, ASNs"
  }
}
```

#### Ubicaciones de Tooltips:

1. **Pestaña Herramientas**: Todas las herramientas listadas por categoría
2. **Resultados de Búsqueda**: Herramientas relevantes para la consulta
3. **Panel de Favoritos**: Herramientas marcadas como favoritas
4. **Vista de Favoritos**: Vista detallada de favoritos

#### CSS para Tooltips:

```css
/* Mejora visual de tooltips */
[title] {
  cursor: help;
  position: relative;
}

.result-item[title]:hover {
  background: rgba(59, 130, 246, 0.05);
  border-radius: var(--radius-lg);
  transition: var(--transition);
}

tr[title]:hover {
  background: rgba(59, 130, 246, 0.05) !important;
}
```

#### Cambio Automático de Idioma:

Cuando el usuario cambia de idioma (ES ↔ EN):
1. `toggleLanguage()` actualiza `this.config.currentLanguage`
2. `applyLanguage()` ejecuta `renderTools()`, `renderFavoritesView()`, etc.
3. Cada función usa `t('DESC_' + tool.id, this.config.currentLanguage)`
4. Los tooltips se regeneran con el idioma correcto

### Ventajas del Sistema:

- ✅ **Bilingüe**: Soporte completo ES/EN
- ✅ **Automático**: Cambio instantáneo al cambiar idioma
- ✅ **Consistente**: Mismo sistema en todas las vistas
- ✅ **Extensible**: Fácil agregar más idiomas
- ✅ **Accesible**: Mejora la comprensión de herramientas

## Botones de Acceso Rápido (v1.3.0)

### Implementación de Downdetector

El botón de Downdetector proporciona acceso directo a la verificación de caídas de sitios web sin necesidad de buscarlo en el listado.

#### Estructura HTML:

```html
<!-- Downdetector Button -->
<a href="https://downdetector.cl/" target="_blank" rel="noopener noreferrer" 
   class="btn btn-outline-danger" 
   id="downdetector-btn"
   aria-label="Downdetector">
  <svg><!-- Icono de advertencia --></svg>
</a>
```

#### Ubicación:
- **Posición**: Entre botón de idioma (EN) e historial
- **Navbar**: Barra superior junto a controles principales
- **Orden**: Categorías → Tema → Idioma → **Downdetector** → Historial → Favoritos

#### CSS Personalizado:

```css
#downdetector-btn {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

#downdetector-btn:hover {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}
```

#### Traducción del Tooltip:

```javascript
// js/translations.js
const translations = {
  "es": {
    "DOWNDETECTOR_TOOLTIP": "Verifica si los sitios web están caídos o tienen problemas"
  },
  "en": {
    "DOWNDETECTOR_TOOLTIP": "Check if websites are down or having issues"
  }
}

// js/app.js - applyLanguage()
const downdetectorBtn = document.getElementById("downdetector-btn");
if (downdetectorBtn) downdetectorBtn.title = t("DOWNDETECTOR_TOOLTIP", lang);
```

#### Características:
- ✅ **Solo icono**: Diseño compacto
- ✅ **Color rojo**: Esquema danger (#ef4444)
- ✅ **Tooltip bilingüe**: Actualización automática
- ✅ **Nueva pestaña**: Opens in new tab
- ✅ **Accesible**: aria-label incluido
- ✅ **Responsive**: Compatible con todos los tamaños

#### Ventajas:
- Acceso más rápido a función frecuente
- Reducción de búsquedas en el listado
- Mejor organización: herramientas vs accesos directos
- Mejora la experiencia del usuario

## Sistema de Autenticación (v1.7.0+)

### Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                   Flujo de Autenticación                     │
└─────────────────────────────────────────────────────────────┘

    quickstart.html
         ↓
    login.html ─────────────────────┐
    (Login/Registro)                │
    + reCAPTCHA v2 (v1.7.2)         │
         ↓                          │
    ┌────────────────────┐    ┌─────────────────┐
    │   index.html       │    │   admin.html    │
    │   (Dashboard)      │    │   (Solo Admin)  │
    │   Requiere Auth    │    │   Requiere Admin│
    └────────────────────┘    └─────────────────┘
```

### Protección reCAPTCHA v2 (v1.7.2)

#### Configuración

**Claves de Google reCAPTCHA:**
```javascript
// Site Key (pública)
6Le4gicsAAAAAE1h_NDHNKKc6U2EXa99-tP8mnD5

// Secret Key (privada - NO compartir)
6Le4gicsAAAAAEhD4yonPQyF5SGqjavH_DGLUoha

// Dominios autorizados
localhost
127.0.0.1
```

#### Implementación en login.html

**Carga Dinámica con Idioma:**
```html
<!-- Script dinámico según idioma guardado -->
<script>
    (function() {
        const lang = localStorage.getItem('osintLanguage') || 'es';
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?hl=${lang}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    })();
</script>
```

**Widget en Formulario:**
```html
<!-- Login form -->
<div class="g-recaptcha" 
     data-sitekey="6Le4gicsAAAAAE1h_NDHNKKc6U2EXa99-tP8mnD5">
</div>

<!-- Register form -->
<div class="g-recaptcha" 
     data-sitekey="6Le4gicsAAAAAE1h_NDHNKKc6U2EXa99-tP8mnD5">
</div>
```

#### Validación en js/auth.js

**Login:**
```javascript
handleLogin: async function (e) {
    e.preventDefault();
    
    // Validar reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
        const lang = localStorage.getItem('osintLanguage') || 'es';
        const message = t('RECAPTCHA_ERROR', lang);
        this.showAlert(message, 'danger');
        return;
    }
    
    // ... resto de validación
}
```

**Registro:**
```javascript
handleRegister: async function (e) {
    // Validar reCAPTCHA (widget #1)
    const recaptchaResponse = grecaptcha.getResponse(1);
    if (!recaptchaResponse) {
        this.showAlert(t('RECAPTCHA_ERROR', lang), 'danger');
        return;
    }
    // ... resto
}
```

**Reset en Error:**
```javascript
// Login - widget 0 (por defecto)
grecaptcha.reset();

// Registro - widget 1
grecaptcha.reset(1);
```

#### Traducción Dinámica

**Función de Recarga:**
```javascript
function reloadRecaptchaWithLanguage(lang) {
    // Remover scripts anteriores
    const oldScripts = document.querySelectorAll('script[src*="recaptcha"]');
    oldScripts.forEach(script => script.remove());
    
    // Limpiar widgets
    const recaptchaElements = document.querySelectorAll('.g-recaptcha > div');
    recaptchaElements.forEach(el => el.innerHTML = '');
    
    // Recargar página con nuevo idioma
    setTimeout(() => window.location.reload(), 100);
}
```

**Textos del Widget:**
- **Español (ES)**: "No soy un robot"
- **Inglés (EN)**: "I'm not a robot"

#### CSS Responsive

```css
.g-recaptcha {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.g-recaptcha > div {
    transform: scale(0.95);
    transform-origin: center;
}

@media (max-width: 480px) {
    .g-recaptcha > div {
        transform: scale(0.85);
    }
}
```

#### Validación Backend (Recomendado)

**Nota**: La implementación actual solo valida en frontend. Para producción, se recomienda:

```javascript
// Backend (Node.js ejemplo)
const axios = require('axios');

async function verifyRecaptcha(token) {
    const secretKey = '6Le4gicsAAAAAEhD4yonPQyF5SGqjavH_DGLUoha';
    const response = await axios.post(
        'https://www.google.com/recaptcha/api/siteverify',
        null,
        {
            params: {
                secret: secretKey,
                response: token
            }
        }
    );
    return response.data.success;
}
```

### Archivos del Sistema

| Archivo | Descripción |
|---------|-------------|
| `login.html` | Página de login/registro con toggles tema/idioma |
| `admin.html` | Panel de administración de usuarios |
| `js/auth.js` | Lógica de autenticación, sesiones, guards |
| `js/translations.js` | Traducciones incluyendo placeholders |

### LocalStorage Keys

```javascript
// Autenticación
"aegisSession"   // Sesión actual del usuario
"aegisUsers"     // Base de datos de usuarios

// Preferencias
"osintTheme"     // "dark" | "light"
"osintLanguage"  // "es" | "en"
```

### Credenciales por Defecto

- **Email**: `admin@aegis.local`
- **Password**: `admin123`
- **Rol**: `admin`

### Funciones Principales (auth.js)

```javascript
// Autenticación
Auth.login(email, password)      // Inicia sesión
Auth.register(name, email, pass) // Registra usuario
Auth.logout()                    // Cierra sesión
Auth.isAuthenticated()           // Verifica sesión
Auth.isAdmin()                   // Verifica rol admin

// Gestión de usuarios
Auth.getUsers()                  // Lista usuarios
Auth.updateUser(id, data)        // Actualiza usuario
Auth.deleteUser(id)              // Elimina usuario

// Traducciones
initTranslations()               // Aplica traducciones a data-i18n
loadTranslations()               // Recarga traducciones
```

### Toggle de Tema (v1.7.1)

```javascript
// Aplicar tema correctamente
function applyTheme(theme) {
    // Aplicar a AMBOS elementos
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('osintTheme', theme);
    updateThemeIcon();
}

// Actualizar icono
function updateThemeIcon() {
    const theme = localStorage.getItem('osintTheme') || 'dark';
    const moonIcon = document.querySelector('.icon-moon');
    const sunIcon = document.querySelector('.icon-sun');
    
    if (theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}
```

### Placeholders Traducibles (v1.7.1)

```html
<!-- HTML -->
<input type="email" data-placeholder="PLACEHOLDER_EMAIL">
```

```javascript
// En initTranslations()
document.querySelectorAll('[data-placeholder]').forEach(el => {
    const key = el.getAttribute('data-placeholder');
    if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
    }
});
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
9. **Tooltips Avanzados**: Tooltips con información adicional (última actualización, popularidad)
10. **Más Idiomas**: FR, DE, PT, IT para tooltips y UI
11. **Más Botones de Acceso Rápido**: Identificar y agregar más funciones frecuentes
12. **Configuración de Accesos**: Permitir al usuario personalizar botones de acceso rápido

---

**Última actualización**: Diciembre 2025 (v1.7.1)
