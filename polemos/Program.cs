using System.Collections;
using System.ComponentModel;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;

namespace polemos;

// todo: move to data
internal class AppContext : DbContext
{
    public DbSet<Combatant> Combatants { get; set; }
    public DbSet<SnapShot> SnapShots { get; set; }
    public DbSet<Battle> Battles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("TestDatabase");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Combatant>().HasKey(x => x.Combatant_SK);
        modelBuilder.Entity<Combatant>().HasMany(x => x.SnapShots).WithOne(x => x.Combatant).HasForeignKey(x => x.Combatant_SK);

        modelBuilder.Entity<SnapShot>().HasKey(x => x.SnapShot_SK);
        modelBuilder.Entity<SnapShot>().HasOne(x => x.Battle).WithMany(x => x.SnapShots).HasForeignKey(x => x.SnapShot_SK);

        modelBuilder.Entity<Battle>().HasKey(x => x.Battle_SK);
        modelBuilder.Entity<Battle>().HasMany(x => x.SnapShots).WithOne(x => x.Battle).HasForeignKey(x => x.Battle_SK);
    }
}

// todo: move to core folder
internal interface ISpecification<T>
{
    Expression<Func<T, bool>> Criteria { get; set; }
}

// todo: move to core folder
internal abstract class SpecificationBase<T> : ISpecification<T>
{
    public Expression<Func<T, bool>> Criteria { get; set; }

    public SpecificationBase(Expression<Func<T, bool>> criteria)
    {
        Criteria = criteria;
    }
}

// todo: move to core folder
internal class CombatantSpecification : SpecificationBase<ICombatant>
{
    public CombatantSpecification(int id) : base(x => x.Combatant_SK == id)
    {
    }
}

// todo: move to data folder
internal interface IRepository<T>
{
    T Add(T entity);

    // todo: do we need this method?
    T? Find(int id);
    IEnumerable<T> List();
    IList<T> List(Expression<Func<T, bool>> predicate);
    T Remove(T entity);
    int SaveChanges();
}

// todo: move to data folder
internal class Repository<T> : IRepository<T> where T : class
{
    private readonly AppContext _appContext;

    public Repository(AppContext appContext)
    {
        _appContext = appContext;
    }

    public T Add(T entity)
    {
        _appContext.Set<T>().Add(entity);

        return entity;
    }

    public T? Find(int id)
    {
        return _appContext.Set<T>().Find(new object[] { id });
    }

    public IEnumerable<T> List()
    {
        return _appContext.Set<T>();
    }

    public IList<T> List(Expression<Func<T, bool>> predicate)
    {
        return _appContext.Set<T>().Where(predicate).ToList();
    }

    public T Remove(T entity)
    {
        _appContext.Set<T>().Remove(entity);

        return entity;
    }

    public int SaveChanges()
    {
        return _appContext.SaveChanges();
    }
}

// todo: move this to UI folder

internal class CombatantOptions
{
    public const int Transformer = 1;

    public Option TransformerCombatantOption = new(Transformer, "Transformer");
}

internal class Option
{
    public Option(int id, string name)
    {
        Id = id;
        Name = name;
    }

    public int Id { get; set; }
    public string Name { get; set; }
}

internal class Options
{
    public const int AddCombatant = 1;
    public const int RemoveCombatant = 2;
    public const int SimulateBattle = 3;
    public const int CombatantStatistics = 4;
    public const int Exit = 5;

    public Option AddCombatantOption = new(AddCombatant, "Add Combatant");
    public Option RemoveCombatantOption = new(RemoveCombatant, "Remove Combatant");
    public Option SimulateBattleOption = new(SimulateBattle, "Simulate Battle");
    public Option CombatantStatisticsOption = new(CombatantStatistics, "Combatant Statistics");
    public Option ExitOption = new(Exit, "Exit");
}

// todo: put this in core folder
internal interface ICombatant
{
    int Combatant_SK { get; set; }
    string Name { get; set; }
    int Strength { get; set; }
    int Dexterity { get; set; }
    int HitPoints { get; set; }
    public ICollection<SnapShot> SnapShots { get; set; }
}

internal class Battle
{
    public int Battle_SK { get; set; }
    public DateTime FoughtOn { get; set; }
    public ICollection<SnapShot> SnapShots { get; set; } = [];
}

internal class SnapShot
{
    public int SnapShot_SK { get; set; }
    public int Battle_SK { get; set; }
    public int Combatant_SK { get; set; }
    public bool DidWin { get; set; }

    public Battle Battle { get; set; }

