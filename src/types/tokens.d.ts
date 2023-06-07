
type AutorizationDetails = {
    resource: string,
    type: string,
    resource_name: string,
    reportees: Array<{
        Rights: Array<string>,
        Authority: string,
        ID: string,
        Name: string
    }>
}

export type AccessToken = {
    sub: string,
    iss: string,
    client_amr: string,
    pid: string,
    client_id: string,
    acr: string,
    authorization_details: AutorizationDetails[],
    scope: string,
    exp: number,
    iat: number,
    jti: string,
    consumer: {
        authority: string,
        ID: string
    }
}

export type IdToken = {
    sub: string,
    amr: Array<string>,
    iss: string,
    pid: string,
    locale: string,
    client_id: string,
    nonce: string,
    aud: string,
    acr: string,
    authorization_details: AutorizationDetails[],
    auth_time: number,
    name: string,
    exp: number,
    iat: number,
    jti: string,
}