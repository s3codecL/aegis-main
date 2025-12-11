# 🔐 Guía de Autenticación - Aegis Dashboard v1.7.0

> ⚠️ **Seguridad:** No publiques ni compartas claves privadas, tokens o secretos (como los de Google reCAPTCHA) en la documentación, ejemplos, capturas ni foros públicos.

## 📋 Descripción General

La versión 1.7.0 introduce un sistema completo de autenticación que protege el acceso al dashboard y permite la gestión de múltiples usuarios con diferentes roles.

## 🚀 Inicio Rápido

### Primera Vez - Usuario Admin
1. Abrir `login.html` en el navegador
2. Usar las credenciales por defecto:
   - **Email**: `admin@aegis.local`
   - **Password**: `admin123`
3. Click en "Iniciar Sesión"
4. Serás redirigido al dashboard principal

### Crear Nueva Cuenta
1. En `login.html`, hacer click en la pestaña **"Registrarse"**
2. Completar el formulario:
   - Nombre completo
   - Correo electrónico
   - Contraseña (mínimo 8 caracteres)
   - Confirmar contraseña
   - Aceptar términos y condiciones
3. Click en "Crear Cuenta"
4. Automáticamente serás autenticado y redirigido al dashboard

## 👥 Gestión de Usuarios (Solo Admin)

### Acceder al Panel de Administración
1. Iniciar sesión con cuenta de administrador
2. En el navbar, click en tu nombre de usuario
3. Seleccionar **"Panel Admin"** del menú dropdown
4. Serás redirigido a `admin.html`

### Estadísticas del Panel
El panel muestra 4 métricas clave:
- **Total Usuarios**: Cantidad total de usuarios registrados
- **Administradores**: Número de usuarios con rol admin
- **Usuarios Activos**: Usuarios que han iniciado sesión al menos una vez
- **Nuevos (7 días)**: Usuarios registrados en los últimos 7 días

### Crear Usuario Manualmente
1. En el panel admin, click en **"Añadir Usuario"**
2. Completar el formulario:
   - Nombre completo
   - Correo electrónico
   - Contraseña (mínimo 8 caracteres)
   - Rol: Usuario o Administrador
3. Click en "Guardar"

### Editar Usuario
1. En la tabla de usuarios, click en el icono de **lápiz** (Editar)
2. Modificar los campos necesarios:
   - Nombre
   - Email
   - Rol
   - **Nota**: No se puede cambiar la contraseña desde edición
3. Click en "Guardar"

### Eliminar Usuario
1. En la tabla de usuarios, click en el icono de **papelera** (Eliminar)
2. Confirmar la eliminación en el modal
3. **Nota**: No puedes eliminar tu propia cuenta

## 🔒 Roles y Permisos

### Usuario Regular (role: "user")
- ✅ Acceso al dashboard principal (`index.html`)
- ✅ Usar todas las herramientas OSINT
- ✅ Gestionar favoritos personales
- ✅ Ver historial de búsquedas
- ✅ Cambiar idioma y tema
- ❌ No acceso al panel de administración

### Administrador (role: "admin")
- ✅ Todo lo que puede hacer un usuario regular
- ✅ Acceso al panel de administración (`admin.html`)
- ✅ Crear, editar y eliminar usuarios
- ✅ Cambiar roles de usuarios
- ✅ Ver estadísticas de usuarios

## 🔐 Funcionalidades de Seguridad

### Validaciones Implementadas
- **Email único**: No se permiten emails duplicados
- **Formato de email**: Validación con regex
- **Contraseña mínima**: 8 caracteres obligatorios
- **Confirmación de contraseña**: Deben coincidir en registro
- **Términos y condiciones**: Requeridos para registro

### Sesiones
- **Duración**: 24 horas desde el login
- **Recordarme**: Si se activa, la sesión persiste en `localStorage`
- **Sin recordarme**: La sesión se guarda en `sessionStorage` (se borra al cerrar el navegador)
- **Expiración**: Las sesiones expiradas redirigen automáticamente a login

