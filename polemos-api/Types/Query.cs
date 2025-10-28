using Microsoft.AspNetCore.Identity;
using polemos_api.Data.Models;
using polemos_api.Data.Repository;
using polemos_api.Data.Specifications.UserSpecifications;

namespace polemos_api.Types;

public class Query
{
    [GraphQLDescription("Gets a user")]
    public async Task<User?> GetUser(string username, IRepository<ApplicationUser> userRepository)
    {
        var user = await userRepository.SingleAsync(new UserByNameSpecification(username));

        return new User(user.User_SK, user.Name, user.Email);
    }

    [GraphQLDescription("Determines whether or not the username and password combination is valid")]
    public async Task<bool> GetIsPasswordValid(string username, string password, IRepository<ApplicationUser> userRepository)
    {
        var user = await userRepository.SingleAsync(new UserByNameSpecification(username));

        // todo: can we use DI for this? It's in the mutation too.
        var passwordHasher = new PasswordHasher<ApplicationUser>();

        var verified = passwordHasher.VerifyHashedPassword(user, user.Password, password);

        return verified == PasswordVerificationResult.Success;
    }
}
