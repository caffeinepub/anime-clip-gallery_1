import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { Clip, ClipRequest } from "../backend.d.ts";

export function useGetAllClips() {
  const { actor, isFetching } = useActor();
  return useQuery<Clip[]>({
    queryKey: ["clips"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllClips();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetClipsByCategory(category: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Clip[]>({
    queryKey: ["clips", "category", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getClipsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useSearchClips(searchText: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Clip[]>({
    queryKey: ["clips", "search", searchText],
    queryFn: async () => {
      if (!actor || !searchText) return [];
      return actor.searchClips(searchText);
    },
    enabled: !!actor && !isFetching && searchText.length > 0,
  });
}

export function useGetAllCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddClip() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      animeName: string;
      category: string;
      videoUrl: string;
      thumbnailUrl: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.addClip(
        params.title,
        params.animeName,
        params.category,
        params.videoUrl,
        params.thumbnailUrl
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clips"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteClip() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (clipId: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.deleteClip(clipId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clips"] });
    },
  });
}

export function useGetAllClipRequests() {
  const { actor, isFetching } = useActor();
  return useQuery<ClipRequest[]>({
    queryKey: ["clipRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllClipRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitClipRequest() {
  const queryClient = useQueryClient();
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: {
      title: string;
      animeName: string;
      description: string;
      requesterContact: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitClipRequest(
        params.title,
        params.animeName,
        params.description,
        params.requesterContact
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clipRequests"] });
    },
  });
}
