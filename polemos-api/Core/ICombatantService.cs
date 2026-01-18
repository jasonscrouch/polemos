using polemos_api.Data.Models;

namespace polemos_api.Core;

public interface ICombatantService
{
    Combatant Create(int userId, string name);
}
