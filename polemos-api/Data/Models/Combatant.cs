namespace polemos_api.Data.Models;

public class Combatant
{
    public int Combatant_SK { get; set; }
    public int User_SK { get; set; }
    public string Name { get; set; }
    public int Strength { get; set; }
    public int Dexterity { get; set; }
    public int HitPoints { get; set; }

    public ApplicationUser User { get; set; }

    public ICollection<SnapShot> SnapShots { get; set; } = [];

    // todo: do we need this?
    public override string ToString()
    {
        var delimiter = ":";
        var properties = typeof(Combatant).GetProperties().Where(x => !x.PropertyType.IsAssignableTo(typeof(IEnumerable<SnapShot>))).Select(x => $"{x.Name}{delimiter}{x.GetValue(this)}");

        return string.Join(Environment.NewLine, properties);
    }
}
