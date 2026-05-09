import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/authService.js";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["current-user"] });
    }
  });
}
