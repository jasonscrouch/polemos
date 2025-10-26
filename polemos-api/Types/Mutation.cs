using polemos_api.Data;
using polemos_api.Data.Repository;

namespace polemos_api.Types;

public class Mutation
{
    public async Task<AddUserPayload> AddUser(AddUserInput input, IRepository<Data.User> userRepository)
    {
        try
        {
            var user = userRepository.Add(new Data.User() { Name = input.Username, Email = input.Email, Password = input.Password });
            await userRepository.SaveChangesAsync();

            return new AddUserPayload(StatusCodes.Status200OK, true, "User added", new User(user.User_SK, user.Name, user.Email));
        }
        catch (Exception ex)
        {
            return new AddUserPayload(StatusCodes.Status500InternalServerError, false, ex.Message, null);
        }
    }
}
