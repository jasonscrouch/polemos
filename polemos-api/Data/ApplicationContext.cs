using Microsoft.EntityFrameworkCore;
using polemos_api.Data.Models;

namespace polemos_api.Data;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
    }

    public DbSet<ApplicationUser> Users { get; set; }
    public DbSet<Combatant> Combatants { get; set; }
    public DbSet<SnapShot> SnapShots { get; set; }
    public DbSet<Battle> Battles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ApplicationUser>().HasKey(x => x.User_SK);
        modelBuilder.Entity<ApplicationUser>().HasMany(x => x.Combatants).WithOne(x => x.User).HasForeignKey(x => x.User_SK);

        modelBuilder.Entity<Combatant>().HasKey(x => x.Combatant_SK);
        modelBuilder.Entity<Combatant>().HasMany(x => x.SnapShots).WithOne(x => x.Combatant).HasForeignKey(x => x.Combatant_SK);

        modelBuilder.Entity<SnapShot>().HasKey(x => x.SnapShot_SK);
        modelBuilder.Entity<SnapShot>().HasOne(x => x.Battle).WithMany(x => x.SnapShots).HasForeignKey(x => x.SnapShot_SK);

        modelBuilder.Entity<Battle>().HasKey(x => x.Battle_SK);
        modelBuilder.Entity<Battle>().HasMany(x => x.SnapShots).WithOne(x => x.Battle).HasForeignKey(x => x.Battle_SK);
    }
}
