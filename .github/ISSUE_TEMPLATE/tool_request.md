---
name: 🔧 Nueva Herramienta OSINT
about: Proponer una nueva herramienta OSINT para agregar al dashboard
title: '[TOOL] '
labels: tool, enhancement
assignees: ''
---

## 🔍 Información de la Herramienta

**Nombre de la Herramienta:**

**URL:**

**Descripción:**
Una breve descripción de qué hace la herramienta.

## 📋 Detalles de Configuración

**Categoría Sugerida:**
- [ ] Búsqueda General
- [ ] Información de IP
- [ ] Inteligencia de Amenazas
- [ ] Análisis de Malware
- [ ] Análisis de Email
- [ ] Análisis de Dominio
- [ ] Redes Sociales
- [ ] Otra: _______

**URL de Búsqueda:**
```
https://ejemplo.com/search?q=
```

**¿Requiere Template?**
- [ ] No - URL simple con query string
- [ ] Sí - Requiere template tipo: `https://ejemplo.com/{{query}}/results`

Si requiere template, proporciona el patrón:
```
https://ejemplo.com/...
```

## 🎯 Tipos de Búsqueda Soportados

¿Qué tipos de búsqueda soporta la herramienta?

- [ ] IP
- [ ] Dominio
- [ ] URL
- [ ] Hash (MD5/SHA1/SHA256)
- [ ] Email
- [ ] CVE
- [ ] Username
- [ ] Otro: _______

## 🔑 API Key / Registro

- [ ] Requiere registro
- [ ] Requiere API key
- [ ] Completamente gratuita
- [ ] Freemium (gratis con límites)

**Detalles:**

## ✨ Valor Agregado

**¿Por qué esta herramienta es útil para investigaciones OSINT?**

**¿Qué información única proporciona?**

## 📊 Popularidad

**¿Es una herramienta reconocida en la comunidad?**
- [ ] Muy conocida
- [ ] Medianamente conocida
- [ ] Nueva/emergente

**Referencias:**
- Sitio web oficial:
- Documentación:
- Menciones en blogs/artículos:

## 🧪 Testing

**¿Has probado la herramienta personalmente?**
- [ ] Sí
- [ ] No

**Ejemplo de búsqueda que funciona:**
```
https://ejemplo.com/search?q=8.8.8.8
```

## 📝 Configuración JSON Propuesta

```json
{
  "id": "nombre-herramienta",
  "name": "Nombre de la Herramienta",
  "url": "https://ejemplo.com/search?q=",
  "category": "THREAT_INTELLIGENCE",
  "description": "Descripción breve de la herramienta",
  "tags": ["tag1", "tag2"]
}
```

## ✔️ Checklist

- [ ] He verificado que la herramienta no existe ya en la configuración
- [ ] La herramienta es gratuita o tiene una versión gratuita
- [ ] He probado que la URL de búsqueda funciona
- [ ] He categorizado correctamente la herramienta
- [ ] He proporcionado toda la información necesaria
