using polemos_api.Data.Models;

namespace polemos_api.Core;

internal class TransformerService : ICombatantService
{
    private readonly ICombatantOptions _options = new CombatantOptions();

    public TransformerService(Action<ICombatantOptions> options)
    {
        options(_options);
    }

    public Combatant Create(int userId, string name, bool isFemale)
    {
        if (string.IsNullOrEmpty(name))
        {
            throw new Exception($"Expected {nameof(name)} but received '{name}'");
        }

        var random = new Random();

        return new Combatant()
        {
            User_SK = userId,
            Name = name,
            IsFemale = isFemale,
            Strength = random.Next(_options.Minimum, _options.Maximum),
            Dexterity = random.Next(_options.Minimum, _options.Maximum),
            HitPoints = random.Next(_options.Minimum, _options.Maximum)
        };
    }
}
