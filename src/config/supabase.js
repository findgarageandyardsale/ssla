import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vjaemninbyasytikqdjy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqYWVtbmluYnlhc3l0aWtxZGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwOTU0ODgsImV4cCI6MjA3MDY3MTQ4OH0.yi9jfRO7UuH2BBUHoGSd8jloCqoF1CY6TMXwieleVQo"

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables:', {
        url: supabaseUrl ? 'Set' : 'Missing',
        key: supabaseAnonKey ? 'Set' : 'Missing'
    })
    throw new Error(`Missing Supabase environment variables. 
    Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your production environment.
    Current values: URL=${supabaseUrl ? 'Set' : 'Missing'}, KEY=${supabaseAnonKey ? 'Set' : 'Missing'}`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false
    },
    global: {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    }
})
