
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Robustly extract keys from Vite env OR system process.env (for CI/CD and deployment platforms)
  const apiKey = env.API_KEY || (process as any).env.API_KEY || '';
  const supabaseUrl = env.VITE_SUPABASE_URL || (process as any).env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || (process as any).env.VITE_SUPABASE_ANON_KEY || '';
  
  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          // Injects environment variables into index.html placeholders
          return html
            .replace('__VITE_API_KEY_PLACEHOLDER__', apiKey)
            .replace('__VITE_SUPABASE_URL_PLACEHOLDER__', supabaseUrl)
            .replace('__VITE_SUPABASE_ANON_KEY_PLACEHOLDER__', supabaseAnonKey);
        },
      },
    ],
    define: {
      // Maps process.env calls to window.__env__ for runtime access in the client bundle
      'process.env.API_KEY': 'window.__env__.API_KEY',
      'process.env.VITE_SUPABASE_URL': 'window.__env__.SUPABASE_URL',
      'process.env.VITE_SUPABASE_ANON_KEY': 'window.__env__.SUPABASE_ANON_KEY',
    },
    build: {
      outDir: 'dist',
      target: 'esnext',
      sourcemap: false,
    },
  };
});
