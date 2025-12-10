# 🛡️ Aegis Dashboard - Herramienta de Investigación

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/s3codecL/aegis-main.svg)](https://github.com/s3codecL/aegis-main/releases)
[![Version](https://img.shields.io/badge/version-1.7.1-blue.svg)](changelog.md)
[![GitHub issues](https://img.shields.io/github/issues/s3codecL/aegis-main.svg)](https://github.com/s3codecL/aegis-main/issues)
[![GitHub stars](https://img.shields.io/github/stars/s3codecL/aegis-main.svg)](https://github.com/s3codecL/aegis-main/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/s3codecL/aegis-main/graphs/commit-activity)

Una herramienta moderna y funcional de **Open Source Intelligence (OSINT)** diseñada para investigadores de seguridad, analistas de amenazas y profesionales de ciberseguridad.

## 🚀 Novedades v1.7.1

🎨 **Mejoras de UI/UX en Sistema de Autenticación**
- Modo claro/oscuro completamente funcional en todas las páginas
- Toggle de tema e idioma consistente en login.html y admin.html
- Estilos de tarjetas con hover y glow azul (igual que dashboard)
- Placeholders de inputs traducibles (ES/EN)
- Corrección de selectores CSS para temas

🔐 **Sistema de Autenticación (v1.7.0)**
- Login con email/password
- Panel de administración de usuarios
- Roles de usuario (User/Admin)
- Gestión de sesiones con tokens
- OAuth preparado (Google, GitHub)

[Ver todas las novedades en CHANGELOG.md](changelog.md)

## 🎯 Inicio Rápido

| Para Empezar | Para Aprender | Para Administrar |
|--------------|---------------|------------------|
| [Acceder al Dashboard](#-autenticación-v170) (`login.html`) | [Ver Guía Interactiva](#-archivos-principales) (`quickstart.html`) | [Panel Admin](#-panel-de-administración) (`admin.html`) |

> **¿Primera vez?** 👉 Abre `quickstart.html` para tutorial completo, luego `login.html` para acceder  
> **Usuario por defecto** 👉 `admin@aegis.local` / `admin123`  
> **¿Listo para trabajar?** 👉 Login → Dashboard para tus investigaciones OSINT

## 🔐 Autenticación (v1.7.0)

### Credenciales por Defecto
- **Email**: `admin@aegis.local`
- **Password**: `admin123`
- **Rol**: Administrador

### Flujo de Autenticación
```
quickstart.html → login.html → index.html (Dashboard)
                       ↓
                  admin.html (Solo Admin)
```

### Características de Seguridad
- ✅ Validación de email y contraseña
- ✅ Hash de contraseñas
- ✅ Tokens de sesión con expiración (24h)
- ✅ Roles de usuario (user/admin)
- ✅ Protección de rutas
- ✅ Panel de administración completo

📖 **Documentación completa**: [AUTH_GUIDE.md](AUTH_GUIDE.md)

## 📸 Screenshots

<div align="center">

> **📌 Nota**: Las capturas de pantalla se agregarán próximamente. Por ahora, puedes ver la herramienta en acción abriendo `index.html` o `quickstart.html` en tu navegador.

Para contribuir con screenshots, consulta [.github/images/README.md](.github/images/README.md)

</div>

## ✨ Características Principales

### 🔐 Gestión de Usuarios
- **Sistema de autenticación completo**: Login, registro, logout
- **Panel de administración**: CRUD de usuarios, estadísticas
- **Roles y permisos**: Usuario regular vs Administrador
- **Sesiones persistentes**: "Recordarme" con tokens
- **OAuth preparado**: Google y GitHub (integración futura)

### 🎯 Interfaz Moderna
- **Diseño limpio y responsivo**: Optimizado para desktop, tablet y móvil
- **Tema oscuro/claro**: Toggle para cambiar entre temas
- **Barra lateral colapsable**: Mejor aprovechamiento del espacio
- **Panel lateral dinámico**: Para historial y favoritos

### 🔍 Funcionalidades OSINT
- **Detección automática de tipos de búsqueda**:
  - Direcciones IP
  - Dominios y URLs
  - Hashes (MD5, SHA1, SHA256)
  - Direcciones de email
  - Búsquedas generales

- **Persistencia de búsqueda inteligente**:
  - Auto-uso del último término buscado al cambiar entre pestañas
  - Sin necesidad de reingresar la búsqueda en cada herramienta
  - Workflow optimizado para investigaciones multi-herramienta

- **78 herramientas OSINT integradas**:
  - VirusTotal
  - Shodan
  - URLScan
  - Hybrid Analysis
  - DNS Checker
  - Live IP Map
  - Y muchas más...

### 🚨 Accesos Rápidos
- **Botón Downdetector**: Acceso directo en navbar para verificar caídas de sitios web
- **Tooltips informativos**: Descripciones completas en español e inglés
- **Accesos directos**: Funciones frecuentes disponibles con un clic

### 💾 Gestión de Datos
- **Historial de búsquedas**: Almacenado localmente
- **Favoritos personalizados**: Marca tus herramientas favoritas
- **Sincronización con localStorage**: Tus datos se guardan automáticamente
- **Estadísticas en tiempo real**: Seguimiento de búsquedas realizadas
- **Herramientas personalizadas**: Agrega tus propias herramientas OSINT al dashboard

### 🌐 Herramientas Organizadas por Categoría (13 Categorías)
- **Seguridad Web** (15 herramientas) - Análisis y monitoreo de sitios
- **Herramientas de Búsqueda** (12 herramientas) - Motores OSINT generales
- **Información de IP** (9 herramientas) - Geolocalización y análisis de IPs
- **Análisis de Malware** (8 herramientas) - Sandboxes y análisis de amenazas
- **Inteligencia de Amenazas** (8 herramientas) - IOCs y threat intelligence
- **Herramientas DNS** (7 herramientas) - Análisis y propagación DNS
- **Certificados SSL** (3 herramientas) - Transparencia y análisis SSL/TLS
- **Búsqueda de Código** (3 herramientas) - Repositorios y exploits
- **Correo Electrónico** (3 herramientas) - Verificación y análisis de emails
- **Búsqueda de Hash** (3 herramientas) - Reversión de hashes
- **Búsqueda de Personas** (3 herramientas) - OSINT de usuarios y redes sociales
- **Fuentes de Malware** (2 herramientas) - Feeds y bases de datos
- **Mapas de Amenazas** (2 herramientas) - Visualización en tiempo real

### 🎨 Experiencia de Usuario Mejorada
- Búsqueda rápida con sugerencias por tipo
- **Persistencia de búsqueda**: No reingresar términos al cambiar entre pestañas
- Filtrado en tiempo real de herramientas
- Interfaz intuitiva y accesible
- Animaciones suaves
- Soporte multiidioma (ES/EN)
- **Tooltips informativos**: Descripciones completas al pasar el cursor sobre cada herramienta
- **Tooltips bilingües**: Cambian automáticamente entre español e inglés
- **Workflow optimizado**: Buscar una vez, usar en múltiples herramientas

## 🚀 Inicio Rápido

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para acceder a las herramientas OSINT)

### Instalación Rápida

1. **Clonar o descargar el repositorio**
```bash
git clone <url-del-repositorio>
cd aegis-main
```

2. **Abrir en navegador**
   - **Opción 1 (Recomendada)**: Abre `index.html` directamente en tu navegador
   - **Opción 2**: Sirve los archivos usando un servidor local:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server
```

3. **Acceder**
   - Si usaste servidor local: `http://localhost:8000`
   - De lo contrario, simplemente haz doble clic en `index.html`

### 📄 Archivos Principales

El proyecto incluye tres interfaces principales:

#### 🔐 `login.html` - Página de Autenticación (NUEVO en v1.7.0)
**Cuándo usar**: Primera página para acceder al dashboard
- Login con email/password
- Registro de nuevos usuarios
- OAuth con Google/GitHub (preparado)
- Recuperación de contraseña
- "Recordarme" para sesión persistente
- **Acceso**: Punto de entrada obligatorio al dashboard
- **Credenciales por defecto**: `admin@aegis.local` / `admin123`

#### 🏠 `index.html` - Dashboard Principal
**Cuándo usar**: Para trabajo diario de investigación OSINT (requiere autenticación)
- Interfaz completa con todas las 78 herramientas OSINT
- Panel de búsqueda inteligente con detección automática
- Gestión de favoritos y historial
- Filtrado avanzado por categorías
- Estadísticas en tiempo real
- Menú de usuario con logout
- **Acceso**: Requiere login previo

#### 👥 `admin.html` - Panel de Administración (NUEVO en v1.7.0)
**Cuándo usar**: Gestión de usuarios (solo administradores)
- CRUD completo de usuarios
- Estadísticas de usuarios (total, admins, activos, nuevos)
- Cambio de roles (user ↔ admin)
- Visualización de último acceso
- **Acceso**: Solo usuarios con rol "admin"

#### 🚀 `quickstart.html` - Guía Interactiva
**Cuándo usar**: Primera vez usando la herramienta o necesitas referencia rápida
- Tutorial paso a paso con ejemplos prácticos
- Casos de uso comunes
- Explicación de todas las funcionalidades
- Demostraciones visuales
- Tips y mejores prácticas
- **Acceso**: Pública, no requiere autenticación

> **💡 Tip**: Comienza con `quickstart.html` para familiarizarte → `login.html` para acceder → `index.html` para trabajar → `admin.html` (si eres admin) para gestionar usuarios.

### 👥 Panel de Administración

#### Acceso al Panel Admin
1. Inicia sesión con cuenta de administrador
2. Click en tu nombre en el navbar
3. Selecciona "Panel Admin"

#### Funcionalidades Administrativas
- **Crear usuarios**: Añadir manualmente nuevos usuarios
- **Editar usuarios**: Modificar nombre, email, rol
- **Eliminar usuarios**: Remover cuentas (excepto la propia)
- **Cambiar roles**: Promover usuarios a admin o degradar a user
- **Ver estadísticas**:
  - Total de usuarios registrados
  - Cantidad de administradores
  - Usuarios que han iniciado sesión
  - Nuevos usuarios (últimos 7 días)

📖 **Guía completa de administración**: [AUTH_GUIDE.md](AUTH_GUIDE.md)

## 📖 Guía de Uso

### Primera Vez - Autenticación
1. Abre `login.html` en tu navegador
2. Usa credenciales por defecto:
   - Email: `admin@aegis.local`
   - Password: `admin123`
3. O crea una cuenta nueva en la pestaña "Registrarse"
4. Serás redirigido automáticamente al dashboard

### Búsqueda Básica
1. Ingresa tu término de búsqueda en la barra de búsqueda
2. La herramienta detectará automáticamente el tipo (IP, dominio, hash, email)
3. Se mostrarán las herramientas relevantes en la pestaña "Resultados"
4. Haz clic en "Ir" para acceder a cada herramienta con tu búsqueda
5. **Nuevo**: Cambia entre pestañas (Herramientas, Favoritos) - el término se mantiene
6. Selecciona cualquier herramienta y se abrirá automáticamente con tu búsqueda anterior

### Gestionar Favoritos
- Haz clic en el botón de estrella para agregar/quitar favoritos
- Accede rápidamente desde el panel lateral
- Los favoritos se guardan automáticamente

### Ver Historial
- Haz clic en el botón de historial en la navbar
- Ve el historial de todas tus búsquedas
- Haz clic en una búsqueda anterior para repetirla

### Personalizar la Interfaz
- **Cambiar tema**: Haz clic en el botón luna/sol
- **Cambiar idioma**: Haz clic en el botón de idioma (ES/EN)
- **Colapsar sidebar**: Haz clic en el botón X del sidebar

### Agregar Herramientas Personalizadas
1. Haz clic en el botón "Agregar Herramienta" en el sidebar
2. Completa el formulario con la información de tu herramienta:
   - **Nombre**: Nombre descriptivo de la herramienta
   - **ID único**: Identificador sin espacios (ej: mi-herramienta)
   - **URL**: Dirección web de la herramienta
   - **Descripción**: Breve explicación de qué hace
   - **Categoría**: Selecciona la categoría apropiada
   - **Template** (opcional): Usa `{{query}}` para búsquedas dinámicas
3. Haz clic en "Guardar Herramienta"
4. Tu herramienta aparecerá en la categoría seleccionada

> **💡 Nota**: Las herramientas personalizadas se guardan en localStorage y solo estarán disponibles en este navegador.

## 🎓 Flujo de Trabajo Recomendado

### Para Nuevos Usuarios

1. **📖 Empieza con la Guía Rápida**
   - Abre `quickstart.html` en tu navegador
   - Revisa la sección "Primeros Pasos"
   - Prueba los ejemplos interactivos
   - Familiarízate con las categorías de herramientas

2. **🔍 Prueba el Dashboard Principal**
   - Abre `index.html` 
   - Realiza tu primera búsqueda de prueba
   - Explora las diferentes categorías
   - Marca algunas herramientas como favoritas

3. **⚡ Optimiza tu Espacio de Trabajo**
   - Configura tu tema preferido (oscuro/claro)
   - Selecciona tu idioma (ES/EN)
   - Organiza tus herramientas favoritas
   - Revisa el historial para entender el seguimiento

### Para Usuarios Experimentados

1. **🚀 Acceso Directo al Dashboard**
   - Abre directamente `index.html`
   - Usa atajos de teclado para búsquedas rápidas
   - Filtra herramientas por categoría
   - Consulta el historial para investigaciones recurrentes

2. **📚 Consulta Rápida**
   - Usa `quickstart.html` como referencia
   - Busca casos de uso específicos
   - Revisa las mejores prácticas
   - Descubre nuevas herramientas

3. **🔧 Personalización Avanzada**
   - Consulta `technical_docs.md` para detalles técnicos
   - Modifica `js/tools-config.js` para agregar herramientas personalizadas
   - Revisa `changelog.md` para nuevas características

## 📁 Estructura de Archivos

```
aegis-main/
├── index.html           # 🏠 Dashboard principal - Tu herramienta de trabajo diaria
├── quickstart.html      # 🚀 Guía interactiva - Tutorial completo y casos de uso
├── style.css            # Estilos CSS (moderno y responsive)
├── README.md            # Este archivo - Documentación del proyecto
├── changelog.md         # Historial de cambios y versiones
├── technical_docs.md    # Documentación técnica detallada
├── js/                  # Scripts JavaScript
│   ├── app.js              # Lógica principal de la aplicación
│   ├── tools-config.js     # Configuración de herramientas OSINT
│   ├── translations.js     # Traducciones multiidioma (ES/EN)
│   ├── script.js           # Funciones auxiliares
│   └── usage_examples.js   # Ejemplos de uso
└── plugins/             # Extensiones del navegador
    └── favorites - Chrome/ # Plugin de favoritos para Chrome
        ├── manifest.json
        ├── background.js
        └── content.js
```

### 📝 Descripción de Archivos Clave

| Archivo | Propósito | Cuándo Usar |
|---------|-----------|-------------|
| `index.html` | Dashboard principal con todas las funcionalidades | Uso diario, investigaciones OSINT |
| `quickstart.html` | Guía interactiva y tutorial | Primera vez, aprendizaje, referencia |
| `style.css` | Estilos y temas (oscuro/claro) | Personalización visual |
| `js/app.js` | Lógica de búsqueda y gestión de datos | Desarrollo y mantenimiento |
| `js/tools-config.js` | Base de datos de herramientas OSINT | Agregar/modificar herramientas |
| `js/translations.js` | Textos en español e inglés | Agregar nuevos idiomas |

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS
- **JavaScript Vanilla**: Sin dependencias externas
- **Bootstrap 5**: (CDN) para componentes base
- **LocalStorage API**: Para persistencia de datos

## 🎨 Paleta de Colores

- **Principal**: `#3b82f6` (Azul)
- **Éxito**: `#10b981` (Verde)
- **Advertencia**: `#f59e0b` (Ámbar)
- **Peligro**: `#ef4444` (Rojo)
- **Info**: `#0ea5e9` (Cian)

## 📱 Responsividad

La herramienta se adapta perfectamente a:
- 📱 Móviles (< 480px)
- 📱 Tablets (480px - 768px)
- 💻 Laptops (768px - 1024px)
- 🖥️ Desktops (> 1024px)

## 🔐 Privacidad y Seguridad

- **Totalmente local**: Todos los datos se guardan en tu navegador
- **Sin servidor**: No se envían datos a servidores externos
- **Herramientas externas**: Los enlaces abren en ventanas nuevas
- **Código abierto**: Revisa el código fuente cuando lo necesites

## 🤝 Contribuciones

Las contribuciones son bienvenidas y apreciadas. Para contribuir al proyecto:

1. Lee nuestra [Guía de Contribución](CONTRIBUTING.md)
2. Revisa el [Código de Conducta](CODE_OF_CONDUCT.md)
3. Consulta los [Issues abiertos](../../issues)
4. Fork el proyecto
5. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
6. Commit tus cambios (`git commit -m 'feat: add some AmazingFeature'`)
7. Push a la rama (`git push origin feature/AmazingFeature`)
8. Abre un Pull Request

### 🌟 Tipos de Contribuciones Bienvenidas

- 🐛 Reportar bugs
- 💡 Sugerir nuevas funcionalidades
- 🔧 Agregar nuevas herramientas OSINT
- 📝 Mejorar la documentación
- 🌐 Agregar traducciones
- 🎨 Mejorar el diseño UI/UX
- ⚡ Optimización de rendimiento

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.

## 📝 Notas de Desarrollo

### Agregar Nuevas Herramientas

Edita `tools-config.js` y agrega un nuevo objeto:

```javascript
{
  id: "unique-id",
  name: "Nombre de la Herramienta",
  url: "https://www.example.com/search?q=",
  category: "CATEGORY_NAME",
  description: "Descripción breve de la herramienta"
}
```

O con template:

```javascript
{
  id: "unique-id",
  name: "Nombre de la Herramienta",
  template: "https://www.example.com/search?q={{query}}",
  category: "CATEGORY_NAME",
  description: "Descripción breve"
}
```

### Agregar Nuevas Categorías

1. Edita `tools-config.js` para agregar herramientas con la nueva categoría
2. Edita `translations.js` para traducir el nombre de la categoría
3. La interfaz se actualizará automáticamente

### Cambiar Colores

Edita las variables CSS en `style.css`:

```css
:root {
  --color-primary: #3b82f6;
  --color-success: #10b981;
  /* ... más variables ... */
}
```

## 🐛 Solución de Problemas

### Las herramientas no cargan
- Asegúrate de tener conexión a internet
- Verifica que los URLs en `tools-config.js` sean correctos
- Abre la consola (F12) para ver mensajes de error

### Los favoritos no se guardan
- Verifica que localStorage esté habilitado en tu navegador
- Prueba con otro navegador
- Limpia el caché del navegador

### Problemas de idioma
- Recarga la página después de cambiar idioma
- Verifica que `translations.js` esté cargado correctamente

## 📞 Soporte y Contacto

### 💬 Obtener Ayuda

- 📖 [Documentación](README.md)
- 🚀 [Guía Rápida](quickstart.html)
- 📋 [Issues](../../issues) - Para reportar bugs o solicitar features
- 💡 [Discussions](../../discussions) - Para preguntas y discusiones generales

### 🔒 Reportar Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, consulta nuestra [Política de Seguridad](SECURITY.md).

### 📧 Contacto

- GitHub: [@s3codecL](https://github.com/s3codecL)
- Issues: [Reportar un problema](../../issues/new)

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

Copyright (c) 2025 s3codecL - Todos los derechos reservados bajo los términos de la licencia MIT.

## 🙏 Agradecimientos

- Desarrolladores de [Tabler UI](https://tabler.io/)
- Comunidad OSINT global
- Todos los [contribuidores](../../graphs/contributors) que hacen posible este proyecto
- Proveedores de herramientas OSINT integradas

## 📊 Estadísticas del Proyecto

![GitHub repo size](https://img.shields.io/github/repo-size/s3codecL/aegis-main)
![GitHub contributors](https://img.shields.io/github/contributors/s3codecL/aegis-main)
![GitHub last commit](https://img.shields.io/github/last-commit/s3codecL/aegis-main)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/s3codecL/aegis-main)

## 🗺️ Roadmap

### ✅ Completado (v1.3.0)
- [x] **Herramientas personalizadas** - Agrega tus propias herramientas OSINT
- [x] **Soporte completo dark/light mode** - Temas optimizados
- [x] **Traducción completa ES/EN** - Interfaz multiidioma
- [x] **Tooltips informativos bilingües** - Descripciones completas en español e inglés
- [x] **Botón Downdetector** - Acceso rápido a verificación de caídas de sitios

### 🚧 En Desarrollo
- [ ] Integración con APIs de herramientas OSINT
- [ ] Exportación de resultados (PDF, JSON, CSV)
- [ ] Plantillas de investigación personalizables
- [ ] Más botones de acceso rápido para funciones frecuentes

### 📋 Planificado
- [ ] Modo de trabajo colaborativo
- [ ] Integración con navegadores (extensión mejorada)
- [ ] Modo offline con cache (PWA)
- [ ] Análisis de grafos de relaciones
- [ ] Más idiomas (FR, DE, PT, IT)

Ver [issues](../../issues) para el roadmap completo.

---

**Hecho con ❤️ para la comunidad de seguridad**

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-s3codecL-181717?style=for-the-badge&logo=github)](https://github.com/s3codecL)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**⭐ Si te resulta útil, dale una estrella al proyecto ⭐**

</div>
