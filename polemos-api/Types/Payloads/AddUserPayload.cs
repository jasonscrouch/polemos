namespace polemos_api.Types.Payloads;

[GraphQLDescription("Payload when adding a user")]
public class AddUserPayload : BasePayload
{
    [GraphQLDescription("The added user")]
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
