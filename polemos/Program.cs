using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using Microsoft.EntityFrameworkCore;

namespace polemos;

// todo: move to data
internal class AppContext : DbContext
{
    public DbSet<Transformer> Transformers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("TestDatabase");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Transformer>().HasKey(x => x.Id);
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

    public static bool IsValidInt(string value)
    {
        return int.TryParse(value, out var result);
    }

    public static bool IsYesOrNo(string value)
    {
        return IsYes(value) || value.Equals("no", StringComparison.OrdinalIgnoreCase);
    }

    public static bool IsYes(string value)
    {
        return value.Equals("yes", StringComparison.OrdinalIgnoreCase);
    }

    // todo: move to UI folder
    public static void Write(string? text)
    {
        if (string.IsNullOrEmpty(text?.Trim()))
        {
            throw new ArgumentException($"Expected {nameof(text)} to have a value");
        }

        Console.WriteLine(text);
        Console.Write(Environment.NewLine);
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

            switch (int.Parse(option))
            {
                case Options.AddCombatant:

                    Write("Add a Transformer");

                    var shouldContinueAdding = true;
                    while (shouldContinueAdding)
                    {
                        Write("Enter a name:");
                        var name = Read();

                        Write("Enter a faction:");
                        var faction = Read();

                        var newTransformer = _transformerService.Create(name, faction);

                        _transformersRepository.Add(newTransformer);
                        _transformersRepository.SaveChanges();

                        Write("New Transformer added!");
                        Write(newTransformer.ToString());

                        Write("Would you like to add another Transformer? (Yes/No)");
                        shouldContinueAdding = ReadIsContinuing();
                    }

                    break;

                case Options.RemoveCombatant:

                    // todo: test
                    Write("Remove Transformer(s)");
                    var transformers = _transformersRepository.List();

                    // todo: test
                    if (!transformers.Any())
                    {
                        Write("There are no Transformers to remove");
                        break;
                    }

                    Write("Here are the current Transformers:");

                    foreach (var transformer in transformers)
                    {
                        Write(transformer.ToString());
                    }

                    var shouldContiueRemoving = true;
                    while (shouldContiueRemoving)
                    {
                        Write($"Enter the {nameof(Transformer.Id)} or a list of {nameof(Transformer.Id)}s separated by a comma (e.g., 1, 2, 3):");
                        var toRemove = Read();

                        var delimiter = ',';
                        var isList = toRemove.Contains(delimiter);
                        var ids = isList ? toRemove.Split(delimiter).Select(x => x.Trim()).ToList()
                            : [toRemove.Trim()];

                        // todo: test
                        if (ids.Any(x => !IsValidInt(x)))
                        {
                            // todo: test
                            Write(ids.Count > 1 ? $"Not all of these {nameof(Transformer.Id)}s are valid: '{string.Join(delimiter, ids)}'"
                            : $"This {nameof(Transformer.Id)} is not valid: '{ids.First()}'");
                        }
                        else
                        {
                            var transformerIds = ids.Select(x => int.Parse(x)).ToList();
                            var transformersToRemove = _transformersRepository.List(x => transformerIds.Contains(x.Id));

                            var transformersNotFound = transformerIds.Where(x => !transformersToRemove.Any(y => y.Id == x));

                            // todo: test
                            foreach (var notFound in transformersNotFound)
                            {
                                Write($"Unable to remove Transformer with {nameof(Transformer.Id)} of '{notFound}'");
                            }

                            foreach (var transformer in transformers)
                            {
                                var id = transformer.Id;

                                try
                                {
                                    _transformersRepository.Remove(transformer);
                                    Write($"Transformer with {nameof(Transformer.Id)} '{id}' removed");
                                }
                                catch (Exception ex)
                                {
                                    // todo: test
                                    Write($"Unable to remove Transformer with {nameof(Transformer.Id)} of '{id}'");
                                    Write($"See exception: '{ex.Message}'");
                                }
                            }
                            // todo: test
                            Write("Would you like to continue removing Transformers? (Yes/No)");
                            shouldContinueAdding = ReadIsContinuing();
                        }
                    }

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
                    Write($"'{option}' is not a supported option");
                    break;
            }
        }
    }
}
