import { useQuery } from "@tanstack/react-query";
import { getBraidServices } from "../../services/braidServicesService.js";

export function useBraidServices() {
  return useQuery({
    queryKey: ["braid-services"],
    queryFn: getBraidServices
  });
}
