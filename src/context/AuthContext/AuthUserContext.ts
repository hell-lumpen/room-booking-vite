import {createContext, Dispatch, SetStateAction, useContext} from "react";
import {AuthenticatedUser} from "@/models/userTypes.ts";

export const AuthContext = createContext<[AuthenticatedUser | undefined, Dispatch<SetStateAction<AuthenticatedUser | undefined>>]>([undefined, () => {
}]);

export function useAuth() {
    return useContext(AuthContext);
}