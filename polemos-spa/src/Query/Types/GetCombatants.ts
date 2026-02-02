import type { Combatant } from "../../types/Combatant";

export type GetCombatantsQuery = {
    combatants: Combatant[];
}

export type GetCombatantsVariables = {
    combatantsId: number;
}
