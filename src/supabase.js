import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ddjpujhcxkbvvnxhdqtm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkanB1amhjeGtidnZueGhkcXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTM3NjgsImV4cCI6MjA4OTM4OTc2OH0.Lzf3ACi0jmh_4owJ5MLFrkkYEfL0CprTbvsS04GoR0E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