### Protección de Rutas
- **Dashboard (`index.html`)**: Requiere autenticación
  - Si no estás autenticado → Redirige a `login.html`
- **Panel Admin (`admin.html`)**: Requiere rol de administrador
  - Si no eres admin → Alerta y redirige a `index.html`
  - Si no estás autenticado → Redirige a `login.html`

## 📱 Flujo de Navegación

```
quickstart.html
    ↓ (Click "Acceder al Dashboard")
login.html
    ↓ (Login exitoso)
index.html (Dashboard)
    ↓ (Si eres admin, click menú → "Panel Admin")
admin.html (Panel de Administración)
```

## 🔧 Funciones Principales

### En login.html
- `switchTab(tab)` - Cambiar entre Login/Registro
- `showForgotPassword(e)` - Mostrar mensaje de recuperación de contraseña
- `loginWithGoogle()` - Preparado para OAuth de Google (futuro)
- `loginWithGithub()` - Preparado para OAuth de GitHub (futuro)

### En js/auth.js
- `Auth.init()` - Inicializar sistema de autenticación
- `Auth.handleLogin(e)` - Procesar formulario de login
- `Auth.handleRegister(e)` - Procesar formulario de registro
- `Auth.requireAuth()` - Guard para proteger rutas
- `Auth.requireAdmin()` - Guard para rutas de admin
- `Auth.logout()` - Cerrar sesión
- `Auth.getCurrentUser()` - Obtener usuario actual
- `Auth.isAdmin()` - Verificar si es administrador
- `Auth.getUsers()` - Obtener todos los usuarios
- `Auth.updateUser(user)` - Actualizar usuario
- `Auth.deleteUser(userId)` - Eliminar usuario

### En index.html
- `handleLogout(e)` - Cerrar sesión desde navbar

### En admin.html
- `loadStats()` - Cargar estadísticas de usuarios
- `loadUsers()` - Cargar tabla de usuarios
- `showAddUserModal()` - Mostrar modal de creación
- `editUser(userId)` - Editar usuario existente
- `deleteUser(userId, userName)` - Confirmar eliminación
- `confirmDelete()` - Ejecutar eliminación

## 💾 Almacenamiento Local

### localStorage
```javascript
// Sesión (si "Recordarme" está activado)
"aegisSession": {
  userId: "user_123...",
  email: "user@example.com",
  name: "Usuario",
  role: "user",
  expiresAt: 1234567890,
  token: "token_abc..."
}

// Base de datos de usuarios
"aegisUsers": [
  {
    id: "user_123...",
    name: "Admin",
    email: "admin@aegis.local",
    password: "YWRtaW4xMjNhZWdpc19zYWx0XzIwMjU=", // hash
    role: "admin",
    createdAt: "2025-12-10T12:00:00.000Z",
    lastLogin: "2025-12-10T14:30:00.000Z"
  }
]
```

### sessionStorage
```javascript
// Sesión (si NO se activó "Recordarme")
"aegisSession": { /* mismo formato que en localStorage */ }
```

## 🔄 OAuth (Futuro)

Los botones de Google y GitHub están preparados para integración futura:

### Para implementar OAuth real:

#### Google OAuth
```javascript
// En js/auth.js - loginWithGoogle()
const clientId = 'TU_GOOGLE_CLIENT_ID';
const redirectUri = 'https://tudominio.com/oauth-callback.html';
window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
```

#### GitHub OAuth
```javascript
// En js/auth.js - loginWithGithub()
const clientId = 'TU_GITHUB_CLIENT_ID';
const redirectUri = 'https://tudominio.com/oauth-callback.html';
window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
```

Necesitarás:
1. Registrar la aplicación en Google Cloud Console / GitHub Developer Settings
2. Obtener Client ID y Client Secret
3. Configurar URL de redirección autorizada
4. Crear página `oauth-callback.html` para manejar el token
5. Implementar exchange de código por token

