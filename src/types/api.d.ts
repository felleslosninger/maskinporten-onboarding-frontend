import exp from "constants";

export type ApiScope = {
    name: string;
    active: boolean;
    prefix: string;
    subscope: string;
    description: string;
}

export type ApiScopes = ApiScope[];

export type ApiClient = {
    client_id: string;
    consumer_orgno: string;
    description: string;
    scopes: [scope: string];
}

export type ApiClients = [client: ApiClient]

export type RequestApiClientBody = {
    description: string;
    scopes: string[];
}