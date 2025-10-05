import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface PartnerProject {
  id: number;
  name: string;
  description: string;
  background_color?: string;
  image_url?: string;
  display_order: number;
  is_published: boolean;
  // ...other fields
}

export function usePartnerProjects() {
  const [projects, setProjects] = useState<PartnerProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('partner_projects')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      if (error) {
        setError(error.message);
        setProjects([]);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return { projects, loading, error };
}
