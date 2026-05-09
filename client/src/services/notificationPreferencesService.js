import { api } from "../lib/api.js";

export async function getNotificationPreferences() {
  const { data } = await api.get("/notification-preferences");
  return data.notificationPreferences;
}

export async function updateNotificationPreferences(notificationPreferences) {
  const { data } = await api.patch("/notification-preferences", {
    notificationPreferences
  });
  return data.notificationPreferences;
}
