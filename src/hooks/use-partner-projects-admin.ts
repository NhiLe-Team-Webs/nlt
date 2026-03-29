import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPartnerProject,
  deletePartnerProject,
  listPartnerProjects,
  togglePartnerProjectPublish,
  updatePartnerProject,
  type CreatePartnerProjectInput,
  type PartnerProjectRecord,
  type TogglePartnerProjectPublishInput,
  type UpdatePartnerProjectInput,
} from "@/lib/partnerProjectsAdmin";

export const PARTNER_PROJECTS_ADMIN_QUERY_KEY = [
  "partner-projects-admin",
] as const;

export function usePartnerProjectsAdmin() {
  const queryClient = useQueryClient();

  const projectsQuery = useQuery({
    queryKey: PARTNER_PROJECTS_ADMIN_QUERY_KEY,
    queryFn: listPartnerProjects,
  });

  const createMutation = useMutation({
    mutationFn: (input: CreatePartnerProjectInput) =>
      createPartnerProject(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: PARTNER_PROJECTS_ADMIN_QUERY_KEY,
      });
      console.info("Created partner project", { id: data.id, slug: data.slug });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (input: UpdatePartnerProjectInput) =>
      updatePartnerProject(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: PARTNER_PROJECTS_ADMIN_QUERY_KEY,
      });
      console.info("Updated partner project", { id: data.id, slug: data.slug });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (input: TogglePartnerProjectPublishInput) =>
      togglePartnerProjectPublish(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: PARTNER_PROJECTS_ADMIN_QUERY_KEY,
      });
      console.info("Toggled publish state", {
        id: data.id,
        is_published: data.is_published,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => deletePartnerProject(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: PARTNER_PROJECTS_ADMIN_QUERY_KEY,
      });
      console.info("Deleted partner project", { id: variables });
    },
  });

  return {
    projects: projectsQuery.data ?? [],
    isLoading: projectsQuery.isLoading,
    isFetching: projectsQuery.isFetching,
    isError: projectsQuery.isError,
    error: projectsQuery.error,
    refetch: projectsQuery.refetch,
    createProject: createMutation.mutateAsync,
    updateProject: updateMutation.mutateAsync,
    togglePublish: toggleMutation.mutateAsync,
    deleteProject: deleteMutation.mutateAsync,
    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    toggling: toggleMutation.isPending,
    deleting: deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    toggleError: toggleMutation.error,
    deleteError: deleteMutation.error,
  };
}

export type { PartnerProjectRecord };
