import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: 'localhost',
        port: 4200,
    },
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                background: 'src/services/Background.ts',
            },
            output: {
                entryFileNames: `[name].js`,
            },
        },
    },
});
