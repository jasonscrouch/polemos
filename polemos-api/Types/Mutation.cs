using Microsoft.AspNetCore.Identity;
using polemos_api.Core;
using polemos_api.Data.Models;
using polemos_api.Data.Repository;
using polemos_api.Types.Inputs;
using polemos_api.Types.Payloads;

namespace polemos_api.Types;

public class Mutation
{
    [GraphQLDescription("Adds a user")]
    public async Task<AddUserPayload> AddUser(AddUserInput input, PasswordHasher<ApplicationUser> passwordHasher, IRepository<ApplicationUser> userRepository)
    {
        try
        {
            // todo: ensure that username and email are unique (i.e., not multiple users with the same data)

            var appUser = new ApplicationUser() { Name = input.Username, Email = input.Email, Password = input.Password };
            var hashedPassword = passwordHasher.HashPassword(appUser, appUser.Password);

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

    //todo: this needs to take in an input variable that has a user_sk and a name
    public async Task<AddCombatantPayload> AddCombatant(AddCombatantInput input, ICombatantService combatantService, IRepository<Data.Models.Combatant> combatantRepository)
    {
        try
        {

            //todo: if there is a user, then we need to associate that user with the combatant.
            //Otherwise, we can create it locally but not save it to the datebse
            var combatant = combatantService.Create(input.UserId, input.Name, input.IsFemale);

            combatantRepository.Add(combatant);
            await combatantRepository.SaveChangesAsync();

            return new AddCombatantPayload(StatusCodes.Status200OK, true, "Combatant added", new Combatant(combatant.Combatant_SK, combatant.Name, combatant.IsFemale));

            // todo: finish this so that we can create combatants
            // todo: see polemos for UI around checking whether a combatant name already exists
        }
        catch (Exception ex)
        {
            return new AddCombatantPayload(StatusCodes.Status500InternalServerError, false, ex.Message, null);
        }
    }
}
