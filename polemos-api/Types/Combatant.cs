namespace polemos_api.Types;

public class Combatant
{
    public Combatant(int id, string name)
    {
        Id = id;
        Name = name;
    }

    [ID]
    [GraphQLDescription("The ID of the combatant")]
    public int Id { get; set; }

    [GraphQLDescription("The name of the combatant")]
    public string Name { get; set; }
}
