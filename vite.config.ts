import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3001,
      host: true,
    },
    build: {
      target: 'es2022',
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            gsap: ['gsap'],
            ui: ['lucide-react'],
          },
        },
      },
      sourcemap: mode === 'development',
    },
    define: {
      'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version),
    },
    preview: {
      port: 3001,
      host: true,
    },
  };
});