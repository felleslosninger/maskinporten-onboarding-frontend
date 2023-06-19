export type ApiScopes = [scope: string]

export type ApiClient = {
    client_id: string;
    consumer_orgno: string;
    description: string;
    scopes: ApiScopes;
}

export type ApiClients = [client: ApiClient]