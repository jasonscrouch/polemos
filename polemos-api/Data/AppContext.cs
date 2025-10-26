using Microsoft.EntityFrameworkCore;

namespace polemos_api.Data;

public class ApplicationContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Combatant> Combatants { get; set; }
    public DbSet<SnapShot> SnapShots { get; set; }
    public DbSet<Battle> Battles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(x => x.User_SK);
        modelBuilder.Entity<User>().HasMany(x => x.Combatants).WithOne(x => x.User).HasForeignKey(x => x.User_SK);

        modelBuilder.Entity<Combatant>().HasKey(x => x.Combatant_SK);
        modelBuilder.Entity<Combatant>().HasMany(x => x.SnapShots).WithOne(x => x.Combatant).HasForeignKey(x => x.Combatant_SK);

        modelBuilder.Entity<SnapShot>().HasKey(x => x.SnapShot_SK);
        modelBuilder.Entity<SnapShot>().HasOne(x => x.Battle).WithMany(x => x.SnapShots).HasForeignKey(x => x.SnapShot_SK);

        modelBuilder.Entity<Battle>().HasKey(x => x.Battle_SK);
        modelBuilder.Entity<Battle>().HasMany(x => x.SnapShots).WithOne(x => x.Battle).HasForeignKey(x => x.Battle_SK);
    }
}

public interface ICombatant
{
    int Combatant_SK { get; set; }
    string Name { get; set; }
    int Strength { get; set; }
    int Dexterity { get; set; }
    int HitPoints { get; set; }
    public ICollection<SnapShot> SnapShots { get; set; }
}

public class Battle
{
    public int Battle_SK { get; set; }
    public DateTime FoughtOn { get; set; }
    public ICollection<SnapShot> SnapShots { get; set; } = [];
}

public class SnapShot
{
    public int SnapShot_SK { get; set; }
    public int Battle_SK { get; set; }
    public int Combatant_SK { get; set; }
    public bool DidWin { get; set; }

    public Battle Battle { get; set; }

    public Combatant Combatant { get; set; }
}

// todo: move to core folder
public class Combatant : ICombatant
{
    public int Combatant_SK { get; set; }
    public int User_SK { get; set; }
    public string Name { get; set; }
    public int Strength { get; set; }
    public int Dexterity { get; set; }
    public int HitPoints { get; set; }

    //todo: with the various combatant types, add a way to track type
    public User User { get; set; }

    public ICollection<SnapShot> SnapShots { get; set; } = [];

    // todo: could we put this in a tabel format?
    public override string ToString()
    {
        var delimiter = ":";

        // todo: test this valueType
        var properties = typeof(Combatant).GetProperties().Where(x => !x.PropertyType.IsAssignableTo(typeof(IEnumerable<SnapShot>))).Select(x => $"{x.Name}{delimiter}{x.GetValue(this)}");

        return string.Join(Environment.NewLine, properties);
    }
}

public class User
{
    public int User_SK { get; set; }

    public string Name { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public ICollection<Combatant> Combatants { get; set; }
}