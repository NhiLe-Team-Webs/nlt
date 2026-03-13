import { useEffect, useState } from 'react'
import { MOCK_COMMUNITY_LEADERS } from '../data/mockData'

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
      // Return mock data after a small delay to simulate network
      setTimeout(() => {
        setLeaders(MOCK_COMMUNITY_LEADERS)
        setLoading(false)
      }, 300)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaders()
  }, [])

  return { leaders, loading, error, refetch: fetchLeaders }
}
