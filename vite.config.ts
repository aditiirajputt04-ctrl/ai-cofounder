
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.API_KEY || '';
  
  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          // Replaces the placeholder in index.html with the actual API Key from the environment
          return html.replace('__VITE_API_KEY_PLACEHOLDER__', apiKey);
        },
      },
    ],
    define: {
      // Map process.env.API_KEY to the global window variable for runtime flexibility
      // This ensures the application code remains clean while supporting the window.__env__ requirement.
      'process.env.API_KEY': 'window.__env__.API_KEY',
    },
    build: {
      outDir: 'dist',
      target: 'esnext',
    },
  };
});
