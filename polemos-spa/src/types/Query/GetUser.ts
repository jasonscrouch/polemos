import type { User } from "../User";

export type GetUserQuery = {
    user: User;
}

export type GetUserQueryVariables = {
    username: string;
}
