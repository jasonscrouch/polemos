import { gql, type TypedDocumentNode } from "@apollo/client";
import type { GetUserQuery, GetUserQueryVariables } from "../Types/GetUser";

export const GET_USER: TypedDocumentNode<GetUserQuery, GetUserQueryVariables> = gql`
    query User($username: String!) {
        user(username: $username) {
            email
            id
            name
        }
    }
`;
