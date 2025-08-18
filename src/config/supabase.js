import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vjaemninbyasytikqdjy.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Environment variables check:', {
    VITE_SUPABASE_URL: supabaseUrl ? 'Set' : 'Missing',
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? 'Set' : 'Missing',
    url: supabaseUrl,
    key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'Missing'
})

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
