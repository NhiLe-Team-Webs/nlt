import { useEffect, useState } from 'react';
import { MOCK_PARTNER_PROJECTS } from '../data/mockData';

export interface PartnerProject {
  id: number;
  name: string;
  description: string;
  background_color?: string;
  image_url?: string;
  display_order: number;
  is_published: boolean;
}

export function usePartnerProjects() {
  const [projects, setProjects] = useState<PartnerProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        setProjects(MOCK_PARTNER_PROJECTS);
        setLoading(false);
      }, 500);
    }
    fetchProjects();
  }, []);

  return { projects, loading, error };
}
