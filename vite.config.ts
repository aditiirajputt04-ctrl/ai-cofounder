
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // We use process.cwd() which is globally available in Node environments like Netlify build.
  // Fix: Explicitly cast process to any to access cwd() in environments where standard Node types are not globally inferred.
  const env = loadEnv(mode, (process as any).cwd(), '');
  const apiKey = env.API_KEY || '';
  const supabaseUrl = env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';
  
  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          // Replaces placeholders in index.html with values from the build environment
          return html
            .replace('__VITE_API_KEY_PLACEHOLDER__', apiKey)
            .replace('__VITE_SUPABASE_URL_PLACEHOLDER__', supabaseUrl)
            .replace('__VITE_SUPABASE_ANON_KEY_PLACEHOLDER__', supabaseAnonKey);
        },
      },
    ],
    define: {
      // Map process.env calls to the global window.__env__ object for runtime access
      'process.env.API_KEY': 'window.__env__.API_KEY',
      'process.env.VITE_SUPABASE_URL': 'window.__env__.SUPABASE_URL',
      'process.env.VITE_SUPABASE_ANON_KEY': 'window.__env__.SUPABASE_ANON_KEY',
    },
    build: {
      outDir: 'dist',
      target: 'esnext',
    },
  };
});
