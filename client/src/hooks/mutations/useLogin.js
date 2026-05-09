import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/authService.js";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["current-user"], data);
    }
  });
}