    public Combatant Combatant { get; set; }
}

// todo: move to core folder
internal class Combatant : ICombatant
{
    // todo: does this work?
    [DisplayName("Id")]
    public int Combatant_SK { get; set; }
    public string Name { get; set; }
    public int Strength { get; set; }
    public int Dexterity { get; set; }
    public int HitPoints { get; set; }

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

// todo: add to Core folder
internal interface ICombatantService
{
    Combatant Create(string name);
}

// todo: move to Core folder
internal class TransformerService : ICombatantService
{
    private readonly int _min = 1;
    private readonly int _max = 20;

    public TransformerService()
    {
    }

    public Combatant Create(string name)
    {
        name = name.Trim();

        if (string.IsNullOrEmpty(name))
        {
            throw new Exception($"Expected {nameof(name)} but received '{name}'");
        }

        var random = new Random();

        return new Combatant()
        {
            Name = name,
            Strength = random.Next(_min, _max),
            Dexterity = random.Next(_min, _max),
            HitPoints = random.Next(_min, _max)
        };
    }
}

public class Program
{
    private readonly static CombatantOptions _combatantOptions;
    private readonly static Options _options;
    private readonly static Repository<Combatant> _combatantRepository;
    private readonly static IEnumerable<ICombatantService> _combatantServices;

    private static ICombatantService _combatantService;
    private static string _combatantServiceName;

    // todo: move this to UI folder
    public static bool IsValidValue(string? value)
    {
        return !string.IsNullOrEmpty(value?.Trim());
    }

    public static bool IsValidInt(string value)
    {
        return int.TryParse(value, out var result);
    }

    public static bool IsYesOrNo(string value)
    {
        return IsYes(value) || Equals(value, "no");
    }

    public static bool IsYes(string value)
    {
        return Equals(value, "yes");
    }

    // todo: move to UI folder
    public static void Write(string? text, bool addNewLine = true)
    {
        if (string.IsNullOrEmpty(text?.Trim()))
        {
            throw new ArgumentException($"Expected {nameof(text)} to have a value");
        }

        Console.WriteLine(text);

        if (addNewLine)
        {
            Console.Write(Environment.NewLine);
        }
    }

    public static string Read()
    {
        var value = Console.ReadLine();

        while (!IsValidValue(value))
        {
            Write($"'{value}' is not valid");
            value = Console.ReadLine();
        }

        return value.Trim();
    }

    public static bool Equals(string value, string comparison)
    {
        return IsValidValue(value) && value.Equals(comparison, StringComparison.OrdinalIgnoreCase);
    }

    public static bool ReadIsContinuing()
    {
        var isContinuing = Read();

        while (!IsYesOrNo(isContinuing))
        {
            Write($"'{isContinuing}' is not valid");
            Write("Would you like to continue?");
            isContinuing = Read();
        }

        return IsYes(isContinuing);
    }

    public static void Add()
    {
        Write($"Add a {_combatantServiceName}");

        var shouldContinueAdding = true;
        while (shouldContinueAdding)
        {
            Write("Enter a name:");
            var name = Read();

            var newCombatant = _combatantService.Create(name);

            _combatantRepository.Add(newCombatant);
            Write("Adding...");
            _combatantRepository.SaveChanges();

            Write($"New {_combatantServiceName} added!");
            Write(newCombatant.ToString());

            Write($"Would you like to add another {_combatantServiceName}? (Yes/No)");
            shouldContinueAdding = ReadIsContinuing();
        }
    }

