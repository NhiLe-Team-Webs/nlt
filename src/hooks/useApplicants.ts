import { useState, useEffect } from "react";

type ApplicantFilters = {
  status?: string;
  source?: string;
  search?: string;
};

export function useApplicants(_filters: ApplicantFilters = {}) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, _setError] = useState<string | null>(null);

  const fetchApplicants = async () => {
    setIsLoading(true);
    // Return empty mock data for applicants for now
    setTimeout(() => {
      setData([]);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchApplicants();
  }, [_filters]);

  return { data, isLoading, error, refetch: fetchApplicants };
}
