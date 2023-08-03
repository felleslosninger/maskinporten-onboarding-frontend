
type AuthorizationDetails = {
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
    authorization_details: AuthorizationDetails[],
    auth_time: number,
    name: string,
    exp: number,
    iat: number,
    jti: string,
}