import {useLocation} from 'react-router-dom';
import {useEffect} from "react";
import qs from 'qs';
import {generate_challenge, generate_crypto} from './pkce';

interface LocationState {
    redirect_url?: string;
}

function Auth() {
    const location = useLocation();
    const state = location.state as LocationState;
    const defaultRedirect = 'http://localhost:3000/authenticated';

    const querystring = qs.stringify({
        scope: 'openid',
        client_id: 'bcdf2f4a-3c40-4345-91b0-26b74f9a7b94',
        state: generate_crypto('oauth_state'),
        nonce: generate_crypto('oauth_nonce'),
        acr_values: 'substantial',
        response_type: 'code',
        redirect_uri: state ? state.redirect_url : defaultRedirect,
        code_challenge_method: 'S256',
        code_challenge: generate_challenge(),
        authorization_details: '[{"type":"ansattporten:altinn:service","resource":"urn:altinn:resource:2480:40"}]'
    });
    const redirectUrl = 'https://login.test.ansattporten.no/authorize?' + querystring;



    useEffect(() => {
        window.location.href = redirectUrl;
    }, [])

    return <div>Logger inn...</div>;
}

export default Auth;