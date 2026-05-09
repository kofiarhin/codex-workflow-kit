import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../services/authService.js";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["current-user"], data);
    }
  });
}
