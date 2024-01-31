import React, {ReactNode, useEffect, useState} from "react";
import {AuthContext} from "./AuthUserContext.ts";
import {AuthenticatedUser} from "@/models/userTypes.ts";
import AuthService from "@/services/AuthService.ts";
import TokenService from "@/services/UtilServices.ts";
import {restoreAuthUserFromJWT} from "@/App.tsx";

interface AuthenticatedUserProviderProps {
    children: ReactNode;
}

export const AuthenticatedUserProvider: React.FC<AuthenticatedUserProviderProps> = ({children}) => {
    const authState = useState<AuthenticatedUser | undefined>(undefined);

    useEffect(() => {
        const token = TokenService.getToken()
        if (token) {
            AuthService.currentUser = restoreAuthUserFromJWT(token);
            authState[1](AuthService.currentUser)
        }
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    )
}