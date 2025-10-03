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
internal class TransformerSpecification : SpecificationBase<ITransformer>
{
    public TransformerSpecification(int id) : base(x => x.Id == id)
    {
    }
}

// todo: move to data folder
internal interface IRepository<T>
{
    T Add(T entity);
    IEnumerable<T> List();
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

    public IEnumerable<T> List()
    {
        return _appContext.Set<T>();
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
    int Id { get; set; }
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
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Faction { get; set; }
    public int Strength { get; set; }
    public int Dexterity { get; set; }
    public int HitPoints { get; set; }
    public int Wins { get; set; }
    public int Losses { get; set; }

    public override string ToString()
    {
        var delimiter = ":";
        var properties = typeof(Transformer).GetProperties().Select(x => $"{x.Name}{delimiter}{x.GetValue(this)}");

        return string.Join(Environment.NewLine, properties);
    }
}

// todo: add to Core folder
internal interface ITransformerService
{
    Transformer Create(string name, string faction);
}

// todo: move to Core folder
internal class TransformerService : ITransformerService
{
    private readonly int _min = 1;
    private readonly int _max = 20;

    public TransformerService()
    {
    }

    public Transformer Create(string name, string faction)
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

    private readonly static ITransformerService _transformerService;
    private readonly static Repository<Transformer> _transformersRepository;

    // todo: move this to UI folder
    public static bool IsValidValue(string? value)
    {
        return !string.IsNullOrEmpty(value?.Trim());
    }

    public static bool IsValidInt(string? value)
    {
        if (string.IsNullOrEmpty(value?.Trim()))
        {
            return false;
        }

        try
        {
            Convert.ToInt32(value);
            return true;
        }
        catch
        {
            return false;
        }
    }

    // todo: move to UI folder
    public static void Write(string? text)
    {
        if (string.IsNullOrEmpty(text?.Trim()))
        {
            throw new ArgumentException($"Expected {nameof(text)} to have a value");
        }

        Console.WriteLine(text);
    }

    public static string? Read()
    {
        return Console.ReadLine();
    }

    static Program()
    {
        _transformerService = new TransformerService();
        _transformersRepository = new Repository<Transformer>(new AppContext());
    }

    public static void Main()
    {
        Write("Welcome to Polemos!");
        Write("This is a battle simulation system");
        Write("Enter your username to get started:");

        var username = Read();

        while (!IsValidValue(username))
        {
            Write("You must enter a username");
            Write("Enter a username to get started:");
            username = Read();
        }

        Write($"Hello, {username}!");

        while (_shouldContinue)
        {
            Write("What would you like to do?");
            Write(_options);

            var option = Read();

            while (!IsValidInt(option))
            {
                Write($"'{option}' is not a supported option");
                Write("Enter an option:");
                option = Read();
            }

            switch (Convert.ToInt32(option))
            {
                case Options.AddCombatant:
                    Write("Enter a name:");
                    var name = Read();

                    while (!IsValidValue(name))
                    {
                        Write($"'{name}' is not a valid name");
                        Write("Enter a name:");
                        name = Read();
                    }

                    Write("Enter a faction:");

                    var faction = Read();

                    while (!IsValidValue(faction))
                    {
                        Write($"'{faction}' is not a valid faction");
                        Write("Enter a faction:");
                        faction = Read();
                    }

                    var newTransformer = _transformerService.Create(name, faction);

                    _transformersRepository.Add(newTransformer);
                    _transformersRepository.SaveChanges();

                    Write("New Transformer added!");
                    Write(newTransformer.ToString());
                    break;

                case Options.RemoveCombatant:

                    // todo: test
                    // list current combatants
                    var transformers = _transformersRepository.List();

                    if (!transformers.Any())
                    {
                        Write("There are no Transformers");
                        break;
                    }

                    foreach (var transformer in transformers)
                    {
                        Write(transformer.ToString());
                    }

                    // ask which to remove

                    // check input as int

                    // remove
                    // save
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
                    Write($"Goodbye, {username}!");
                    Write("Session ended");
                    break;

                default:
                    // todo: repeated, could create method
                    Write($"Sorry, '{option}' is not a supported option");
                    break;
            }
        }
    }
}
