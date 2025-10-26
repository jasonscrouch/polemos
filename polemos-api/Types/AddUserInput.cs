
namespace polemos_api.Types;

public class AddUserInput
{
    [GraphQLDescription("The user's name")]
    public string Username { get; set; }

    [GraphQLDescription("The user's email")]
    public string Email { get; set; }

    [GraphQLDescription("The user's password")]
    public string Password { get; set; }

    public AddUserInput(string username, string email, string password)
    {
        Username = username;
        Email = email;
        Password = password;
    }
}
