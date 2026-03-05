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

        // Setup event listeners
        this.setupEventListeners();

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
        document.getElementById('theme-toggle')?.addEventListener('click', (e) => {
            const current = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('osintTheme', newTheme);
            this.renderRecaptchas();
            this.updateIcons(newTheme);
        });

        // Language Toggle
        document.getElementById('language-toggle')?.addEventListener('click', () => {
            const current = localStorage.getItem('osintLanguage') || 'es';
            const next = current === 'es' ? 'en' : 'es';
            localStorage.setItem('osintLanguage', next);

            // Re-load to apply language to recaptcha script
            const activeTabBtn = document.querySelector('.tab-btn.active');
            const mode = activeTabBtn?.getAttribute('data-i18n')?.includes('REGISTER') ? 'register' : 'login';
            localStorage.setItem('osintActiveTab', mode);
            window.location.reload();
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
        if (sun) sun.style.display = theme === 'dark' ? 'inline-block' : 'none';
        if (moon) moon.style.display = theme === 'dark' ? 'none' : 'inline-block';
    }
};

document.addEventListener('DOMContentLoaded', () => LoginInit.init());

export default LoginInit;
