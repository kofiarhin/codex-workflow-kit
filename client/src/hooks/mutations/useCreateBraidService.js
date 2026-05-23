import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBraidService } from "../../services/braidServicesService.js";

export function useCreateBraidService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBraidService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["braid-services"] });
    }
  });
}