    public static void Remove()
    {
        // todo: test
        Write($"Remove {_combatantServiceName}(s)");
        var combatants = _combatantRepository.List();

        // todo: test
        if (!combatants.Any())
        {
            Write($"There are no {_combatantServiceName}s to remove");
            return;
        }

        Write($"Here are the current {_combatantServiceName}s:");

        foreach (var combatant in combatants)
        {
            Write(combatant.ToString());
        }

        var shouldContinueRemoving = true;
        while (shouldContinueRemoving)
        {
            Write($"Enter the {nameof(Combatant.Combatant_SK)} or a list of {nameof(Combatant.Combatant_SK)}s separated by a comma (e.g., 1, 2, 3):");
            var toRemove = Read();

            var delimiter = ',';
            var isList = toRemove.Contains(delimiter);
            var ids = isList ? toRemove.Split(delimiter).Select(x => x.Trim()).ToList()
                : [toRemove.Trim()];

            // todo: test
            if (ids.Any(x => !IsValidInt(x)))
            {
                // todo: test
                Write(ids.Count > 1 ? $"Not all of these {nameof(Combatant.Combatant_SK)}s are valid: '{string.Join(delimiter, ids)}'"
                : $"This {nameof(Combatant.Combatant_SK)} is not valid: '{ids.First()}'");
            }
            else
            {
                var combatantIds = ids.Select(x => int.Parse(x)).ToList();
                var combatantsToRemove = _combatantRepository.List(x => combatantIds.Contains(x.Combatant_SK));

                var combatantsNotFound = combatantIds.Where(x => !combatantsToRemove.Any(y => y.Combatant_SK == x));

                // todo: test
                foreach (var notFound in combatantsNotFound)
                {
                    Write($"Unable to remove {_combatantServiceName} with {nameof(Combatant.Combatant_SK)} of '{notFound}'");
                }

                foreach (var combatantToRemove in combatantsToRemove)
                {
                    var id = combatantToRemove.Combatant_SK;

                    try
                    {
                        Write("Removing...");
                        _combatantRepository.Remove(combatantToRemove);
                        _combatantRepository.SaveChanges();
                        Write($"{_combatantServiceName} with {nameof(Combatant.Combatant_SK)} '{id}' removed");
                    }
                    catch (Exception ex)
                    {
                        // todo: test
                        Write($"Unable to remove {_combatantServiceName} with {nameof(Combatant.Combatant_SK)} of '{id}'");
                        Write($"See exception: '{ex.Message}'");
                    }
                }
                // todo: test
                Write($"Would you like to continue removing {_combatantServiceName}s? (Yes/No)");
                shouldContinueRemoving = ReadIsContinuing();
            }
        }
    }

    public static void SimulateBattle()
    {
        // todo: implement
        Console.WriteLine("Not implemented");
    }

    public static void CombatStatistics()
    {
        // todo: implement
        Console.WriteLine("Not implemented");
    }

    public static void Exit(string username)
    {
        Write($"Goodbye, {username}!");
        Write("Session ended");
    }

    static Program()
    {
        _combatantServices = new List<ICombatantService>() { new TransformerService() };
        _combatantRepository = new Repository<Combatant>(new AppContext());
        _combatantOptions = new CombatantOptions();
        _options = new Options();
    }

    public static void Main()
    {
        Write("Welcome to Polemos!");
        Write("This is a battle simulation system");
        Write("Enter your username to get started:");

        var username = Read();

        Write($"Hello, {username}!");
        Write("What kind of combatant would you like to fight?");

        var combatantOptions = new List<Option>() { _combatantOptions.TransformerCombatantOption };
        Write(string.Concat(combatantOptions.Select(x => $"{x.Id}: {x.Name}{Environment.NewLine}")), false);

        var combatant = Read();
        while (!IsValidInt(combatant) || !combatantOptions.Any(x => x.Id == int.Parse(combatant)))
        {
            Write($"'{combatant}' is not a supported option");
            Write("Enter an option:");
            combatant = Read();
        }

        try
        {
            _combatantServiceName = combatantOptions.Single(x => x.Id == int.Parse(combatant)).Name;
            _combatantService = _combatantServices.Single(x => x.GetType().Name.Contains(_combatantServiceName, StringComparison.OrdinalIgnoreCase));
        }
        catch (Exception ex)
        {
            Write($"Getting this kind of combatant has failed with the following error: '{ex}'");
            Write("Please contact support as soon as possible");
            Exit(username);
            return;
        }

        var options = new List<Option>() { _options.AddCombatantOption, _options.RemoveCombatantOption, _options.SimulateBattleOption, _options.CombatantStatisticsOption, _options.ExitOption };
        var shouldContinue = true;
        while (shouldContinue)
        {
            Write("What would you like to do?");
            Write(string.Concat(options.Select(x => $"{x.Id}: {x.Name}{Environment.NewLine}")), false);

            var option = Read();

            while (!IsValidInt(option) || !options.Any(x => x.Id == int.Parse(option)))
            {
                Write($"'{option}' is not a supported option");
                Write("Enter an option:");
                option = Read();
            }

            switch (int.Parse(option))
            {
                case Options.AddCombatant:

                    Add();
                    break;

                case Options.RemoveCombatant:

                    Remove();
                    break;

                case Options.SimulateBattle:
                    SimulateBattle();
                    break;

                case Options.CombatantStatistics:
                    CombatStatistics();
                    break;

                case Options.Exit:
                    shouldContinue = false;
                    Exit(username);
                    break;

                default:
                    Write($"'{option}' is not a supported option");
                    break;
            }
        }
    }
}
