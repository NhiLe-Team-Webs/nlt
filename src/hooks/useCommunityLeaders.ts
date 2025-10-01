import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export type CommunityLeader = {
  id: number
  name: string
  title: string
  description: string
  avatar_url: string
}

export const useCommunityLeaders = () => {
  const [leaders, setLeaders] = useState<CommunityLeader[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeaders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('community_leaders')
      .select('*')
      .order('id', { ascending: true })

    if (error) setError(error.message)
    else setLeaders(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchLeaders()
  }, [])

  return { leaders, loading, error, refetch: fetchLeaders }
}
