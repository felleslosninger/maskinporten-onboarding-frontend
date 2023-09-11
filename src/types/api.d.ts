import exp from "constants";
import { JWK } from "jose";

export type ApiScope = {
  accessible_for_all: boolean;
  allowed_integration_types: string[];
  consumer_orgno: string;
  created: string;
  last_updated: string;
  owner_orgno: string;
  scope: string;
  state: string;
  name: string;
  description: string;
};

export type ApiScopes = ApiScope[];
export type ApiPublicScopes = ApiPublicScope[];

export type ApiPublicScope = {
  accessible_for_all: boolean;
  name: string;
  description: string;
  owner_orgno: string;
}

export type ApiClient = {
  clientId: string;
  consumerOrgnr: string;
  description: string;
  keys: [JWK];
  scopes: [scope: string];
  env: string;
};

export type ApiClients = [client: ApiClient];

export type RequestApiClientBody = {
  description: string;
  keys?: JWK[];
  scopes: string[];
};

export type ApiConfig = {
  [env: string]: {
    authorization_server: string;
    issuer: string;
    token_endpoint: string;
  };
};
