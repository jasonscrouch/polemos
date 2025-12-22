namespace polemos_api.Types.Payloads;

[GraphQLDescription("Payload when adding a combatant")]
public class AddCombatantPayload : BasePayload
{
    [GraphQLDescription("The added combatant")]
    public Combatant? Combatant { get; set; }

    // todo: this is really similar to the AddUserPayload. Can we make this AddPaylod<T>?

    public AddCombatantPayload(int code, bool success, string message, Combatant? combatant)
        : base(code, success, message)
    {
        if (combatant != null)
        {
            Combatant = combatant;
        }
    }
}
