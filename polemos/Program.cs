using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace polemos;

// todo: move to data
internal class AppContext : DbContext
{
    public DbSet<Transformer> Transformers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder.UseInMemoryDatabase("TestDatabase"));
    }
}

// todo: move to core folder
internal interface ISpecification<T>
{
    Expression<Func<T, bool>> Criteria { get; set; }
}

// todo: move to data folder
internal interface IRepository<T>
{
    T Add(T entity);
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

    public int SaveChanges()
    {
        return _appContext.SaveChanges();
    }
}

// todo: move this to UI folder
internal class Options
{
    public const int AddCombatant = 1;
    public const int RemoveCombatant = 2;
    public const int SimulateBattle = 3;
    public const int CombatantStatistics = 4;
    public const int Exit = 5;
}

// todo: put this in core folder
internal interface ITransformer : ICombatant
{
    string? Faction { get; set; }
}

// todo: put this in core folder
internal interface ICombatant
{
    string? Name { get; set; }
    int Strength { get; set; }
    int Dexterity { get; set; }
    int HitPoints { get; set; }
    int Wins { get; set; }
    int Losses { get; set; }
}

// todo: move to core folder
internal class Transformer : ITransformer
{
    public string? Faction { get; set; }
    public string? Name { get; set; }
    public int Strength { get; set; }
    public int Dexterity { get; set; }
    public int HitPoints { get; set; }
    public int Wins { get; set; }
    public int Losses { get; set; }
}

// todo: add to Core folder
internal interface ITransformerService
{
    ITransformer Create(string name, string faction);
}

// todo: move to Core folder
internal class TransformerService : ITransformerService
{
    private readonly int _min = 1;
    private readonly int _max = 20;

    public TransformerService()
    {
    }

    public ITransformer Create(string name, string faction)
    {
        name = name.Trim();

        if (string.IsNullOrEmpty(name))
        {
            throw new Exception($"Expected {nameof(name)} but received '{name}'");
        }

        faction = faction.Trim();

        if (string.IsNullOrEmpty(faction))
        {
            throw new Exception($"Expected {nameof(faction)} but received '{faction}");
        }

        var random = new Random();

        return new Transformer()
        {
            Name = name,
            Faction = faction,
            Strength = random.Next(_min, _max),
            Dexterity = random.Next(_min, _max),
            HitPoints = random.Next(_min, _max)
        };
    }
}

public class Program
{
    private static readonly string _options = $"{Options.AddCombatant}: Add Combatant{Environment.NewLine}{Options.RemoveCombatant}: Remove Combatant{Environment.NewLine}{Options.SimulateBattle}: Simulate Battle{Environment.NewLine}{Options.CombatantStatistics}: Combatant Statistics{Environment.NewLine}{Options.Exit}: Exit";
    private static bool _shouldContinue = true;

    private static ITransformerService _transformerService;
    private static Repository<ITransformer> _transformersRepository;

    public static bool IsValidValue(string? value)
    {
        value = value?.Trim();

        return !string.IsNullOrEmpty(value);
    }

    static Program()
    {
        _transformerService = new TransformerService();
        _transformersRepository = new Repository<ITransformer>(new AppContext());
    }

    public static void Main()
    {
        Console.WriteLine("Welcome to Polemos!");
        Console.WriteLine("This is a battle simulation system");
        Console.WriteLine("Enter your name to get started:");

        var username = Console.ReadLine();

        while (!IsValidValue(username))
        {
            Console.WriteLine("You must enter a username");
            Console.WriteLine("Enter a username to get started:");
            username = Console.ReadLine();
        }

        Console.WriteLine($"Hello, {username}!");

        while (_shouldContinue)
        {
            Console.WriteLine("What would you like to do?");
            Console.WriteLine(_options);
            var option = Console.ReadLine();

            int? value = null;
            var isValidOption = false;

            // todo: could refactor as private bool TryGetOption(string value, out var option)
            while (!isValidOption)
            {
                try
                {
                    value = Convert.ToInt32(option);
                    isValidOption = true;
                }
                catch
                {
                    Console.WriteLine($"'{option}' is not valid");
                }
            }

            switch (value)
            {
                case Options.AddCombatant:
                    Console.WriteLine("Enter a name:");
                    var name = Console.ReadLine();

                    while (!IsValidValue(name))
                    {
                        Console.WriteLine("You must enter a name");
                        Console.WriteLine("Enter a name:");
                        name = Console.ReadLine();
                    }

                    Console.WriteLine("Enter a faction:");

                    var faction = Console.ReadLine();

                    while (!IsValidValue(faction))
                    {
                        Console.WriteLine("You must enter a faction");
                        Console.WriteLine("Enter a faction:");
                        faction = Console.ReadLine();
                    }

                    var transformer = _transformerService.Create(name, faction);

                    _transformersRepository.Add(transformer);
                    _transformersRepository.SaveChanges();

                    break;

                case Options.RemoveCombatant:
                    // todo: implement
                    Console.WriteLine("Not implemented");
                    break;

                case Options.SimulateBattle:
                    // todo: implement
                    Console.WriteLine("Not implemented");
                    break;

                case Options.CombatantStatistics:
                    // todo: implement
                    Console.WriteLine("Not implemented");
                    break;

                case Options.Exit:
                    _shouldContinue = false;
                    Console.WriteLine($"Goodbye, {username}!");
                    Console.WriteLine("Session ended");
                    break;

                default:
                    Console.WriteLine($"Sorry, '{option}' is not a supported option");
                    break;
            }
        }
    }
}
