import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {ApiClients, ApiScopes} from "../types/api";

export const QK_SCOPES = 'QK_SCOPES';
export const QK_CLIENTS = 'QK_CLIENTS';

export const useScopes = () => {
    return useQuery({
        queryKey: [QK_SCOPES],
        queryFn: async () => {
            const res = await axios.get<ApiScopes>("/datasharing/scope/access");
            return res.data;
        }
    })
};

export const useClients = () => {
    return useQuery({
        queryKey: [QK_CLIENTS],
        queryFn: async () => {
            const res = await axios.get<ApiClients>("/datasharing/client");
            return res.data;
        }
    })
}