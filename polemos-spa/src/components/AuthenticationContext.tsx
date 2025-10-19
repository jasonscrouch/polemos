import { AuthnContext } from "../contexts/AuthnContext";
import { type AppUser } from "../contexts/AuthnContext";
import { useState } from "react";

interface Props {
    children: React.ReactNode;
}

export default function AuthenticationContext({ children }: Props) {

    const key = 'authnUser';

    const [authnUser, setAuthnUser] = useState<AppUser | undefined>(() => 
    {
        const cacheItem = localStorage.getItem(key);

        if (cacheItem && cacheItem !== '') {
            return JSON.parse(cacheItem) as AppUser;
        } else {
            return undefined;
        }
    });

    function signIn() {
        // todo: implement
    }

    function signOut() {
        // todo: implement
    }

    return (
        <AuthnContext value={{authnUser: authnUser, signIn: signIn, signOut: signOut}}>
            {children}
        </AuthnContext>
    );
}
