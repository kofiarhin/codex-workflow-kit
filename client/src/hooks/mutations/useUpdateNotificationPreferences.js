import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotificationPreferences } from "../../services/notificationPreferencesService.js";

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationPreferences,
    onSuccess: (notificationPreferences) => {
      queryClient.setQueryData(
        ["notification-preferences"],
        notificationPreferences
      );
      queryClient.setQueryData(["current-user"], (current) => {
        if (!current?.user) return current;
        return {
          ...current,
          user: {
            ...current.user,
            notificationPreferences
          }
        };
      });
    }
  });
}
