using polemos_api.Data.Repository;
using polemos_api.Data.Specifications.UserSpecifications;

namespace polemos_api.Types;

public class Query
{
    [GraphQLDescription("A user")]
    public async Task<User?> GetUser([ID] int id, IRepository<Data.User> userRepository)
    {
        var user = await userRepository.SingleAsync(new UserByIdSpecification(id));

        return new User(user.User_SK, user.Name, user.Email);
    }
}
