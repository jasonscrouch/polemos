using polemos_api.Data.Models;
using polemos_api.Data.Specifications;

internal class CombatantByNameSpecification : BaseSpecification<Combatant>
{
    public CombatantByNameSpecification(string name) : base(x => x.Name == name)
    {
    }
}
