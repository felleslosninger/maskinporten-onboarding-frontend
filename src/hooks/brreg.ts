import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {BrregEnhet} from "../types/brreg";

export const QK_BRREG = 'QK_BRREG';

export const useEnhet = (orgnr: string) => {
    return useQuery({
        queryKey: [QK_BRREG],
        queryFn: async () => {
            const path = `https://data.brreg.no/enhetsregisteret/api/enheter/${orgnr}`;
            const res = await axios.get<BrregEnhet>(path);
            return res.data;
        }
    });
};