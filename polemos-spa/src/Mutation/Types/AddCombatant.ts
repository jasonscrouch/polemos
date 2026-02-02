import type { Combatant } from "../../types/Combatant";

export type AddCombatantMutationVariables = {
    input: {
        userId: number;
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
