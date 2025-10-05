import { supabase } from './supabaseClient'

export const uploadAvatar = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from('avatars') // bucket tên avatars
    .upload(fileName, file, { cacheControl: '3600', upsert: false })

  if (error) throw error

  const { data: publicUrl } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName)

  return publicUrl.publicUrl
}
