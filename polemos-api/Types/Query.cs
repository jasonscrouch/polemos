using polemos_api.Data.Models;
using polemos_api.Data.Repository;
using polemos_api.Data.Specifications.UserSpecifications;

namespace polemos_api.Types;

public class Query
{
    [GraphQLDescription("Gets a user")]
    public async Task<User?> GetUser([ID] int id, IRepository<ApplicationUser> userRepository)
    {
        var user = await userRepository.SingleAsync(new UserByIdSpecification(id));

        return new User(user.User_SK, user.Name, user.Email);
    }
}
