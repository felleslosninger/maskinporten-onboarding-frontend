import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BrregEnhet } from "../types/brreg";

export const QK_BRREG = "QK_BRREG";

export const useEnhet = (orgnr: string, enabled?: boolean) => {
  return useQuery({
    queryKey: [QK_BRREG, orgnr],
    queryFn: async () => {
      const path = `https://data.brreg.no/enhetsregisteret/api/enheter/${orgnr}`;
      const res = await axios.get<BrregEnhet>(path);
      return res.data;
    },
    enabled: enabled || true
  });
};
