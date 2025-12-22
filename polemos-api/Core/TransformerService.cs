using polemos_api.Data.Models;

namespace polemos_api.Core;

internal class TransformerService : ICombatantService
{
    private readonly ICombatantOptions _options = new CombatantOptions();

    public TransformerService(Action<ICombatantOptions> options)
    {
        options(_options);
    }

    public Combatant Create(string name)
    {
        if (string.IsNullOrEmpty(name))
        {
            throw new Exception($"Expected {nameof(name)} but received '{name}'");
        }

        var random = new Random();

        return new Combatant()
        {
            Name = name,
            Strength = random.Next(_options.Minimum, _options.Maximum),
            Dexterity = random.Next(_options.Minimum, _options.Maximum),
            HitPoints = random.Next(_options.Minimum, _options.Maximum)
        };
    }
}
