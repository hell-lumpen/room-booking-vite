import React, {ReactNode, useEffect, useState} from "react";
import {AuthContext} from "./AuthUserContext.ts";
import {AuthenticatedUser} from "@/models/userTypes.ts";
import AuthService from "@/services/AuthService.ts";

interface AuthenticatedUserProviderProps {
    children: ReactNode;
}

export const AuthenticatedUserProvider: React.FC<AuthenticatedUserProviderProps> = ({children}) => {
    const authState = useState<AuthenticatedUser | undefined>(undefined);

    useEffect(() => {
        // Следим за изменениями в AuthService.currentUser и обновляем состояние
        AuthService.currentUser = authState[0];
    }, [authState]);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    )
}