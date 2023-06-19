import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {getCookie, setCookie} from "typescript-cookie";
import jwt_decode from "jwt-decode";
import {IdToken} from "../types/tokens";
import {isAuthenticated} from "../components/auth/tokenRefresh";

export const QK_TOKEN = 'QK_TOKEN';
export const QK_USER = 'QK_USER';

export const useTokens = (code?: string, redirect_url?: string) => {
    return useQuery({
        queryKey: [QK_TOKEN],
        queryFn: async () => {
            const authenticated = isAuthenticated();
            if (authenticated) {
                const idCookie = getCookie('token.id');
                return jwt_decode<IdToken>(idCookie!!);
            }

            const tokens = await axios.post('https://test.ansattporten.no/token', null, {
                headers: {
                    Authorization: 'Basic YmNkZjJmNGEtM2M0MC00MzQ1LTkxYjAtMjZiNzRmOWE3Yjk0Ojk1NjgxOWMzLTBhNTktNDJkOC1hODg3LTgyZmQwODZmMTlhNA==',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
                params: {
                    code: code!!,
                    grant_type: 'authorization_code',
                    redirect_uri: redirect_url!!,
                    code_verifier: getCookie('code_verifier'),
                    client_id: 'bcdf2f4a-3c40-4345-91b0-26b74f9a7b94'
                }
            });
            setCookie('token.access', tokens.data.access_token);
            setCookie('token.id', tokens.data.id_token);
            setCookie('token.refresh', tokens.data.refresh_token);
            return jwt_decode<IdToken>(tokens.data.id_token);
        }
    })
}

// Get logged in user with the possibility of not being logged in
export const useUser = () => {
    return useQuery({
        queryKey: [QK_USER],
        queryFn: async () => {
            try {
                const res = await axios.get<IdToken>('/user');
                const user = res.data;
                const isAuthenticated = !!user;

                return { isAuthenticated, user };
            } catch (err) {
                const user = null;
                const isAuthenticated = false;
                return { isAuthenticated, user };
            }
        },
        retry: 0
    });
}
