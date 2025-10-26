namespace polemos_api.Types;

public class User
{
    public User(int id, string name, string email)
    {
        Id = id;
        Name = name;
        Email = email;
    }

    [ID]
    [GraphQLDescription("The ID of the user")]
    public int Id { get; }

    [GraphQLDescription("The name of the user")]
    public string Name { get; set; }

    [GraphQLDescription("The email of the user")]
    public string Email { get; set; }
}
