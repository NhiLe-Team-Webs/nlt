// src/hooks/usePartnerTestimonials.ts
import { useQuery } from '@tanstack/react-query'
import { MOCK_PARTNER_TESTIMONIALS } from '../data/mockData'

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
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          // Mapping MOCK_PARTNER_TESTIMONIALS to match the hook's type
          const mapped = MOCK_PARTNER_TESTIMONIALS.map(t => ({
            id: t.id,
            partner_name: t.name,
            partner_title: t.company,
            testimonial: t.content,
            avatar_url: t.avatar_url,
            display_order: t.display_order,
            is_published: t.is_published
          }));
          resolve(mapped as PartnerTestimonial[]);
        }, 400);
      });
    },
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  })
}
