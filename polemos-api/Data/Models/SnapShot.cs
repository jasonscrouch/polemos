namespace polemos_api.Data.Models;

public class SnapShot
{
    public int SnapShot_SK { get; set; }
    public int Battle_SK { get; set; }
    public int Combatant_SK { get; set; }
    public bool DidWin { get; set; }

    public Battle Battle { get; set; }

    public Combatant Combatant { get; set; }
}
