namespace polemos_api.Types;

public class AddUserPayload
{
    [GraphQLDescription("Similar to HTTP status code, represents the status of the mutation.")]
    public int Code { get; set; }

    [GraphQLDescription("Indicates whether the mutation was successful.")]
    public bool Success { get; set; }

    [GraphQLDescription("Human-readable message for the UI.")]
    public string Message { get; set; }

    public User? User { get; set; }

    public AddUserPayload(int code, bool success, string message, User? user)
    {
        Code = code;
        Success = success;
        Message = message;

        if (user != null)
        {
            User = user;
        }
    }
}
