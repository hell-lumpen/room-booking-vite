export const LC_TOKEN_KEY = 'sc_token'

export default class TokenService {
    static getToken() {
        return localStorage.getItem(LC_TOKEN_KEY)
    }

    static setToken(token: string) {
        localStorage.setItem(LC_TOKEN_KEY, token)
    }

    static deleteToken() {
        localStorage.removeItem(LC_TOKEN_KEY);
    }
}