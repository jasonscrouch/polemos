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

    function signIn() {
        // todo: implement

        // ensure that a user is not already signed in by checking localStorage
        // if so, then do nothing
        // if not, then useEffect to check that username/email and password match
        // if not, then error
        // if so, then cache data in localStorage
    }

    function signOut() {
        // todo: implement

        // check that a user is actually signed in (in cache)

        setAuthnUser(undefined);
    }

    return (
        <AuthnContext value={{authnUser: authnUser, signIn: signIn, signOut: signOut}}>
            {children}
        </AuthnContext>
    );
}
