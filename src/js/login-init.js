import Auth from './auth.js';
import { t } from './translations.js';

/**
 * Aegis Board - Login Page Initializer
 * Handles all logic for login.html
 */

const LoginInit = {
    widgets: {
        login: null,
        register: null
    },

    init: function () {
        console.log("LoginInit: Initializing...");
        // Expose to window for inline onclicks (until migration)
        window.switchTab = (tab) => this.switchTab(tab);
        window.loginWithGoogle = () => Auth.loginWithGoogle();
        window.loginWithGithub = () => Auth.loginWithGithub();
        window.showForgotPassword = (e) => {
            e.preventDefault();
            Auth.showAlert('Por favor contacta al administrador para restablecer tu contraseña.', 'info');
        };

        // Apply theme immediately
        const savedTheme = localStorage.getItem('osintTheme') || 'dark';
        document.documentElement.setAttribute('data-bs-theme', savedTheme);

        // Load reCAPTCHA script if enabled
        if (Auth.config.useRecaptcha) {
            this.loadRecaptcha();
        } else {
            // Hide recaptcha containers if disabled
            document.querySelectorAll('.g-recaptcha').forEach(el => el.style.display = 'none');
        }

        // Setup event listeners (theme/lang toggle)
        this.setupEventListeners();

        // Attach form submit listeners FIRST (before Auth.init which may fail)
        const loginForm = document.getElementById('login-form');
        if (loginForm) loginForm.addEventListener('submit', (e) => { e.preventDefault(); Auth.handleLogin(e); });

        const registerForm = document.getElementById('register-form');
        if (registerForm) registerForm.addEventListener('submit', (e) => { e.preventDefault(); Auth.handleRegister(e); });

        // Restore tab
        const savedTab = localStorage.getItem('osintActiveTab');
        if (savedTab) {
            this.switchTab(savedTab);
            localStorage.removeItem('osintActiveTab');
        }

        // Initialize Auth
        if (Auth.init) Auth.init();
        const lang = localStorage.getItem('osintLanguage') || 'es';
        if (Auth.initTranslations) Auth.initTranslations(lang);

        // Update Icons and Lang Text
        this.updateIcons(savedTheme);
        const langBtnText = document.getElementById('lang-text');
        if (langBtnText) {
            langBtnText.textContent = lang.toUpperCase();
        }
    },

    loadRecaptcha: function () {
        const lang = localStorage.getItem('osintLanguage') || 'es';
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit&hl=${lang}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        window.onloadCallback = () => this.renderRecaptchas();
    },

    renderRecaptchas: function () {
        const savedTheme = localStorage.getItem('osintTheme') || 'dark';

        // Render Login reCAPTCHA
        const loginEl = document.getElementById('login-recaptcha');
        if (loginEl) {
            loginEl.innerHTML = '';
            this.widgets.login = grecaptcha.render(loginEl, {
                'sitekey': '6Le4gicsAAAAAE1h_NDHNKKc6U2EXa99-tP8mnD5',
                'theme': savedTheme
            });
        }

        // Render Register reCAPTCHA
        const registerEl = document.getElementById('register-recaptcha');
        if (registerEl) {
            registerEl.innerHTML = '';
            this.widgets.register = grecaptcha.render(registerEl, {
                'sitekey': '6Le4gicsAAAAAE1h_NDHNKKc6U2EXa99-tP8mnD5',
                'theme': savedTheme
            });
        }
    },

    setupEventListeners: function () {
        // Theme Toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('osintTheme', newTheme);
            this.updateIcons(newTheme);
            // Reset reCAPTCHA with new theme (full re-render after short delay)
            if (Auth.config.useRecaptcha && typeof grecaptcha !== 'undefined') {
                try {
                    if (this.widgets.login !== null) grecaptcha.reset(this.widgets.login);
                    if (this.widgets.register !== null) grecaptcha.reset(this.widgets.register);
                } catch (err) {
                    // If reset fails, re-render
                    setTimeout(() => this.renderRecaptchas(), 100);
                }
            }
        });

        // Language Toggle
        document.getElementById('language-toggle')?.addEventListener('click', () => {
            const current = localStorage.getItem('osintLanguage') || 'es';
            const next = current === 'es' ? 'en' : 'es';
            localStorage.setItem('osintLanguage', next);
            // Apply translations immediately without page reload
            this.applyTranslations(next);
            const langBtnText = document.getElementById('lang-text');
            if (langBtnText) langBtnText.textContent = next.toUpperCase();
        });

    },

    switchTab: function (tab) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        if (tab === 'login') {
            document.querySelector('[data-i18n="LOGIN"]')?.classList.add('active');
            document.getElementById('login-tab')?.classList.add('active');
        } else {
            document.querySelector('[data-i18n="REGISTER"]')?.classList.add('active');
            document.getElementById('register-tab')?.classList.add('active');
        }
    },

    updateIcons: function (theme) {
        const sun = document.querySelector('.icon-sun');
        const moon = document.querySelector('.icon-moon');
        // In dark mode: show sun (to switch to light). In light mode: show moon (to switch to dark).
        if (sun) sun.style.display = theme === 'dark' ? 'inline-block' : 'none';
        if (moon) moon.style.display = theme === 'dark' ? 'none' : 'inline-block';
    },

    applyTranslations: function (lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const val = t(key, lang);
            if (val) {
                if (el.tagName === 'INPUT') el.placeholder = val;
                else el.textContent = val;
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = t(key, lang);
            if (val) el.placeholder = val;
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const val = t(key, lang);
            if (val) el.title = val;
        });
    }
};

document.addEventListener('DOMContentLoaded', () => LoginInit.init());

export default LoginInit;
