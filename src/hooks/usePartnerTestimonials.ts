// src/hooks/usePartnerTestimonials.ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabaseClient'

export type PartnerTestimonial = {
  id: number
  partner_name: string
  partner_title: string
  testimonial: string
  avatar_url: string
  display_order: number
  is_published: boolean
}

export const usePartnerTestimonials = () => {
  return useQuery<PartnerTestimonial[], Error>({
    queryKey: ['partner_testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partner_testimonials')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      return data ?? []
    },
    staleTime: 1000 * 60, // cache 1 phút
    refetchOnWindowFocus: false, // không cần refetch quá gắt
  })
}
