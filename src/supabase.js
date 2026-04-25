import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nfejtmxprmnycqzwdqen.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mZWp0bXhwcm1ueWNxendkcWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5Mjc0ODksImV4cCI6MjA5MjUwMzQ4OX0.c7_gjW71Wvr_gRliGfCs1_RM67ioaV_8QL70OyPXvT0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);