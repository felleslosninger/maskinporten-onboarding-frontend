import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ApiClient,
  ApiClients,
  ApiConfig,
  ApiScopes,
  RequestApiClientBody,
} from "../types/api";
import { QK_CONFIG } from "./auth";

export const QK_SCOPES = "QK_SCOPES";
export const QK_CLIENTS = "QK_CLIENTS";

const axiosConfig = { withCredentials: true };

declare global {
  interface Window {
    env: {
      SIMPLIFIED_ONBOARDING_API_URL: string;
      WHITELIST: string;
    };
  }
}

const baseUrl = window.env.SIMPLIFIED_ONBOARDING_API_URL;

export const useScopes = (env: string) => {
  return useQuery({
    queryKey: [QK_SCOPES],
    queryFn: async () => {
      const path = `${baseUrl}/api/${env}/datasharing/consumer/scope/access`;
      const res = await axios.get<ApiScopes>(path, axiosConfig);
      return res.data;
    },
  });
};

export const useClients = (env: string) => {
  return useQuery({
    queryKey: [QK_CLIENTS],
    queryFn: async () => {
      const path = `${baseUrl}/api/${env}/datasharing/consumer/client`;
      const res = await axios.get<ApiClients>(path, axiosConfig);
      return res.data;
    },
    retry: 0,
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

/* NOT CURRENTLY IN USE */
export const useAllClientsInEnvironments = () => {
  return useQuery({
    queryKey: [QK_CONFIG, QK_CLIENTS],
    queryFn: async () => {
      const configPath = `${baseUrl}/api/config`;
      const configRes = await axios.get<ApiConfig>(configPath, axiosConfig);
      const envs = Object.keys(configRes.data);

      let clients: ApiClient[] = [];

      const requests = envs.map((env) => {
        const path = `${baseUrl}/api/${env}/datasharing/consumer/client`;
        return axios.get<ApiClients>(path, axiosConfig).then((res) => {
          res.data.forEach((client) => {
            client.env = env;
          });
          return res.data;
        });
      });

      const responses = await axios.all(requests);
      responses.forEach((res) => {
        clients = clients.concat(res);
      });

      return clients;
    },
    retry: 0,
  });
};
