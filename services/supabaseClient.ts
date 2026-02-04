
import { createClient } from '@supabase/supabase-js';

// The values provided by the user project. 
// We use these as robust fallbacks to ensure the app never crashes on initialization.
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://kgxltvabfoqdwdzdnzqf.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtneGx0dmFiZm9xZHdkemRuenFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NjI1NjIsImV4cCI6MjA4NTUzODU2Mn0.V0oLdgqB-W9ndWI51HwKsA6d38deeqMHn-9-isQbmxY';

// Log current connection for user debugging
console.log(`StartUpGenie: Connecting to Supabase at ${SUPABASE_URL}`);
if (SUPABASE_URL === 'https://kgxltvabfoqdwdzdnzqf.supabase.co') {
  console.warn("StartUpGenie: Warning - Using fallback Project URL. Ensure VITE_SUPABASE_URL is set to your own project if login fails.");
}

// Explicitly cast the client to 'any' to resolve environment-specific TypeScript 
// errors where standard auth methods are reported as missing on the SupabaseAuthClient type.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY) as any;
