import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "@/models/response/AuthResponse.ts";
import {AuthenticatedUser} from "@/models/userTypes.ts";
import TokenService from "@/services/UtilServices.ts";
import {API_BASE_URL} from "@/http/setupAxios.ts";


export default class AuthService {
    static currentUser: AuthenticatedUser | undefined;
    static token: string | undefined;

    static async _private_login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, {username, password})
    }

    static async login(username: string, password: string): Promise<void> {
        console.log(username)
        console.log(password)
        const login_response = await AuthService._private_login(username, password)
        const {token, user} = login_response.data;
        AuthService.token = token;
        AuthService.currentUser = user;
        TokenService.setToken(token);
    }

    static async logout(): Promise<void> {
        TokenService.deleteToken();
    }
}