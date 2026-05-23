import { api } from "../lib/api.js";

export async function getBraidServices() {
  const response = await api.get("/braid-services");
  return response.data.braidServices;
}

export async function createBraidService(payload) {
  const response = await api.post("/braid-services", payload);
  return response.data.braidService;
}

export async function updateBraidService({ id, ...payload }) {
  const response = await api.patch(`/braid-services/${id}`, payload);
  return response.data.braidService;
}

export async function deleteBraidService(id) {
  const response = await api.delete(`/braid-services/${id}`);
  return response.data;
}
