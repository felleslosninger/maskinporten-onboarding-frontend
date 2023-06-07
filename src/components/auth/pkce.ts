import * as CryptoJs from 'crypto-js';
import {setCookie} from "typescript-cookie";

function base64URL(string: CryptoJs.lib.WordArray) {
    return string.toString(CryptoJs.enc.Base64)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

export function generate_crypto(key: string) {
    const rand = new Uint8Array(32);
    crypto.getRandomValues(rand);
    // @ts-ignore to make crypto-js work here
    const cryptoValue = base64URL(CryptoJs.lib.WordArray.create(rand));
    setCookie(key, cryptoValue)
    return cryptoValue;
}

export function generate_challenge() {
    const verifier = generate_crypto('code_verifier');
    return base64URL(CryptoJs.SHA256(verifier));
}

