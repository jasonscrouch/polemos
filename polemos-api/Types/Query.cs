using Microsoft.AspNetCore.Identity;
using polemos_api.Data.Models;
using polemos_api.Data.Repository;
using polemos_api.Data.Specifications.User;

namespace polemos_api.Types;

public class Query
{
    [GraphQLDescription("Gets a user")]
    public async Task<User?> GetUser(string username, IRepository<ApplicationUser> userRepository)
    {
        var user = await userRepository.SingleAsync(new UserByNameSpecification(username));

        return new User(user.User_SK, user.Name, user.Email);
    }

    [GraphQLDescription("Gets list of combatants by user")]
    public async Task<IEnumerable<Combatant>> GetCombatants(int id, IRepository<Data.Models.Combatant> combatantRepository)
    {
        var combatants = await combatantRepository.ListAsync(new CombatantsByUserSpecification(id));

        return combatants.Select(x => new Combatant(x.Combatant_SK, x.Name));
    }

    [GraphQLDescription("Determines whether or not the username and password combination is valid")]
    public async Task<bool> GetIsPasswordValid(string username, string password, PasswordHasher<ApplicationUser> passwordHasher, IRepository<ApplicationUser> userRepository)
    {
        var user = await userRepository.SingleAsync(new UserByNameSpecification(username));
        var verified = passwordHasher.VerifyHashedPassword(user, user.Password, password);

        return verified == PasswordVerificationResult.Success;
    }
}
