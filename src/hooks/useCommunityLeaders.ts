import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export type CommunityLeader = {
  id: number
  name: string
  title: string
  description: string
  avatar_url: string
  is_published?: boolean
  display_order?: number
}

export const useCommunityLeaders = () => {
  const [leaders, setLeaders] = useState<CommunityLeader[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeaders = async () => {
    setLoading(true)
    try {
      // First, try with the new columns
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

      if (error) {
        setError(error.message)
      } else {
        setLeaders(data || [])
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchLeaders()
  }, [])

  return { leaders, loading, error, refetch: fetchLeaders }
}
