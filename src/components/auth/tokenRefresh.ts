import axios from "axios";
import {getCookie, setCookie} from "typescript-cookie";
import jwt_decode from "jwt-decode";
import {AccessToken} from "../../types/tokens";

const getToken = () => {
    return getCookie('token.access');
};

const setToken = (token: string) => {
    setCookie('token.access', token);
}

const setRefreshToken = (token: string) => {
    setCookie('token.refresh', token);
}

export const isAuthenticated = () => {
    const idToken = getCookie('token.id');
    return !!(idToken && getToken() && !isTokenExpired());
}

const isTokenExpired = () => {
    const token = getToken();
    if (!token) {
        return true;
    }
    const decoded = jwt_decode<AccessToken>(token);
    console.log(decoded);
    return decoded.iat > Date.now();
}

const getRefreshedToken = () => {
    return axios.post('https://test.ansattporten.no/token', null, {
        headers: {
            Authorization: 'Basic YmNkZjJmNGEtM2M0MC00MzQ1LTkxYjAtMjZiNzRmOWE3Yjk0Ojk1NjgxOWMzLTBhNTktNDJkOC1hODg3LTgyZmQwODZmMTlhNA==',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        params: {
            grant_type: 'refresh_token',
            refresh_token: getCookie('token.refresh')
        }
    })
}

const refreshToken = async () => {
    const newToken = await getRefreshedToken();
    setToken(newToken.data.access_token);
    setRefreshToken(newToken.data.refresh_token);
}

export const setupTokenRefresh = () => {
    axios.interceptors.request.use(async (config) => {
        if(isTokenExpired()){
            await refreshToken();
        }
        return config;
    })
}