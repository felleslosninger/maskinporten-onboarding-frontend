import { useQuery } from "@tanstack/react-query";
import { Userinfo } from "../types/tokens";
import { ApiConfig } from "../types/api";
import axios from "axios";

export const QK_USER = "QK_USER";
export const QK_CONFIG = "QK_CONFIG";
export const QK_SIGN_STATUS = "QK_SIGN_STATUS"

// Get logged in user with the possibility of not being logged in
export const useUser = () => {
  return useQuery({
    queryKey: [QK_USER],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${window.env.SIMPLIFIED_ONBOARDING_API_URL}/api/userinfo`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            redirect: "manual", // do not follow redirect
          },
        );

        const user = (await res.json()) as Userinfo;
        const isAuthenticated = !!user;

        return { isAuthenticated, user };
      } catch (err) {
        const user = null;
        const isAuthenticated = false;
        return { isAuthenticated, user };
      }
    },
  });
};

export const useConfig = () => {
  return useQuery({
    queryKey: [QK_CONFIG],
    queryFn: async () => {
      const path = `${window.env.SIMPLIFIED_ONBOARDING_API_URL}/api/config`;
      const res = await axios.get<ApiConfig>(path, {
        withCredentials: true,
      });
      return res.data;
    },
  });
};

export const useSignStatus = (orgno: string | undefined) => {
  return useQuery({
    queryKey: [QK_SIGN_STATUS],
    queryFn: async () => {
      const path = `${window.env.SIMPLIFIED_ONBOARDING_API_URL}/api/shouldSign`;
      const params = new URLSearchParams();
      params.append("org", orgno || "");
      const res = await axios.get<boolean>(path, {
        params: params,
        withCredentials: true,
      });
      return res.data;
    },
    enabled: !!orgno
  });
}