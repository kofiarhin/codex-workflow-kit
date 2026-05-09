import { useQuery } from "@tanstack/react-query";
import { getNotificationPreferences } from "../../services/notificationPreferencesService.js";

export function useNotificationPreferences() {
  return useQuery({
    queryKey: ["notification-preferences"],
    queryFn: getNotificationPreferences,
    retry: false
  });
}
