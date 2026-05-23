import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBraidService } from "../../services/braidServicesService.js";

export function useDeleteBraidService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBraidService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["braid-services"] });
    }
  });
}
