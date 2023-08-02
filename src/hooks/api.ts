import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {ApiClient, ApiClients, ApiScopes, RequestApiClientBody} from "../types/api";

export const QK_SCOPES = 'QK_SCOPES';
export const QK_CLIENTS = 'QK_CLIENTS';

const axiosConfig = {withCredentials: true}

export const useScopes = () => {
    return useQuery({
        queryKey: [QK_SCOPES],
        queryFn: async () => {
            // @ts-ignore
            const res = await axios.get<ApiScopes>(`${window.env.SIMPLIFIED_ONBOARDING_API_URL}/api/datasharing/consumer/scope/access`, axiosConfig);
            return res.data;
        }
    });
};

export const useClients = () => {
    return useQuery({
        queryKey: [QK_CLIENTS],
        queryFn: async () => {
            // @ts-ignore
            const res = await axios.get<ApiClients>(`${window.env.SIMPLIFIED_ONBOARDING_API_URL}/api/datasharing/consumer/client`, axiosConfig);
            return res.data;
        },
        retry: 0
    });
}

export const useClientMutation = () => {
    const client = useQueryClient();
     return useMutation({
        mutationFn: (newClient: RequestApiClientBody) => {
            // @ts-ignore
            return axios.post<ApiClient>(`${window.env.SIMPLIFIED_ONBOARDING_API_URL}/api/datasharing/consumer/client`, newClient, axiosConfig);
        },
        onSuccess: (res) => {
            client.invalidateQueries({queryKey: [QK_CLIENTS]});
            return res;
        }
    });
}