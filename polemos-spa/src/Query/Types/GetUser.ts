import type { User } from "../../types/User";

export type GetUserQuery = {
    user: User;
}

export type GetUserQueryVariables = {
    username: string;
}
