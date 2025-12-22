import type { Combatant } from "../Combatant";

export type AddCombatantMutationVariables = {
    input: {
        name: string;
    }
}

export type AddCombatantMutation = {
    addCombatant: {
        message : string;
        success: boolean;
        combatant: Combatant;
    }
}