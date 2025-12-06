# 🛡️ Aegis Dashboard - Herramienta de Investigación

Una herramienta moderna y funcional de **Open Source Intelligence (OSINT)** diseñada para investigadores de seguridad, analistas de amenazas y profesionales de ciberseguridad.

## ✨ Características Principales

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

- **50+ herramientas OSINT integradas**:
  - VirusTotal
  - Shodan
  - URLScan
  - Hybrid Analysis
  - Y muchas más...

### 💾 Gestión de Datos
- **Historial de búsquedas**: Almacenado localmente
- **Favoritos personalizados**: Marca tus herramientas favoritas
- **Sincronización con localStorage**: Tus datos se guardan automáticamente
- **Estadísticas en tiempo real**: Seguimiento de búsquedas realizadas

### 🌐 Herramientas Organizadas por Categoría
- Herramientas de Búsqueda
- Información de IP
- Inteligencia de Amenazas
- Análisis de Malware
- Análisis de Correo Electrónico
- Y más...

### 🎨 Experiencia de Usuario Mejorada
- Búsqueda rápida con sugerencias por tipo
- Filtrado en tiempo real de herramientas
- Interfaz intuitiva y accesible
- Animaciones suaves
- Soporte multiidioma (ES/EN)

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para acceder a las herramientas OSINT)

### Instalación Rápida

1. **Clonar o descargar el repositorio**
```bash
git clone <url-del-repositorio>
cd osint-main
```

2. **Abrir en navegador**
   - Simplemente abre `index.html` en tu navegador web
   - O sirve los archivos usando un servidor local:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server
```

3. **Acceder**
   - Abre `http://localhost:8000` en tu navegador

## 📖 Guía de Uso

### Búsqueda Básica
1. Ingresa tu término de búsqueda en la barra de búsqueda
2. La herramienta detectará automáticamente el tipo (IP, dominio, hash, email)
3. Se mostrarán las herramientas relevantes en la pestaña "Resultados"
4. Haz clic en "Abrir" para acceder a cada herramienta con tu búsqueda

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

## 📁 Estructura de Archivos

```
osint-main/
├── index.html           # Archivo HTML principal
├── style.css            # Estilos CSS (moderno y responsive)
├── app.js               # Lógica principal de la aplicación
├── tools-config.js      # Configuración de herramientas OSINT
├── translations.js      # Traducciones (ES/EN)
├── README.md            # Este archivo
└── plugins/             # Favoritos navegador
    └── OSINT Favorites - Chrome/
```

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

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

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

Para reportar bugs o sugerencias:
- Abre un issue en el repositorio
- Contacta al desarrollador principal

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver LICENSE.md para más detalles.

## 🙏 Agradecimientos

- Desarrolladores de Tabler UI
- Comunidad OSINT
- Todos los contribuidores

---

**Hecho con ❤️ para la comunidad de seguridad** by [@s3codecL](https://github.com/s3codecL)
