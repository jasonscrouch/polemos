namespace polemos_api.Data.Models;

public class Battle
{
    public int Battle_SK { get; set; }
    public DateTime FoughtOn { get; set; }
    public ICollection<SnapShot> SnapShots { get; set; } = [];
}
