import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: './',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                admin: resolve(__dirname, 'admin.html'),
                incidents: resolve(__dirname, 'incidents.html'),
                login: resolve(__dirname, 'login.html'),
                quickstart: resolve(__dirname, 'quickstart.html'),
            },
        },
        outDir: 'dist',
    },
    server: {
        port: 3000,
        open: true,
    },
});
