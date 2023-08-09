import exp from "constants";

export type ApiScope = {
    consumer_orgno: string;
    created: string;
    last_updated: string;
    owner_orgno: string;
    scope: string;
    state: string;
    description: string;
}

export type ApiScopes = ApiScope[];

export type ApiClient = {
    clientId: string;
    consumerOrgnr: string;
    description: string;
    scopes: [scope: string];
}

export type ApiClients = [client: ApiClient]

export type RequestApiClientBody = {
    description: string;
    scopes: string[];
}

export type ApiConfig = {
    [env: string]: {
        authorization_server: string;
        issuer: string;
        token_endpoint: string;
    }
}