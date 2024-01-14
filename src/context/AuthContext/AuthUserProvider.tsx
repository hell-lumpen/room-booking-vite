import React, {ReactNode, useState} from "react";
import {AuthenticatedUserContext} from "./AuthUserContext.ts";
import {AuthenticatedUser} from "@/models/userTypes.ts";

interface AuthenticatedUserProviderProps {
    children: ReactNode;
}

export const AuthenticatedUserProvider: React.FC<AuthenticatedUserProviderProps> = ({children}) => {
    const authenticatedUserState = useState<AuthenticatedUser | undefined>(undefined);

    return (
        <AuthenticatedUserContext.Provider value={authenticatedUserState}>
            {children}
        </AuthenticatedUserContext.Provider>
    )
}