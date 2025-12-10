/**
 * Aegis Dashboard - Authentication System
 * Version: 1.7.2
 * 
 * Sistema de autenticación con soporte para:
 * - Login con email/password
 * - reCAPTCHA v2 (protección anti-bots)
 * - OAuth (Google, GitHub)
 * - Gestión de sesiones
 * - Roles de usuario (user, admin)
 */

const Auth = {
    // Configuración
    config: {
        sessionKey: 'aegisSession',
        usersKey: 'aegisUsers',
        tokenExpiry: 24 * 60 * 60 * 1000, // 24 horas
        defaultUser: {
            email: 'admin@aegis.local',
            password: 'admin123', // En producción, usar hash
            name: 'Administrador',
            role: 'admin',
            avatar: null
        }
    },

    // Estado
    state: {
        currentUser: null,
        isAuthenticated: false
    },

    /**
     * Inicializar sistema de autenticación
     */
    init: function () {
        this.loadSession();
        this.initializeDefaultUsers();
        this.setupEventListeners();
    },

    /**
     * Inicializar usuarios por defecto
     */
    initializeDefaultUsers: function () {
        const users = this.getUsers();
        
        // Crear usuario admin por defecto si no existe
        if (!users.find(u => u.email === this.config.defaultUser.email)) {
            users.push({
                id: this.generateId(),
                ...this.config.defaultUser,
                password: this.hashPassword(this.config.defaultUser.password),
                createdAt: new Date().toISOString(),
                lastLogin: null
            });
            this.saveUsers(users);
        }
    },

    /**
     * Configurar event listeners
     */
    setupEventListeners: function () {
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    },

    /**
     * Manejar login
     */
    handleLogin: async function (e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Validar reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            const lang = localStorage.getItem('osintLanguage') || 'es';
            const message = typeof t !== 'undefined' ? t('RECAPTCHA_ERROR', lang) : 'Por favor, completa el reCAPTCHA.';
            this.showAlert(message, 'danger');
            return;
        }

        if (!email || !password) {
            this.showAlert('Por favor, completa todos los campos.', 'danger');
            return;
        }

        // Buscar usuario
        const users = this.getUsers();
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            this.showAlert('Correo electrónico no registrado.', 'danger');
            grecaptcha.reset(); // Reset reCAPTCHA en login
            return;
        }

        // Verificar contraseña
        if (!this.verifyPassword(password, user.password)) {
            this.showAlert('Contraseña incorrecta.', 'danger');
            grecaptcha.reset(); // Reset reCAPTCHA en login
            return;
        }

        // Actualizar último login
        user.lastLogin = new Date().toISOString();
        this.updateUser(user);

        // Crear sesión
        this.createSession(user, rememberMe);

        // Mostrar mensaje de éxito
        this.showAlert('¡Bienvenido de vuelta!', 'success');

        // Redirigir al dashboard
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    },

    /**
     * Manejar registro
     */
    handleRegister: async function (e) {
        e.preventDefault();

        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;
        const passwordConfirm = document.getElementById('register-password-confirm').value;
        const acceptTerms = document.getElementById('accept-terms').checked;

        // Validar reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse(1); // Index 1 para el segundo widget
        if (!recaptchaResponse) {
            const lang = localStorage.getItem('osintLanguage') || 'es';
            const message = typeof t !== 'undefined' ? t('RECAPTCHA_ERROR', lang) : 'Por favor, completa el reCAPTCHA.';
            this.showAlert(message, 'danger');
            return;
        }

        // Validaciones
        if (!name || !email || !password || !passwordConfirm) {
            this.showAlert('Por favor, completa todos los campos.', 'danger');
            return;
        }

        if (!acceptTerms) {
            this.showAlert('Debes aceptar los términos y condiciones.', 'danger');
            return;
        }

        if (password.length < 8) {
            this.showAlert('La contraseña debe tener al menos 8 caracteres.', 'danger');
            return;
        }

        if (password !== passwordConfirm) {
            this.showAlert('Las contraseñas no coinciden.', 'danger');
            return;
        }

        // Validar formato de email
        if (!this.validateEmail(email)) {
            this.showAlert('Formato de correo electrónico inválido.', 'danger');
            grecaptcha.reset(1); // Reset reCAPTCHA en register (widget #1)
            return;
        }

        // Verificar si el usuario ya existe
        const users = this.getUsers();
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            this.showAlert('Este correo electrónico ya está registrado.', 'danger');
            grecaptcha.reset(1); // Reset reCAPTCHA en register (widget #1)
            return;
        }

        // Crear nuevo usuario
        const newUser = {
            id: this.generateId(),
            name: name,
            email: email,
            password: this.hashPassword(password),
            role: 'user',
            avatar: null,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };

        users.push(newUser);
        this.saveUsers(users);

        // Crear sesión
        this.createSession(newUser, false);

        // Mostrar mensaje de éxito
        this.showAlert('¡Cuenta creada exitosamente!', 'success');

        // Redirigir al dashboard
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    },

    /**
     * Login con Google (simulado)
     */
    loginWithGoogle: function () {
        this.showAlert('Funcionalidad de Google OAuth en desarrollo. Por ahora, usa el login con email.', 'danger');
        
        // En producción, implementar OAuth real:
        // const clientId = 'YOUR_GOOGLE_CLIENT_ID';
        // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
    },

    /**
     * Login con GitHub (simulado)
     */
    loginWithGithub: function () {
        this.showAlert('Funcionalidad de GitHub OAuth en desarrollo. Por ahora, usa el login con email.', 'danger');
        
        // En producción, implementar OAuth real:
        // const clientId = 'YOUR_GITHUB_CLIENT_ID';
        // window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    },

    /**
     * Crear sesión
     */
    createSession: function (user, rememberMe) {
        const session = {
            userId: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            expiresAt: Date.now() + this.config.tokenExpiry,
            rememberMe: rememberMe,
            token: this.generateToken()
        };

        // Guardar en localStorage
        localStorage.setItem(this.config.sessionKey, JSON.stringify(session));

        // Si no es "recordarme", guardar también en sessionStorage
        if (!rememberMe) {
            sessionStorage.setItem(this.config.sessionKey, JSON.stringify(session));
        }

        this.state.currentUser = user;
        this.state.isAuthenticated = true;
    },

    /**
     * Cargar sesión
     */
    loadSession: function () {
        // Intentar cargar desde sessionStorage primero
        let sessionData = sessionStorage.getItem(this.config.sessionKey);
        
        // Si no existe, intentar desde localStorage
        if (!sessionData) {
            sessionData = localStorage.getItem(this.config.sessionKey);
        }

        if (!sessionData) {
            this.state.isAuthenticated = false;
            return false;
        }

        try {
            const session = JSON.parse(sessionData);

            // Verificar si la sesión ha expirado
            if (Date.now() > session.expiresAt) {
                this.logout(false);
                return false;
            }

            // Cargar usuario completo
            const users = this.getUsers();
            const user = users.find(u => u.id === session.userId);

            if (!user) {
                this.logout(false);
                return false;
            }

            this.state.currentUser = user;
            this.state.isAuthenticated = true;
            return true;
        } catch (e) {
            console.error('Error loading session:', e);
            this.logout(false);
            return false;
        }
    },

    /**
     * Cerrar sesión
     */
    logout: function (redirect = true) {
        localStorage.removeItem(this.config.sessionKey);
        sessionStorage.removeItem(this.config.sessionKey);
        this.state.currentUser = null;
        this.state.isAuthenticated = false;

        if (redirect) {
            window.location.href = 'login.html';
        }
    },

    /**
     * Verificar si el usuario está autenticado
     */
    isAuthenticated: function () {
        return this.state.isAuthenticated && this.state.currentUser !== null;
    },

    /**
     * Verificar si el usuario es admin
     */
    isAdmin: function () {
        return this.isAuthenticated() && this.state.currentUser.role === 'admin';
    },

    /**
     * Obtener usuario actual
     */
    getCurrentUser: function () {
        return this.state.currentUser;
    },

    /**
     * Requerir autenticación (para proteger páginas)
     */
    requireAuth: function (redirectToLogin = true) {
        if (!this.loadSession()) {
            if (redirectToLogin) {
                window.location.href = 'login.html';
            }
            return false;
        }
        return true;
    },

    /**
     * Requerir rol de admin
     */
    requireAdmin: function () {
        if (!this.requireAuth()) {
            return false;
        }

        if (!this.isAdmin()) {
            alert('Acceso denegado. Se requieren permisos de administrador.');
            window.location.href = 'index.html';
            return false;
        }

        return true;
    },

    // ========== Gestión de Usuarios ==========

    /**
     * Obtener todos los usuarios
     */
    getUsers: function () {
        try {
            const users = localStorage.getItem(this.config.usersKey);
            return users ? JSON.parse(users) : [];
        } catch (e) {
            console.error('Error loading users:', e);
            return [];
        }
    },

    /**
     * Guardar usuarios
     */
    saveUsers: function (users) {
        try {
            localStorage.setItem(this.config.usersKey, JSON.stringify(users));
        } catch (e) {
            console.error('Error saving users:', e);
        }
    },

    /**
     * Actualizar usuario
     */
    updateUser: function (updatedUser) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === updatedUser.id);
        
        if (index !== -1) {
            users[index] = updatedUser;
            this.saveUsers(users);
            
            // Si es el usuario actual, actualizar estado
            if (this.state.currentUser && this.state.currentUser.id === updatedUser.id) {
                this.state.currentUser = updatedUser;
            }
        }
    },

    /**
     * Eliminar usuario
     */
    deleteUser: function (userId) {
        const users = this.getUsers();
        const filteredUsers = users.filter(u => u.id !== userId);
        this.saveUsers(filteredUsers);
    },

    // ========== Utilidades ==========

    /**
     * Generar ID único
     */
    generateId: function () {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Generar token
     */
    generateToken: function () {
        return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 16);
    },

    /**
     * Hash de contraseña (simulado - en producción usar bcrypt)
     */
    hashPassword: function (password) {
        // En producción, usar una librería de hashing real como bcrypt
        // Por ahora, simulamos con base64 (NO SEGURO PARA PRODUCCIÓN)
        return btoa(password + 'aegis_salt_2025');
    },

    /**
     * Verificar contraseña
     */
    verifyPassword: function (password, hash) {
        return this.hashPassword(password) === hash;
    },

    /**
     * Validar email
     */
    validateEmail: function (email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Mostrar alerta
     */
    showAlert: function (message, type = 'danger') {
        const container = document.getElementById('alert-container');
        if (!container) return;

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        container.innerHTML = '';
        container.appendChild(alert);

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            alert.remove();
        }, 5000);
    },

    /**
     * Inicializar traducciones
     */
    initTranslations: function (lang) {
        if (typeof t === 'undefined') return;

        // Traducir elementos con data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = t(key, lang);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Traducir placeholders con data-placeholder
        document.querySelectorAll('[data-placeholder]').forEach(element => {
            const key = element.getAttribute('data-placeholder');
            const translation = t(key, lang);
            if (translation) {
                element.placeholder = translation;
            }
        });
    }
};

// Funciones globales para llamar desde HTML
function loginWithGoogle() {
    Auth.loginWithGoogle();
}

function loginWithGithub() {
    Auth.loginWithGithub();
}

function showAlert(message, type) {
    Auth.showAlert(message, type);
}

// Auto-inicializar en páginas de autenticación
if (window.location.pathname.includes('login.html')) {
    document.addEventListener('DOMContentLoaded', function () {
        Auth.init();
    });
}

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}
