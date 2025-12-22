namespace polemos_api.Data.Models;

public class ApplicationUser
{
    public int User_SK { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public ICollection<Combatant> Combatants { get; set; }
}
