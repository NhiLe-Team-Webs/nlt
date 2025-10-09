import { supabase } from '../lib/supabaseClient'

// Function to check the structure of community_leaders table
export const checkTableStructure = async () => {
  try {
    // First, let's try to get some sample data to see what columns exist
    const { data, error } = await supabase
      .from('community_leaders')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Error fetching data:', error)
      return null
    }

    console.log('Sample data structure:', data)
    return data
  } catch (err) {
    console.error('Error:', err)
    return null
  }
}

// Function to get all leaders without filtering (for now)
export const getAllLeaders = async () => {
  try {
    const { data, error } = await supabase
      .from('community_leaders')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching leaders:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Error:', err)
    return []
  }
}