## ⚠️ Consideraciones de Seguridad

### Para Desarrollo (Actual)
- ✅ Hash de contraseñas con base64 (SIMULADO)
- ✅ Validación básica de inputs
- ✅ Protección de rutas
- ✅ Roles de usuario
- ⚠️ Datos almacenados en localStorage (sin cifrar)

### Para Producción (Recomendaciones)
1. **Hash de contraseñas**: Usar bcrypt, scrypt o Argon2
   ```javascript
   // Reemplazar en auth.js
   const bcrypt = require('bcryptjs');
   hashPassword: function(password) {
     return bcrypt.hashSync(password, 10);
   }
   ```

2. **Backend real**: Implementar API REST con:
   - Node.js + Express
   - Base de datos (PostgreSQL, MongoDB)
   - JWT para tokens
   - Rate limiting
   - HTTPS obligatorio

3. **Cifrado de datos**: Usar Web Crypto API
   ```javascript
   // Cifrar datos sensibles en localStorage
   const encrypted = await crypto.subtle.encrypt(
     { name: "AES-GCM", iv: iv },
     key,
     data
   );
   ```

4. **CSP (Content Security Policy)**:
   ```html
   <meta http-equiv="Content-Security-Policy" content="
     default-src 'self';
     script-src 'self' https://cdn.jsdelivr.net;
     style-src 'self' 'unsafe-inline';
   ">
   ```

5. **CSRF Protection**: Tokens CSRF en formularios

6. **Session Security**:
   - Renovación automática de tokens
   - Logout en todas las pestañas
   - Detección de sesiones sospechosas

## 🐛 Solución de Problemas

### No puedo iniciar sesión
1. Verificar que el email esté registrado
2. Verificar que la contraseña sea correcta (mínimo 8 caracteres)
3. Limpiar localStorage: `localStorage.clear()` en consola del navegador
4. Crear cuenta nueva desde "Registrarse"

### No puedo acceder al panel admin
1. Verificar que tu rol sea "admin"
2. Iniciar sesión con `admin@aegis.local` / `admin123`
3. Verificar que `admin.html` esté en la misma carpeta

### La sesión expira muy rápido
1. Activar "Recordarme" al iniciar sesión
2. Modificar duración en `js/auth.js`:
   ```javascript
   tokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 días
   ```

### Perdí acceso de administrador
1. Abrir consola del navegador (F12)
2. Ejecutar:
   ```javascript
   localStorage.clear();
   location.reload();
   ```
3. Iniciar sesión con credenciales por defecto

## 📚 Recursos Adicionales

- **Changelog completo**: `changelog.md`
- **Auditoría de seguridad**: `SECURITY_AUDIT.md`
- **Documentación técnica**: `technical_docs.md`
- **Guía rápida**: `quickstart.html`

## 🎓 Ejemplos de Uso

### Crear cuenta para equipo de investigación
```javascript
// Como admin, en admin.html
1. Click "Añadir Usuario"
2. Nombre: "Juan Investigador"
3. Email: "juan@investigaciones.com"
4. Password: "SecurePass123"
5. Rol: "Usuario"
6. Click "Guardar"
```

### Promover usuario a admin
```javascript
// En admin.html
1. Buscar usuario en la tabla
2. Click icono de lápiz (Editar)
3. Cambiar Rol de "Usuario" a "Administrador"
4. Click "Guardar"
```

### Resetear contraseña (manual)
```javascript
// En consola del navegador
const users = JSON.parse(localStorage.getItem('aegisUsers'));
const user = users.find(u => u.email === 'usuario@email.com');
user.password = Auth.hashPassword('NuevaPassword123');
localStorage.setItem('aegisUsers', JSON.stringify(users));
```

---

**Versión**: 1.7.0  
**Fecha**: Diciembre 10, 2025  
**Autor**: Aegis Development Team
