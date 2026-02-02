import { gql, type TypedDocumentNode } from "@apollo/client";
import type { GetIsPasswordValidQuery, GetIsPasswordValidVariables } from "../Types/GetIsPasswordValid";

export const GET_IS_PASSWORD_VALID: TypedDocumentNode<GetIsPasswordValidQuery, GetIsPasswordValidVariables> = gql`
    query Query($username: String!, $password: String!) {
        isPasswordValid(username: $username, password: $password)
    }
`;
