import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ApiClient,
  ApiClients,
  ApiScopes,
  RequestApiClientBody,
} from "../types/api";

export const QK_SCOPES = "QK_SCOPES";
export const QK_PUBLIC_SCOPES = "QK_PUBLIC_SCOPES";
export const QK_CLIENTS = "QK_CLIENTS";

const axiosConfig = { withCredentials: true };

const baseUrl = window.env.SIMPLIFIED_ONBOARDING_API_URL;

export const useScopes = (env: string) => {
  return useQuery({
    queryKey: [QK_SCOPES],
    queryFn: async () => {
      const path = `${baseUrl}/api/${env}/datasharing/consumer/scope/access`;
      const res = await axios.get<ApiScopes>(path, axiosConfig);
      return res.data;
    },
    refetchInterval: 5 * 60 * 1000, // Avoids token expiration while app is in use
    refetchIntervalInBackground: true,
  });
};

export const usePublicScopes = (env: string) => {
  return useQuery({
    queryKey: [QK_PUBLIC_SCOPES],
    queryFn: async () => {
      const path = `${baseUrl}/api/${env}/scopes/all?accessible_for_all=true`;
      const res = await axios.get<ApiScopes>(path, axiosConfig);
      res.data.forEach((scope) => (scope.scope = scope.name));
      return res.data.filter((scope) =>
        scope.allowed_integration_types.includes("maskinporten"),
      );
    },
  });
};

export const useClients = (env: string, enabled?: boolean) => {
  return useQuery({
    queryKey: [QK_CLIENTS, env],
    queryFn: async () => {
      const path = `${baseUrl}/api/${env}/datasharing/consumer/client`;
      const res = await axios.get<ApiClients>(path, axiosConfig);
      res.data.forEach((client) => (client.env = env.toUpperCase()));
      return res.data;
    },
    enabled: enabled, // Avoids concurrency issues with refresh token
    refetchInterval: 5 * 60 * 1000, // Avoids token expiration while app is in use
    refetchIntervalInBackground: true,
  });
};

export const useClientsInAllEnvs = (envs: string[], enabled?: boolean) => {
  return useQuery({
    queryKey: [envs],
    queryFn: async () => {
      const clientList: ApiClient[] = [];

      for (let env of envs) {
        const path = `${baseUrl}/api/${env}/datasharing/consumer/client`;
        const res = await axios.get<ApiClients>(path, axiosConfig);
        res.data.forEach((client) => (client.env = env.toUpperCase()));
        clientList.push(...res.data)
      }

      return clientList;
    },
    enabled: enabled,
    refetchInterval: 5 * 60 * 1000, // Avoids token expiration while app is in use
    refetchIntervalInBackground: true,
  });
};

export const useClientMutation = (env: string) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (newClient: RequestApiClientBody) => {
      const path = `${baseUrl}/api/${env}/datasharing/consumer/client`;
      return axios.post<ApiClient>(path, newClient, axiosConfig);
    },
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: [QK_CLIENTS] });
      return res;
    },
  });
};

export const useClientDeleteMutation = (env: string) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (clientId: string) => {
      const params = new URLSearchParams();
      params.append("client_id", clientId);
      const path = `${baseUrl}/api/${env}/datasharing/consumer/client`;
      return axios.delete(path, {
        params: params,
        withCredentials: true,
      });
    },
    onSuccess: (res) => {
      client.invalidateQueries({ queryKey: [QK_CLIENTS] });
      return res;
    },
  });
};
