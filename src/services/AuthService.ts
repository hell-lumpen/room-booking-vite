import {AxiosResponse} from "axios";
import API from "../http/setupAxios.ts";
import {AuthResponse} from "@/models/response/AuthResponse.ts";
import {AuthenticatedUser} from "@/models/userTypes.ts";
import TokenService from "@/services/UtilServices.ts";


export default class AuthService {
    static currentUser: AuthenticatedUser | undefined;
    static token: string | undefined;

    static async _private_login(username: string, password: string) : Promise<AxiosResponse<AuthResponse>> {
        return API.post<AuthResponse>('/auth/login', {username, password})
    }

    static async login(username: string, password: string): Promise<void> {
        const login_response = await AuthService._private_login(username, password)
        const {token, user} = login_response.data;
        AuthService.token = token;
        AuthService.currentUser = user;
        TokenService.setToken(token);
    }

    // static async logout() : Promise<void> {
    //     return API.post('/auth/logout')
    // }
}