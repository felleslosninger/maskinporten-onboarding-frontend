import React, {ComponentType, FC} from 'react';
import {Navigate, useLocation, useSearchParams} from 'react-router-dom';
import {getCookie} from "typescript-cookie";
import {useTokens} from "../../hooks/auth";
import {IdToken} from "../../types/tokens";

export interface AuthProps {
    id: IdToken;
}

const withAuth = <P extends object>(
    Component: ComponentType<P & AuthProps>,
): FC<P> => (props) => {
    const hasToken = getCookie('token.access') as string;
    const [searchParams] = useSearchParams();
    const {pathname} = useLocation();
    const iss = searchParams.get("iss");
    const code = searchParams.get("code") || undefined;
    const state = searchParams.get("state");
    const isAuthenticated = iss && code && state;
    const redirect_url = `http://localhost:3000${pathname}`;

    // Redirect to login if not yet authenticated
    if (!hasToken && !isAuthenticated) {
        return <Navigate to={"/logginn"} state={{redirect_url: redirect_url}}/>;
    }

    // Fetch token when user is authenticated
    if (!hasToken && isAuthenticated) {

        // Verify response from Ansattporten login
        const validIss = iss === 'https://test.ansattporten.no';
        const validState = state === getCookie('oauth_state');

        if (!validIss || !validState) {
            return <div>Feil svar fra autentisering</div>;
        }
    }

    // Allow access to component if token already available
    const { isLoading, data } = useTokens(code, redirect_url);
    if (isLoading) {
        return <div>Loading</div>
    }

    return <Component {...(props as P)} id={data!!} />;
};

export default withAuth;