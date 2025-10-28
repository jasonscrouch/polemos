import { createContext } from "react";

export interface ApplicationUser {
    id: number,
    username: string,
    email: string
}

type AuthnContext = {
    authnUser?: ApplicationUser,
    signIn: (id: number, username: string, email: string) => boolean,
    signOut: () => boolean
}

export const AuthnContext = createContext<AuthnContext>({
        authnUser: undefined,
        signIn: () => false,
        signOut: () => false
    }
);
