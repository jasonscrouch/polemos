using Microsoft.AspNetCore.Identity;
using polemos_api.Data.Models;
using polemos_api.Data.Repository;
using polemos_api.Types.Inputs;
using polemos_api.Types.Payloads;

namespace polemos_api.Types;

public class Mutation
{
    [GraphQLDescription("Adds a user")]
    public async Task<AddUserPayload> AddUser(AddUserInput input, IRepository<ApplicationUser> userRepository)
    {
        try
        {
            var appUser = new ApplicationUser() { Name = input.Username, Email = input.Email, Password = input.Password };
            var hashedPassword = new PasswordHasher<ApplicationUser>().HashPassword(appUser, appUser.Password);

            appUser.Password = hashedPassword;

            userRepository.Add(appUser);
            await userRepository.SaveChangesAsync();

            return new AddUserPayload(StatusCodes.Status200OK, true, "User added", new User(appUser.User_SK, appUser.Name, appUser.Email));
        }
        catch (Exception ex)
        {
            return new AddUserPayload(StatusCodes.Status500InternalServerError, false, ex.Message, null);
        }
    }
}
