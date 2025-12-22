namespace polemos_api.Types.Payloads;

public abstract class BasePayload
{
    [GraphQLDescription("Similar to HTTP status code, represents the status of the mutation.")]
    public int Code { get; set; }

    [GraphQLDescription("Indicates whether the mutation was successful.")]
    public bool Success { get; set; }

    [GraphQLDescription("Human-readable message for the UI.")]
    public string Message { get; set; }

    public BasePayload(int code, bool success, string message)
    {
        Code = code;
        Success = success;
        Message = message;
    }
}
