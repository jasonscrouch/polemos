import { gql, type TypedDocumentNode } from "@apollo/client";
import type { AddCombatantMutation, AddCombatantMutationVariables } from "../Types/AddCombatant";

export const ADD_COMBATANT: TypedDocumentNode<AddCombatantMutation, AddCombatantMutationVariables> = gql`
        mutation AddCombatant($input: AddCombatantInput!) {
            addCombatant(input: $input) {
                message
                success
                combatant {
                    id
                    name
                }
            }
        }
    `;
