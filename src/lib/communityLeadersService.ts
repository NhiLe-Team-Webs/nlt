import { supabase } from '../lib/supabaseClient'
import { uploadAvatar } from '../lib/uploadAvatar'

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