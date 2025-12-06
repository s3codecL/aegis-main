# Contribuyendo a Aegis Dashboard

¡Gracias por tu interés en contribuir a Aegis Dashboard! Este documento proporciona las pautas para contribuir al proyecto.

## 📋 Código de Conducta

Al participar en este proyecto, te comprometes a mantener un ambiente respetuoso y colaborativo. Lee nuestro [Código de Conducta](CODE_OF_CONDUCT.md).

## 🚀 Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor:

1. **Verifica** que no exista ya un issue similar
2. **Crea un nuevo issue** con:
   - Título descriptivo
   - Pasos para reproducir el bug
   - Comportamiento esperado vs actual
   - Screenshots si es posible
   - Versión del navegador y sistema operativo

### Sugerir Mejoras

Para nuevas funcionalidades:

1. **Abre un issue** describiendo:
   - El problema que resuelve
   - Cómo funcionaría la solución
   - Ejemplos de uso
2. **Espera feedback** antes de comenzar a desarrollar

### Pull Requests

#### Proceso

1. **Fork** el repositorio
2. **Crea una rama** desde `main`:
   ```bash
   git checkout -b feature/nombre-descriptivo
   # o
   git checkout -b fix/nombre-del-bug
   ```

3. **Realiza tus cambios** siguiendo los estándares de código

4. **Haz commits** claros y descriptivos:
   ```bash
   git commit -m "feat: agregar búsqueda por CVE"
   git commit -m "fix: corregir filtro de categorías"
   git commit -m "docs: actualizar README con ejemplos"
   ```

5. **Push** a tu fork:
   ```bash
   git push origin feature/nombre-descriptivo
   ```

6. **Abre un Pull Request** hacia `main`

#### Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formateo, punto y coma, etc. (sin cambio de código)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Mantenimiento, dependencias, etc.

Ejemplos:
```bash
feat: agregar soporte para búsqueda de CVE
fix: corregir detección de hashes SHA-512
docs: actualizar guía de instalación
style: formatear código según prettier
refactor: reorganizar estructura de tools-config
```

## 💻 Estándares de Código

### JavaScript

- **ES6+**: Usa características modernas de JavaScript
- **Nomenclatura**:
  - Variables y funciones: `camelCase`
  - Constantes: `UPPER_CASE`
  - Clases: `PascalCase`
- **Indentación**: 2 espacios
- **Comillas**: Preferir comillas simples `'`
- **Punto y coma**: Obligatorio al final de statements

```javascript
// ✅ Bueno
const searchQuery = 'example.com';
const REGEX_PATTERNS = {
  IP: /^(\d{1,3}\.){3}\d{1,3}$/,
  DOMAIN: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
};

function detectQueryType(query) {
  if (REGEX_PATTERNS.IP.test(query)) {
    return 'ip';
  }
  // ...
}

// ❌ Malo
var SearchQuery = "example.com"
const regex_patterns = {
  ip: /^(\d{1,3}\.){3}\d{1,3}$/
}

function Detect_Query_Type(query)
{
    if(regex_patterns.ip.test(query)) return 'ip'
}
```

### HTML

- **Indentación**: 2 espacios
- **Atributos**: Comillas dobles
- **Semántica**: Usar elementos HTML5 apropiados
- **Accesibilidad**: Incluir atributos ARIA cuando sea necesario

```html
<!-- ✅ Bueno -->
<button class="btn btn-primary" aria-label="Buscar información">
  <i class="icon-search"></i>
  Buscar
</button>

<!-- ❌ Malo -->
<div onclick="search()" class='button'>
    Buscar
</div>
```

### CSS

- **Indentación**: 2 espacios
- **Nomenclatura**: BEM o descriptiva
- **Variables**: Usar CSS custom properties
- **Mobile-first**: Media queries de menor a mayor

```css
/* ✅ Bueno */
.search-form__input {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

@media (min-width: 768px) {
  .search-form__input {
    padding: 1rem 1.5rem;
  }
}

/* ❌ Malo */
.searchInput {
    padding:10px;
    border:1px solid #ccc;
}
```

## 🔧 Agregar Nuevas Herramientas OSINT

Para agregar una nueva herramienta a la configuración:

1. **Edita** `js/tools-config.js`
2. **Agrega** el objeto de configuración:

```javascript
{
  id: "unique-tool-id",
  name: "Nombre de la Herramienta",
  url: "https://ejemplo.com/search?q=",
  category: "THREAT_INTELLIGENCE", // o la categoría apropiada
  description: "Descripción breve de qué hace la herramienta",
  tags: ["tag1", "tag2"] // opcional
}
```

3. **Traduce** el nombre si es necesario en `js/translations.js`
4. **Prueba** que funcione con diferentes tipos de búsqueda
5. **Documenta** en tu PR por qué es útil esta herramienta

## 🌐 Agregar Traducciones

Para agregar un nuevo idioma:

1. **Edita** `js/translations.js`
2. **Agrega** tu código de idioma:

```javascript
const translations = {
  es: { /* español */ },
  en: { /* inglés */ },
  fr: { /* francés - NUEVO */
    AEGIS_DASHBOARD: "Tableau de bord Aegis",
    SEARCH_BUTTON: "Rechercher",
    // ...
  }
};
```

3. **Traduce todas las claves** existentes
4. **Actualiza** la UI para incluir el selector de idioma

## ✅ Checklist antes de PR

- [ ] El código sigue los estándares de estilo
- [ ] He probado mis cambios en Chrome, Firefox y Safari
- [ ] He probado en móvil (responsive)
- [ ] He actualizado la documentación si es necesario
- [ ] He agregado comentarios en código complejo
- [ ] No hay console.log() olvidados
- [ ] Los commits siguen las convenciones
- [ ] He actualizado el CHANGELOG.md si aplica

## 🧪 Testing

Antes de enviar tu PR, verifica:

1. **Búsquedas**: Prueba con IP, dominio, hash, email
2. **Filtros**: Verifica que el filtrado funcione
3. **Favoritos**: Agrega/elimina favoritos
4. **Historial**: Verifica que se guarde correctamente
5. **Temas**: Prueba modo claro y oscuro
6. **Idiomas**: Cambia entre idiomas disponibles
7. **Responsive**: Prueba en móvil, tablet y desktop

## 📞 Preguntas

Si tienes preguntas:

1. Revisa los [Issues existentes](../../issues)
2. Abre un nuevo issue con la etiqueta `question`
3. Contacta a [@s3codecL](https://github.com/s3codecL)

## 🎉 Reconocimientos

Todos los contribuidores serán reconocidos en el README. ¡Gracias por tu contribución!

---

**¡Feliz coding!** 🚀
