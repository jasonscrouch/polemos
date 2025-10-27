import { createContext } from "react";

export interface ApplicationUser {
    id: number,
    username: string,
    email: string
}

type AuthnContext = {
    authnUser?: ApplicationUser,
    signIn: () => void,
    signOut: () => void
}

export const AuthnContext = createContext<AuthnContext>(
    {
        authnUser: undefined,
        signIn: () => {},
        signOut: () => {}
    }
);
