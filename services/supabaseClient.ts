import { createClient } from '@supabase/supabase-js';

// Define hardcoded defaults as a last resort to ensure the app never crashes on boot
const DEFAULT_URL = "https://kgxltvabfoqdwdzdnzqf.supabase.co";
const DEFAULT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtneGx0dmFiZm9xZHdkemRuenFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NjI1NjIsImV4cCI6MjA4NTUzODU2Mn0.V0oLdgqB-W9ndWI51HwKsA6d38deeqMHn-9-isQbmxY";

/**
 * Helper to resolve the correct environment value.
 * Tries window.__env__ (set in index.html) first, then process.env (Vite define).
 */
const getEnvValue = (key: 'SUPABASE_URL' | 'SUPABASE_ANON_KEY', fallback: string): string => {
  const windowVal = (window as any).__env__?.[key];
  if (windowVal && !windowVal.startsWith('__VITE')) return windowVal;
  
  // Vite will replace these strings during build
  const processKey = key === 'SUPABASE_URL' ? process.env.VITE_SUPABASE_URL : process.env.VITE_SUPABASE_ANON_KEY;
  if (processKey && !processKey.startsWith('__VITE')) return processKey;

  return fallback;
};

const finalUrl = getEnvValue('SUPABASE_URL', DEFAULT_URL);
const finalKey = getEnvValue('SUPABASE_ANON_KEY', DEFAULT_KEY);

if (finalUrl === DEFAULT_URL) {
  console.warn("StartUpGenie: Using fallback Supabase URL. Check build environment variables.");
}

export const supabase = createClient(finalUrl, finalKey) as any;
