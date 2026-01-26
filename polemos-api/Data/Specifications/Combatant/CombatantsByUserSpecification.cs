using polemos_api.Data.Models;
using polemos_api.Data.Specifications;

internal class CombatantsByUserSpecification : BaseSpecification<Combatant>
{
    public CombatantsByUserSpecification(int id) : base(x => x.User_SK == id)
    {
    }
}
