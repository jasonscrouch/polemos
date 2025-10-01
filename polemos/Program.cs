namespace polemos;

internal class Options
{
    public const int Add_Combatant = 1;
    public const int Remove_Combatant = 2;
    public const int Simulate_Battle = 3;
    public const int Combatant_Statistics = 4;
    public const int Exit = 5;
}

public class Program
{


    private static readonly string options = $"{Options.Add_Combatant}: Add Combatant{Environment.NewLine}{Options.Remove_Combatant}: Remove Combatant{Environment.NewLine}{Options.Simulate_Battle}: Simulate Battle{Environment.NewLine}{Options.Combatant_Statistics}: Combatant Statistics{Environment.NewLine}{Options.Exit}: Exit";
    private static bool shouldContinue = true;

    public static void Main(string[] args)
    {
        Console.WriteLine("Welcome to Polemos!");
        Console.WriteLine("This is a battle simulation system");
        Console.WriteLine("Enter your name to get started:");
        var username = Console.ReadLine();

        while (string.IsNullOrEmpty(username?.Trim()))
        {
            Console.WriteLine("You must enter a username");
            Console.WriteLine("Enter your name to get started:");
            username = Console.ReadLine();
        }

        Console.WriteLine($"Hello, {username}!");
        Console.WriteLine("What would you like to do?");
        Console.WriteLine(options);
        var option = Console.ReadLine();

        //todo: fix this so that strings convert to ints

        while (shouldContinue)
        {
            switch (option)
            {
                case Options.Add_Combatant:
                    // todo: implement
                    Console.WriteLine("Not implemented");
                    break;

                case Options.Remove_Combatant:
                    // todo: implement
                    Console.WriteLine("Not implemented");
                    break;

                case Options.Simulate_Battle:
                    // todo: implement
                    Console.WriteLine("Not implemented");
                    break;

                case Options.Combatant_Statistics:
                    // todo: implement
                    Console.WriteLine("Not implemented");
                    break;

                case Options.Exit:
                    shouldContinue = false;
                    Console.WriteLine($"Goodbye, {username}!");
                    Console.WriteLine("Session ended");
                    break;

                default:
                    Console.WriteLine($"Sorry, {username}. '{option}' is not a supported option!");
                    Console.WriteLine("Choose from the following options:");
                    Console.WriteLine(options);
                    option = Console.Read();
                    break;
            }
        }
    }
}
