import { createClient } from '@supabase/supabase-js'

// 👇 Lấy từ file .env của bạn
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Khởi tạo client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
