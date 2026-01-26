import { AuthnContext } from "../contexts/AuthnContext";
import { type ApplicationUser } from "../contexts/AuthnContext";
import useLocalStorage from "../hooks/LocalStorage";

interface Props {
    children: React.ReactNode;
}

export default function AuthenticationContext({ children }: Props) {

    const key = 'authnUser';

    const [authnUser, setAuthnUser] = useLocalStorage<ApplicationUser | undefined>(key, undefined);

    function signIn(id: string, username: string, email: string): boolean {
       
        if (authnUser) {
            return true;
        }

        const user: ApplicationUser = { 
            id: Number.parseInt(id), 
            username: username, 
            email: email 
        };

        setAuthnUser(user);
        return true;
    }

    function signOut() {
        
        if (!authnUser) {
            return true;
        }

        setAuthnUser(undefined);
        return true;
    }

    return (
        <AuthnContext value={{authnUser: authnUser, signIn: signIn, signOut: signOut}}>
            {children}
        </AuthnContext>
    );
}
