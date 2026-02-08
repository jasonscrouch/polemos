namespace polemos_api.Types.Inputs;

[GraphQLDescription("Input for adding a combatant")]
public class AddCombatantInput
{
    [GraphQLDescription("The ID of the User")]
    public int UserId { get; set; }

    [GraphQLDescription("The combatant's name")]
    public string Name { get; set; }

    [GraphQLDescription("The combatant's gender")]
    public bool IsFemale { get; set; }

    public AddCombatantInput(int userId, string name, bool isFemale)
    {
        UserId = userId;
        Name = name;
        IsFemale = isFemale;
    }
}
