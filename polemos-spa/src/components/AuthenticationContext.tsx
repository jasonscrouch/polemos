import { AuthnContext } from "../contexts/AuthnContext";
import { type ApplicationUser } from "../contexts/AuthnContext";
import { useState } from "react";

interface Props {
    children: React.ReactNode;
}

export default function AuthenticationContext({ children }: Props) {

    const key = 'authnUser';

    const [authnUser, setAuthnUser] = useState<ApplicationUser | undefined>(() => 
    {
        const cacheItem = localStorage.getItem(key);

        if (cacheItem && cacheItem !== '') {
            return JSON.parse(cacheItem) as ApplicationUser;
        } else {
            return undefined;
        }
    });

    function signIn(id: number, username: string, email: string): boolean {
       
        if (authnUser) {
            return true;
        }

        // todo: we'll want something more robust here

        const user: ApplicationUser = { id: id, username: username, email: email };

        localStorage.setItem(key, JSON.stringify(user));
        setAuthnUser(user);
        return true;
    }

    function signOut() {
        
        if (!authnUser) {
            return true;
        }

        localStorage.removeItem(key);
        setAuthnUser(undefined);
        return true;
    }

    return (
        <AuthnContext value={{authnUser: authnUser, signIn: signIn, signOut: signOut}}>
            {children}
        </AuthnContext>
    );
}
