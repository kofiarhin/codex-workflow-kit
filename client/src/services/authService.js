import { api } from "../lib/api.js";

export async function getCurrentUser() {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function login(credentials) {
  const { data } = await api.post("/auth/login", credentials);
  return data;
}

export async function register(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function logout() {
  const { data } = await api.post("/auth/logout");
  return data;
}

export async function updateProfile(profile) {
  const { data } = await api.patch("/auth/profile", profile);
  return data;
}
