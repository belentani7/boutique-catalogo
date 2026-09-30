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
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      port: 3001,
      host: true,
    },
    build: {
      target: 'es2022',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'vendor';
              if (id.includes('gsap')) return 'gsap';
              if (id.includes('lucide')) return 'ui';
            }
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