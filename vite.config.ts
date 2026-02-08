
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  const apiKey = env.API_KEY || process.env.API_KEY || '';
  const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
  
  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html
            .replace('__VITE_API_KEY_PLACEHOLDER__', apiKey)
            .replace('__VITE_SUPABASE_URL_PLACEHOLDER__', supabaseUrl)
            .replace('__VITE_SUPABASE_ANON_KEY_PLACEHOLDER__', supabaseAnonKey);
        },
      },
    ],
    define: {
      'process.env.API_KEY': 'window.__env__.API_KEY',
      'process.env.VITE_SUPABASE_URL': 'window.__env__.SUPABASE_URL',
      'process.env.VITE_SUPABASE_ANON_KEY': 'window.__env__.SUPABASE_ANON_KEY',
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-supabase': ['@supabase/supabase-js'],
            'vendor-genai': ['@google/genai']
          }
        }
      }
    }
  };
});
