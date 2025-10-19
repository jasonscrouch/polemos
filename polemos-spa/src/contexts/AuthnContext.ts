import { createContext } from "react";

export interface AppUser {
    displayName: string,
    email: string
}

type AuthContext = {
    authnUser?: AppUser,
    signIn: () => void,
    signOut: () => void
}

export const AuthnContext = createContext<AuthContext>(
    {
        authnUser: undefined,
        signIn: () => {},
        signOut: () => {}
    }
);
