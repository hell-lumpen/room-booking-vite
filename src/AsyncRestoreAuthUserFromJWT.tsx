import {AuthenticatedUser} from "@/models/userTypes.ts";
import {jwtDecode} from "jwt-decode";
import TokenService from "@/services/UtilServices.ts";
import { JwtCustomPayload } from "./App";

export const asyncRestoreAuthUserFromJWT = (jwt?: string): Promise<AuthenticatedUser | undefined> => new Promise((resolve,) => {
    function decode(jwt: string): JwtCustomPayload {
        return jwtDecode<JwtCustomPayload>(jwt);
    }

    let decodedToken: JwtCustomPayload | null = null;

    if (jwt === undefined) {
        const jwt = TokenService.getToken()
        if (!jwt) {
            console.error('token not found in local storage');
            resolve(undefined);
        } else {
            decodedToken = decode(jwt);
            resolve({fullName: decodedToken.fullName, role: decodedToken.role});
        }
    } else {
        decodedToken = decode(jwt);
        resolve({fullName: decodedToken.fullName, role: decodedToken.role});
    }
});