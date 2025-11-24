import type { User } from "../User";

export type AddUserMutationVariables = {
    input: {
        email: string;
        password: string;
        username: string;
    }
}

export type AddUserMutation = {
    addUser: {
        message : string;
        success: boolean;
        user: User;
    }
}
