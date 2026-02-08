namespace polemos_api.Types;

public class Combatant
{
    public Combatant(int id, string name, bool isFemale)
    {
        Id = id;
        Name = name;
        IsFemale = isFemale;
    }

    [ID]
    [GraphQLDescription("The ID of the combatant")]
    public int Id { get; set; }

    [GraphQLDescription("The name of the combatant")]
    public string Name { get; set; }

    [GraphQLDescription("The gender of the combatant")]
    public bool IsFemale { get; set; }
}
