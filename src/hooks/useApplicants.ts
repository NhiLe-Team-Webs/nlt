import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

type ApplicantFilters = {
  status?: string;
  source?: string;
  search?: string;
};

export function useApplicants(filters: ApplicantFilters = {}) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicants = async () => {
    setIsLoading(true);
    let query = supabase
      .from("applicants")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters.status) query = query.eq("status", filters.status);
    if (filters.source) query = query.eq("source", filters.source);
    if (filters.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
      );
    }

    const { data, error } = await query;
    if (error) setError(error.message);
    else setData(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchApplicants();
  }, [filters]);

  return { data, isLoading, error, refetch: fetchApplicants };
}
