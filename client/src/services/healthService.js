import { api } from "../lib/api.js";

export async function getHealth() {
  const { data } = await api.get("/health");
  return data;
}
