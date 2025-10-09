import { supabase } from '../lib/supabaseClient'
import { uploadAvatar } from '../lib/uploadAvatar'

// Fetch published leaders ordered by display_order
export const getPublishedLeaders = async () => {
  try {
    // Try with the new columns first
    let { data, error } = await supabase
      .from('community_leaders')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true })

    // If is_published column doesn't exist, fallback to simpler query
    if (error && error.message.includes('is_published')) {
      console.log('is_published column not found, falling back to simple query...')
      const fallbackResult = await supabase
        .from('community_leaders')
        .select('*')
        .order('id', { ascending: true })
      
      data = fallbackResult.data
      error = fallbackResult.error
    }

    if (error) throw error
    return data || []
  } catch (err) {
    console.error('Error fetching published leaders:', err)
    throw err
  }
}

// insert
export const addLeader = async (leader: {
  name: string
  title: string
  description: string
  file?: File
}) => {
  let avatarUrl = ''
  if (leader.file) avatarUrl = await uploadAvatar(leader.file)

  const { error } = await supabase.from('community_leaders').insert([
    {
      name: leader.name,
      title: leader.title,
      description: leader.description,
      avatar_url: avatarUrl,
    },
  ])
  if (error) throw error
}

// update
export const updateLeader = async (
  id: number,
  leader: {
    name: string
    title: string
    description: string
    file?: File
  }
) => {
  let avatarUrl = leader.file ? await uploadAvatar(leader.file) : undefined

  const { error } = await supabase
    .from('community_leaders')
    .update({
      name: leader.name,
      title: leader.title,
      description: leader.description,
      ...(avatarUrl && { avatar_url: avatarUrl }),
    })
    .eq('id', id)

  if (error) throw error
}

export const deleteLeader = async (id: number) => {
  const { error } = await supabase
    .from('community_leaders')
    .delete()
    .eq('id', id)

  if (error) throw error
}