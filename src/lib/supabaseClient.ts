import { createClient } from '@supabase/supabase-js'

// Estas son las credenciales públicas, es seguro tenerlas en el código
const supabaseUrl = 'https://yotxiizthmwgzsqwiopy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdHhpaXp0aG13Z3pzcXdpb3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNjUxNTcsImV4cCI6MjA1Mzg0MTE1N30.EIDp-XCJZ-LNGqcQ2rVA6ur06EbLhiJimdl8NG6BuUI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)