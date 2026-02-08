import { gql, type TypedDocumentNode } from "@apollo/client";
import type { GetCombatantsQuery, GetCombatantsVariables } from "../Types/GetCombatants";

export const GET_COMBATANTS: TypedDocumentNode<GetCombatantsQuery, GetCombatantsVariables> = gql`
    query Query($combatantsId: Int!) {
        combatants(id: $combatantsId) {
            id
            name
            isFemale
        }
    }
`;
