import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBraidService } from "../../services/braidServicesService.js";

export function useUpdateBraidService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBraidService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["braid-services"] });
    }
  });
}
