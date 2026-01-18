namespace polemos_api.Types.Inputs;

[GraphQLDescription("Input for adding a combatant")]
public class AddCombatantInput
{
    [GraphQLDescription("The ID of the User")]
    public int UserId { get; set; }

    [GraphQLDescription("The combatant's name")]
    public string Name { get; set; }

    public AddCombatantInput(int userId, string name)
    {
        UserId = userId;
        Name = name;
    }
}
