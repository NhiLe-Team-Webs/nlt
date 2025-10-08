import { createClient } from '@supabase/supabase-js'

// ⚠️ Dán URL thật từ Supabase của bạn
const supabaseUrl = 'https://rnzqwnwctvaxeyxxphfp.supabase.co'

// ⚠️ Dán anon key thật (vào Project Settings → API → Project API keys)
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

// Tạo client
export const supabase = createClient(supabaseUrl, supabaseKey)
